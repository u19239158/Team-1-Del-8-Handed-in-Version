﻿using System;
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
        public string Login(RegisterModel model)
        {
            //using var db = new NKAP_BOLTING_DB_4Context();

            var hashedPassword = this.ComputeSha256Hash(model.UserPassword);
            model.UserRoleName = "Admin";
            var user = _db.Users.Where(zz => zz.UserUsername == model.UserUsername && zz.UserPassword == hashedPassword).FirstOrDefault();
            if (user == null)
            {
                request = "user not found" ;
                return request;
            }
            else
            {
                return  token.GenerateToken(model);
            }
            
        }

        [HttpPost]
        [Route("CustomerLogin")]
        public string CustomerLogin(RegisterModel model)
        {
            //using var db = new NKAP_BOLTING_DB_4Context();

            var hashedPassword = this.ComputeSha256Hash(model.UserPassword);
            model.UserRoleName = "Customer";
            var user = _db.Users.Where(zz => zz.UserUsername == model.UserUsername && zz.UserPassword == hashedPassword).FirstOrDefault();
            if (user == null)
            {
                string request = "user not found";
                return request;
            }
            else
            {
                return token.GenerateToken(model);
            }

        }

        [HttpPost]
        [Route("EmployeeLogin")]
        public string EmployeeLogin(RegisterModel model)
        {
            //using var db = new NKAP_BOLTING_DB_4Context();

            var hashedPassword = this.ComputeSha256Hash(model.UserPassword);
            model.UserRoleName = "Employee";
            var user = _db.Users.Where(zz => zz.UserUsername == model.UserUsername && zz.UserPassword == hashedPassword).FirstOrDefault();
            if (user == null)
            {
                string request = "user not found";
                return request;
            }
            else
            {
                return token.GenerateToken(model);
            }

        }

        ////var newAuditTrail = new AuditTrail
        //      {

        //          AuditTrailDate = DateTime.Today,
        //          AuditTrailTime = DateTime.Now.TimeOfDay,
        //          AuditTrailDescription = "Login"

        //      });


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