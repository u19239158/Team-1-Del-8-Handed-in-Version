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

                var tokens = token.GenerateToken(model);
                var username = user.UserUsername;

                var x = new helperclass();
                x.token = tokens;
                x.userUsername = username;
                x.userId = user.UsersId;
                x.userRoleID = (int)user.UserRoleId;

                return Ok(x);
            }

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

            //add to passwordHistory
            //var passH = _db.PasswordHistories.Find(model.UsersID);
            //PasswordHistory pass = new PasswordHistory();
            //pass.PasswordHistoryDate = System.DateTime.Now;
            //pass.PasswordHistoryText = newUser.UserPassword;
            //_db.PasswordHistories.Add(pass);
            //_db.SaveChanges();


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
                var user = _db.Users.Find(model.UsersID);
                AuditTrail audit = new AuditTrail();
                audit.AuditTrailDescription = newUser.UserUsername + " Registered a new Account";
                audit.AuditTrailDate = System.DateTime.Now;
                TimeSpan timeNow = DateTime.Now.TimeOfDay;
                audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                audit.UsersId = newUser.UsersId;
                _db.AuditTrails.Add(audit);
                _db.SaveChanges();


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
    }
}