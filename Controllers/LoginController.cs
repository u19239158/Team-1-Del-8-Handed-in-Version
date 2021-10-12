using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NKAP_API_2.EF;
using NKAP_API_2.Models;
using System.Dynamic;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using NKAP_API_2.Controllers;
using Microsoft.AspNetCore.Authorization;
using Org.BouncyCastle.Asn1.Cmp;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Rest.Verify.V2;
using Twilio.Types;
//using RestSharp;
using System.Net;
using System.Reflection;
using System.Net.Http;
using System.Net.Http.Headers;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        readonly TokenController token = new TokenController();
        private static readonly HttpClient _httpClient = new HttpClient();

        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public LoginController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        string request;

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(RegisterModel model)
        {
            //using var db = new NKAP_BOLTING_DB_4Context();

            var hashedPassword = this.ComputeSha256Hash(model.UserPassword);
            model.UserRoleName = "Admin";
            var user = _db.Users.Where(zz => zz.UserUsername == model.UserUsername && zz.UserPassword == hashedPassword).FirstOrDefault();

            if (user == null)
            {
                request = "Invalid Credentials";
                return BadRequest(request);
                // return ;
            }
            else
            {
                var tokens = token.GenerateToken(model);
                var username = user.UserUsername;

                var x = new helperclass();
                x.token = tokens;
                x.userUsername = username;
                x.userId = user.UsersId;
                x.userRoleID = (int)user.UserRoleId;

                //add to audit trail

                var users = _db.Users.Find(user.UsersId);
                AuditTrail audit = new AuditTrail();
                audit.AuditTrailDescription = users.UserUsername + " logged In.";
                audit.AuditTrailDate = System.DateTime.Now;
                TimeSpan timeNow = DateTime.Now.TimeOfDay;
                audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                audit.UsersId = users.UsersId;
                _db.AuditTrails.Add(audit);
                _db.SaveChanges();

                return Ok(x);
                //return ;


            }

        }

        private class helperclass
        {
            public string token;
            public string userUsername;
            public int userId;
            public int userRoleID;
            public string auth;
        }

        //Login Admin/Emp SIDE after new db
        [HttpPost]
        [Route("Logins")]
        public IActionResult Logins(RegisterModel model)
        {
            //using var db = new NKAP_BOLTING_DB_4Context();

            var hashedPassword = this.ComputeSha256Hash(model.UserPassword);
            // model.UserRoleName = "Admin";
            var user = _db.Users.Where(zz => zz.UserUsername == model.UserUsername).FirstOrDefault();
            var log = _db.Users.FirstOrDefault(zz => zz.UserUsername == model.UserUsername);


            if (user == null)
            {
                request = "User does not exist.";
                return BadRequest(request);
                // return ;
            }

            var admin = _db.Admins.FirstOrDefault(zz => zz.UsersId == log.UsersId);
            var emp = _db.Employees.FirstOrDefault(zz => zz.UsersId == log.UsersId);
            if (admin != null)
            {
                model.UserRoleName = "Admin";
                if (user.UserPassword != ComputeSha256Hash(model.UserPassword))
                {

                    request = "Incorrect Password";
                    return BadRequest(request);
                    // return ;

                }
                else
                {
                    var tokens = token.GenerateToken(model);
                    var username = user.UserUsername;
                    var x = new helperclass();
                    x.token = tokens;
                    x.userUsername = username;
                    x.userId = user.UsersId;
                    x.userRoleID = (int)user.UserRoleId;

                    var users = _db.Users.Find(user.UsersId);
                    AuditTrail audit = new AuditTrail();
                    audit.AuditTrailDescription = users.UserUsername + " logged In.";
                    audit.AuditTrailDate = System.DateTime.Now;
                    TimeSpan timeNow = DateTime.Now.TimeOfDay;
                    audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                    audit.UsersId = users.UsersId;
                    _db.AuditTrails.Add(audit);
                    _db.SaveChanges();

                    return Ok(x);
                    //return ;
                }

            }
            else if (emp != null)
            {
                model.UserRoleName = "Employee";
                if (user.UserPassword != ComputeSha256Hash(model.UserPassword))
                {
                    request = "Incorrect Password";
                    return BadRequest(request);
                    // return ;
                }
                else
                {
                    var tokens = token.GenerateToken(model);
                    var username = user.UserUsername;
                    var x = new helperclass();
                    x.token = tokens;
                    x.userUsername = username;
                    x.userId = user.UsersId;
                    x.userRoleID = (int)user.UserRoleId;

                    var users = _db.Users.Find(user.UsersId);
                    AuditTrail audit = new AuditTrail();
                    audit.AuditTrailDescription = users.UserUsername + " logged In.";
                    audit.AuditTrailDate = System.DateTime.Now;
                    TimeSpan timeNow = DateTime.Now.TimeOfDay;
                    audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                    audit.UsersId = users.UsersId;
                    _db.AuditTrails.Add(audit);
                    _db.SaveChanges();
                    return Ok(x);
                    //return ;
                }
            }
            return Forbid(request);

        }


        [HttpPost]
        [Route("CustomerLogin")]
        public async Task<IActionResult> CustomerLoginAsync(MapClass model)
        {
            using var db = new NKAP_BOLTING_DB_4Context();

            var hashedPassword = this.ComputeSha256Hash(model.UserPassword);
            try
            {
                model.UserRoleName = "Customer";
                var user = _db.Users.Where(zz => zz.UserUsername == model.UserUsername && zz.UserPassword == hashedPassword).FirstOrDefault();
                var custy = _db.Customers.FirstOrDefault(zz => zz.UsersId == user.UsersId);

                if (custy == null)
                {
                    string request = "Invalid Credentials";
                    return BadRequest(request);
                }
                else
                {
                  
                    var tokens = token.CusGenerateToken(model);
                    var username = user.UserUsername;
                    string toke = await GetToken();
                    var trim = toke.Substring(toke.IndexOf(':') + 1);
                    var endtrim = trim.Substring(1);
                    var strings = endtrim.Substring(0, endtrim.Length - 2);
                    //var fintrim = endtrim.Substring(endtrim.Length-3);
                    var x = new helperclass();
                    x.token = tokens;
                    x.userUsername = username;
                    x.userId = user.UsersId;
                    x.userRoleID = (int)user.UserRoleId;
                    x.auth = strings;
                    return Ok(x);
                }

            }

            catch(Exception e)
            {
                return BadRequest(e.Message);
            }




        }

      
        public async Task<string> GetToken()
        {
            if(_httpClient.BaseAddress == null)
            {
                _httpClient.BaseAddress = new Uri("https://www.universal-tutorial.com/api/getaccesstoken");
                _httpClient.DefaultRequestHeaders.Add("user-email", "u19072912@tuks.co.za");
                _httpClient.DefaultRequestHeaders.Add("api-token", "o1ZCsVkfvqSKvM4sqwDQdOtwAf5Vw71o48 -WqIPqzf6eRBVQGkOV-eGXbigNECbxRuw");

            }

            //_httpClient.BaseAddress = new Uri("https://www.universal-tutorial.com/api/getaccesstoken");
         
            var response = await _httpClient.GetAsync("");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            //var companies = JsonSerializer.Deserialize<List<CompanyDto>>(content, _options);

            return content;
        }


        [HttpPost]
        [Route("ForgotResetPassword")]
        public IActionResult ForgotResetPassword(RegisterModel model)
        {
            //send SMS here
            const string accountSid = "AC5b5b33a689cafb8b7975e1e17d6b8bad";
            const string authToken = "edc812f5342fb84d2ddbb527470eeef1";
            // Initialize the Twilio client
            TwilioClient.Init(accountSid, authToken);
            var user = _db.Users.FirstOrDefault(aa => aa.UserUsername  == model.UserUsername);
            if (user == null)
            {
                return BadRequest("Please enter a valid username");
            }
            var cust = _db.Customers.FirstOrDefault(zz => zz.UsersId == user.UsersId);
            var emp = _db.Employees.FirstOrDefault(zz => zz.UsersId == user.UsersId);
            var adm = _db.Admins.FirstOrDefault(zz => zz.UsersId == user.UsersId);
            var number = "";
            if (cust != null)
            {
             
                number = cust.CustomerCellphoneNumber;
                string cnumber = number.Substring(1);
                string Ncode = "+27";
                string finalNumber = Ncode + cnumber;
                var code = new Random().Next(100000, 1000000);
                MessageResource.Create(
                    from: new PhoneNumber("+13128182655"), // From number, must be an SMS-enabled Twilio number
                    to: new PhoneNumber(finalNumber), // To number, if using Sandbox see note above
                                                     // Message content
                    body: $"Your one time pin code is " + code + " for Nkap Bolting Login");

                Console.WriteLine($"Sent message to {user.UserUsername}");

                Verification vcode = new Verification(); // creating the entry in the verification table for the reset code
                {
                    vcode.UsersId = user.UsersId;
                    vcode.Code = code;
                    vcode.PhoneNumber = number;
                    vcode.CodeDate = DateTime.Now;
                }
                _db.Verifications.Add(vcode);
                _db.SaveChanges();
            }
            else if (emp != null)
            {
                number = emp.EmployeeCellphoneNumber;
                string cnumber = number.Substring(1);
                string Ncode = "+27";
                string finalNumber = Ncode + cnumber;
                var code = new Random().Next(100000, 1000000);
                MessageResource.Create(
                    from: new PhoneNumber("+13128182655"), // From number, must be an SMS-enabled Twilio number
                    to: new PhoneNumber(finalNumber), // To number, if using Sandbox see note above
                                                  // Message content
                    body: $"Your one time pin code is " + code + " for Nkap Bolting Login");

                Console.WriteLine($"Sent message to {user.UserUsername}");


                Verification vcode = new Verification(); // creating the entry in the verification table for the reset code
                {
                    vcode.UsersId = user.UsersId;
                    vcode.Code = code;
                    vcode.PhoneNumber = number;
                    vcode.CodeDate = DateTime.Now;
                }
                _db.Verifications.Add(vcode);
                _db.SaveChanges();
            }
            else if (adm != null)
            {
                number = adm.AdminCellphoneNumber;
                string cnumber = number.Substring(1);
                string Ncode = "+27";
                string finalNumber = Ncode + cnumber;
                var code = new Random().Next(100000, 1000000);
                MessageResource.Create(
                    from: new PhoneNumber("+13128182655"), // From number, must be an SMS-enabled Twilio number
                    to: new PhoneNumber(finalNumber), // To number, if using Sandbox see note above
                                                  // Message content
                    body: $"Your one time pin code is " + code + " for Nkap Bolting Login");

                Console.WriteLine($"Sent message to {user.UserUsername}");


                Verification vcode = new Verification(); // creating the entry in the verification table for the reset code
                {
                    vcode.UsersId = user.UsersId;
                    vcode.Code = code;
                    vcode.PhoneNumber = number;
                    vcode.CodeDate = DateTime.Now;
                }
                _db.Verifications.Add(vcode);
                _db.SaveChanges();
            }


         


            return Ok();

        }

        [HttpPost]
        [Route("ResetPasswordOTP")]
        public IActionResult ResetPasswordOTP(RegisterModel model)
        {
            var bar = _db.Users.FirstOrDefault(aa => aa.UserUsername == model.UserUsername);
            //var otp = _db.Verifications.FirstOrDefault(aa => aa.Code == model.otp);
            //var user = _db.Users.OrderBy(ss => ss.UsersId). LastOrDefault(aa => aa.UsersId == otp.UsersId);
            var verify = _db.Verifications.OrderBy(ss => ss.VerificationId).LastOrDefault(ss => ss.UsersId == bar.UsersId);
            string msg= "";
            if (model.otp == verify.Code)
            {
                bar.UserPassword = ComputeSha256Hash(model.UserPassword);

                PasswordHistory pass = new PasswordHistory();
                pass.PasswordHistoryDate = System.DateTime.Now;
                pass.UsersId = bar.UsersId;
                pass.PasswordHistoryText = bar.UserPassword;
                _db.PasswordHistories.Add(pass);
                _db.SaveChanges();
                _db.Users.Attach(bar);
                _db.SaveChanges();
                return Ok();
            }
            else 
            {
                msg = "Invalid OTP";
                return BadRequest(msg);
            }
            //3.check  that the number is valid = 6 characters
            //4.check if a record with this code and phone number exists in the table
            //5.check if time of the code is not greater than 1hr(hasn't expired)

          
        }


        [HttpPost]
        [Route("Register")]
        public IActionResult Register(RegisterModel model)
        {
            //using var _db = new NKAP_BOLTING_DB_4Context();

            if (this.UserExists(model.UserUsername))
            {
                return Forbid();
            }

            var newUser = new User
            {
                UserUsername = model.UserUsername,
                UserPassword = ComputeSha256Hash(model.UserPassword),
                UserRoleId = 2,

                
            };
            _db.Users.Add(newUser);
            _db.SaveChanges();

            //add to passwordHistory
   
            PasswordHistory pass = new PasswordHistory();
            pass.PasswordHistoryDate = System.DateTime.Now;
            pass.UsersId = newUser.UsersId;
            pass.PasswordHistoryText = newUser.UserPassword;
            _db.PasswordHistories.Add(pass);
            _db.SaveChanges();


            var newCustomer = new Customer
            {
                TitleId = model.TitleID,
                CustomerName = model.CustomerName,
                CustomerSurname = model.CustomerSurname,
                CustomerCellphoneNumber = model.CustomerCellphoneNumber,
                CustomerEmailAddress = model.CustomerEmailAddress,
                CustomerBusinessName = model.CustomerBusinessName,
                CustomerVatreg = model.CustomerVatReg,
                UsersId = newUser.UsersId
            };

            //var newAdmin = new Admin
            //{
            //    TitleId = model.TitleID,
            //    AdminName = model.CustomerName,
            //    AdminSurname = model.CustomerSurname,
            //    AdminCellphoneNumber = model.CustomerCellphoneNumber,
            //    AdminEmailAddress = model.CustomerEmailAddress,
            //    UsersId = newUser.UsersId
            //};


            try
            {
              
               // _db.Admins.Add(newAdmin);
                 _db.Customers.Add(newCustomer);
                _db.SaveChanges();

                //add to audit trail
                var user = _db.Users.Find(newUser.UsersId);
                AuditTrail audit = new AuditTrail();
                audit.AuditTrailDescription = newUser.UserUsername + " Registered a new Account";
                audit.AuditTrailDate = System.DateTime.Now;
                TimeSpan timeNow = DateTime.Now.TimeOfDay;
                audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                audit.UsersId = newUser.UsersId;
                _db.AuditTrails.Add(audit);
                _db.SaveChanges();


                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //Helper functions
        private bool UserExists(string userusername)
        {
           // using var _db = new NKAP_BOLTING_DB_4Context();
            var user = _db.Users.Where(zz => zz.UserUsername == userusername).FirstOrDefault();

            return user != null;
        }

        private string ComputeSha256Hash(string rawData)
        {
            // Create a SHA256   
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }


        }

        [Route("Logout/{UsersID}")] //route
        [HttpPost]
        //Update CategoryType
        public IActionResult Logout(int UsersID)
        {
            //add to audit trail
            var user = _db.Users.Find(UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = user.UserUsername + " logged out.";
            audit.AuditTrailDate = System.DateTime.Now;
            TimeSpan timeNow = DateTime.Now.TimeOfDay;
            audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [Route("RegisterAdmin")]
        public IActionResult RegisterAdmin(RegisterModel model)
        {
            //using var _db = new NKAP_BOLTING_DB_4Context();

            if (this.UserExists(model.UserUsername))
            {
                return Forbid();
            }

            var newUser = new User
            {
                UserUsername = model.UserUsername,
                UserPassword = ComputeSha256Hash(model.UserPassword),
                UserRoleId = 1,


            };
            _db.Users.Add(newUser);
            _db.SaveChanges();

            //add to passwordHistory

            PasswordHistory pass = new PasswordHistory();
            pass.PasswordHistoryDate = System.DateTime.Now;
            pass.UsersId = newUser.UsersId;
            pass.PasswordHistoryText = newUser.UserPassword;
            _db.PasswordHistories.Add(pass);
            _db.SaveChanges();


            //var newCustomer = new Customer
            //{
            //    TitleId = model.TitleID,
            //    CustomerName = model.CustomerName,
            //    CustomerSurname = model.CustomerSurname,
            //    CustomerCellphoneNumber = model.CustomerCellphoneNumber,
            //    CustomerEmailAddress = model.CustomerEmailAddress,
            //    CustomerBusinessName = model.CustomerBusinessName,
            //    CustomerVatreg = model.CustomerVatReg,
            //    UsersId = newUser.UsersId
            //};

            var newAdmin = new Admin
            {
                TitleId = model.TitleID,
                AdminName = model.CustomerName,
                AdminSurname = model.CustomerSurname,
                AdminCellphoneNumber = model.CustomerCellphoneNumber,
                AdminEmailAddress = model.CustomerEmailAddress,
                UsersId = newUser.UsersId
            };


            try
            {

                _db.Admins.Add(newAdmin);
                // _db.Customers.Add(newCustomer);
                _db.SaveChanges();

                //add to audit trail
                var user = _db.Users.Find(newUser.UsersId);
                AuditTrail audit = new AuditTrail();
                audit.AuditTrailDescription = newUser.UserUsername + " Registered a new Account";
                audit.AuditTrailDate = System.DateTime.Now;
                TimeSpan timeNow = DateTime.Now.TimeOfDay;
                audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                audit.UsersId = newUser.UsersId;
                _db.AuditTrails.Add(audit);
                _db.SaveChanges();


                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}