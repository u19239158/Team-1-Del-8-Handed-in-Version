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

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        readonly TokenController token = new TokenController();

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
                request = "Invalid Credentials" ;
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

                //add to audit trail
              
                var users = _db.Users.Find(user.UsersId);
                AuditTrail audit = new AuditTrail();
                audit.AuditTrailDescription = users.UserUsername + " logged In";
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
        }

        //Login Admin/Emp SIDE after new db
        //[HttpPost]
        //[Route("Logins")]
        //public IActionResult Logins(RegisterModel model)
        //{
        //    //using var db = new NKAP_BOLTING_DB_4Context();

        //    var hashedPassword = this.ComputeSha256Hash(model.UserPassword);
        //   // model.UserRoleName = "Admin";
        //    var user = _db.Users.Where(zz => zz.UserUsername == model.UserUsername && zz.UserPassword == hashedPassword).FirstOrDefault();
        //    var log = _db.Users.FirstOrDefault(zz => zz.UserUsername == model.UserUsername);

        //    if (_db.Admins.FirstOrDefault(zz=> zz.UsersId == log.UsersId) )
        //    {
        //        model.UserRoleName = "Admin";
        //        if (user == null)
        //        {
        //            request = "Invalid Credentials";
        //            return BadRequest(request);
        //            // return ;
        //        }
        //        else
        //        {
        //            return Ok(token.GenerateToken(model));
        //            //return ;
        //        }

        //    }
        //    else if (_db.Employees.FirstOrDefault(zz => zz.UsersId == log.UsersId))
        //    {
        //        model.UserRoleName = "Employee";
        //        if (user == null)
        //        {
        //            request = "Invalid Credentials";
        //            return BadRequest(request);
        //            // return ;
        //        }
        //        else
        //        {
        //            return Ok(token.GenerateToken(model));
        //            //return ;
        //        }
        //    }
        //     return Forbid(request);

        //}

        //[HttpPost]
        //[Route("CustomerLogin")]
        //public string CustomerLogin(RegisterModel model)
        //{
        //    //using var db = new NKAP_BOLTING_DB_4Context();

        //    var hashedPassword = this.ComputeSha256Hash(model.UserPassword);
        //    model.UserRoleName = "Customer";
        //    var user = _db.Users.Where(zz => zz.UserUsername == model.UserUsername && zz.UserPassword == hashedPassword).FirstOrDefault();
        //    if (user == null)
        //    {
        //       return BadRequest(request);
        //        return request;
        //    }
        //    else
        //    {
        //        return token.GenerateToken(model);
        //    }

        //}

        [HttpPost]
        [Route("CustomerLogin")]
        public IActionResult CustomerLogin(RegisterModel model)
        {
            //using var db = new NKAP_BOLTING_DB_4Context();

            var hashedPassword = this.ComputeSha256Hash(model.UserPassword);
            model.UserRoleName = "Customer";
            var user = _db.Users.Where(zz => zz.UserUsername == model.UserUsername && zz.UserPassword == hashedPassword).FirstOrDefault();
            if (user == null)
            {
                string request = "Invalid Credentials";
                return BadRequest(request);
            }
            else
            {
                return Ok(token.GenerateToken(model));
            }

        }

        ////var newAuditTrail = new AuditTrail
        //      {

        //          AuditTrailDate = DateTime.Today,
        //          AuditTrailTime = DateTime.Now.TimeOfDay,
        //          AuditTrailDescription = "Login"

        //      });

        [HttpPost]
        [Route("ForgotResetPassword")]
        public IActionResult ForgotResetPassword(RegisterModel model)
        {
            //send SMS here
            const string accountSid = "AC5b5b33a689cafb8b7975e1e17d6b8bad";
            const string authToken = "edc812f5342fb84d2ddbb527470eeef1";
            // Initialize the Twilio client
            TwilioClient.Init(accountSid, authToken);


            // make an associative array of people we know, indexed by phone number
            var people = new Dictionary<string, string>() {

                {"+27713623778", "Boots"}
            };

            // Iterate over all our friends
            foreach (var person in people)
            {
                // Send a new outgoing SMS by POSTing to the Messages resource

                var code = new Random().Next(0, 1000000);
                MessageResource.Create(
                    from: new PhoneNumber("+13128182655"), // From number, must be an SMS-enabled Twilio number
                    to: new PhoneNumber(person.Key), // To number, if using Sandbox see note above
                                                     // Message content
                    body: $"Your one time pin code is " + code + " for Nkap Bolting Login");

                Console.WriteLine($"Sent message to {person.Value}");
            }


            //2. store the number in a table with the time it was created on
            //store code var; time it was generated; phone number (like table columns)

            return Ok("Enter your one time pin");

        }

        //[HttpPost]
        //[Route("ResetPasswordOTP")]
        //public IActionResult ResetPasswordOTP(RegisterModel model)
        //{
        //    //3. check  that the number is valid=6 characters
        //    //4. check if a record with this code and phone number exists in the table
        //    //5. check if time of the code is not greater than 1hr (hasn't expired)
        //}


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
                UserRoleId = 3,
                
            };

            //var newpasshist = new PasswordHistory
            //{
            //    //PasswordHistoryId = model.PasswordHistoryId,
            //    PasswordHistoryDate = Convert.ToDateTime(DateTime.Today), //trying to save the date that the password was created
            //    PasswordHistoryText = ComputeSha256Hash(model.UserPassword) //trying to save the hashed password
            //};


            var newCustomer = new Customer
            {
                //TitleId = model.TitleID,
                CustomerName = model.CustomerName,
                CustomerSurname = model.CustomerSurname,
                CustomerCellphoneNumber = model.CustomerCellphoneNumber,
                CustomerEmailAddress = model.CustomerEmailAddress,
                CustomerBusinessName = model.CustomerBusinessName,
                CustomerVatreg = model.CustomerVatReg
            };

            //var newAdmin = new Admin
            //{
            //    TitleId = model.TitleID,
            //    AdminName = model.CustomerName,
            //    AdminSurname = model.CustomerSurname,
            //    AdminCellphoneNumber = model.CustomerCellphoneNumber,
            //    AdminEmailAddress = model.CustomerEmailAddress,

            //};


            try
            {
                _db.Users.Add(newUser);
                //_db.Admins.Add(newAdmin);
                 _db.Customers.Add(newCustomer);
                // _db.PasswordHistories.Add(newpasshist);
                _db.SaveChanges();

                //add to audit trail
                //var user = _db.Users.Find(model.UsersID);
                //AuditTrail audit = new AuditTrail();
                //audit.AuditTrailDescription = user.UserUsername + "Registered a new Account";
                //audit.AuditTrailDate = System.DateTime.Now;
                //TimeSpan timeNow = DateTime.Now.TimeOfDay;
                //audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                //audit.UsersId = user.UsersId;
                //_db.AuditTrails.Add(audit);
                //_db.SaveChanges();

                return Ok(newCustomer);
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
    }
}