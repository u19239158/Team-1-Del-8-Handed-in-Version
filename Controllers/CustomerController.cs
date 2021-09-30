using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using NKAP_API_2.EF;
using NKAP_API_2.Models;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public CustomerController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetCustomer")] //route
        [HttpGet]
        public ActionResult get()
        {
           
            var Custitle = _db.Customers.Join(_db.Titles,
                c => c.TitleId,
                t => t.TitleId,
                (c, t) => new
                {
                    CustomerId = c.CustomerId,
                    TitleID = c.TitleId,
                    TitleDesc = t.TitleDescription,
                    CustomerName = c.CustomerName,
                    CustomerSurname = c.CustomerSurname,
                    CustomerCellphoneNumber = c.CustomerCellphoneNumber,
                    CustomerEmailAddress = c.CustomerEmailAddress,
                    CustomerVATReg= c.CustomerVatreg,
                    CustomerBusinessName = c.CustomerBusinessName,
                    
                });


            //var desc = _db.Titles.
            //Join(_db.Customers, u => u.TitleId, uir => uir.TitleId,
            //(u, uir) => new { u, uir }).;
            ////var desc = _db.Titles.Find()
            //var desc = _db.Titles.Select(td => td.TitleDescription.Where(td.TitleId == C=);

            return Ok(Custitle);
        }

    //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetCustomerByID/{customerid}")] //route
        [HttpGet]
        //get Customer by ID (Read)
        public IActionResult get(int customerid)
        {
            //var Customer = _db.Customers.Find(customerid);

            var Custitle = _db.Customers.Join(_db.Titles,
              c => c.TitleId,
              t => t.TitleId,
              (c, t) => new
              {
                    CustomerId = c.CustomerId,

                  TitleID = c.TitleId,
                  TitleDesc = t.TitleDescription,
                  CustomerID = c.CustomerId,
                  CustomerName = c.CustomerName,
                  CustomerSurname = c.CustomerSurname,
                  CustomerCellphoneNumber = c.CustomerCellphoneNumber,
                  CustomerEmailAddress = c.CustomerEmailAddress,
                  CustomerVATReg = c.CustomerVatreg,
                  CustomerBusinessName = c.CustomerBusinessName,

              }).First(cn => cn.CustomerID == customerid);

            return Ok(Custitle);
        }

        //[Route("GetProfile/{userid}")] //route
        //[HttpGet]
        ////get Customer by ID (Read)
        //public IActionResult GetProfile(int userid)
        //{
        //    //var Customer = _db.Customers.Find(customerid);

        //    var Custitle = _db.Customers.Join(_db.Titles,
        //      c => c.TitleId,
        //      t => t.TitleId,
        //      (c, t) => new
        //      {
        //          CustomerId = c.CustomerId,

        //          TitleID = c.TitleId,
        //          TitleDesc = t.TitleDescription,
        //          CustomerID = c.CustomerId,
        //          CustomerName = c.CustomerName,
        //          CustomerSurname = c.CustomerSurname,
        //          CustomerCellphoneNumber = c.CustomerCellphoneNumber,
        //          CustomerEmailAddress = c.CustomerEmailAddress,
        //          CustomerVATReg = c.CustomerVatreg,
        //          CustomerBusinessName = c.CustomerBusinessName,

        //      }).First(cn => cn.userID == userid);

        //    return Ok(Custitle);
        //}

        //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetCustomerByName/{customername}")] //route
        [HttpGet]
        //get Customer by Name (Read)
        public IActionResult Get(string customername)
        {
           // var Customer = _db.Customers.FirstOrDefault(cn => cn.CustomerName == customername);
           
            var Custitle = _db.Customers.Join(_db.Titles,
               c => c.TitleId,
               t => t.TitleId,
               (c, t) => new
               {
                   CustomerId = c.CustomerId,

                   TitleID = c.TitleId,
                   TitleDesc = t.TitleDescription,
                   CustomerName = c.CustomerName,
                   CustomerSurname = c.CustomerSurname,
                   CustomerCellphoneNumber = c.CustomerCellphoneNumber,
                   CustomerEmailAddress = c.CustomerEmailAddress,
                   CustomerVATReg = c.CustomerVatreg,
                   CustomerBusinessName = c.CustomerBusinessName,

               }).Where(cn => cn.CustomerName == customername);
            

            return Ok(Custitle);
        }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetCustomerBySurname/{customersurname}")] //route
        [HttpGet]
        //get Customer by ID (Read)
        public IActionResult get(string customersurname)
        {
            //var Customer = _db.Customers.FirstOrDefault(cs => cs.CustomerSurname == customersurname);

            var Custitle = _db.Customers.Join(_db.Titles,
               c => c.TitleId,
               t => t.TitleId,
               (c, t) => new
               {
                   CustomerId = c.CustomerId,

                   TitleID = c.TitleId,
                   TitleDesc = t.TitleDescription,
                   CustomerName = c.CustomerName,
                   CustomerSurname = c.CustomerSurname,
                   CustomerCellphoneNumber = c.CustomerCellphoneNumber,
                   CustomerEmailAddress = c.CustomerEmailAddress,
                   CustomerVATReg = c.CustomerVatreg,
                   CustomerBusinessName = c.CustomerBusinessName,

               }).Where(cn => cn.CustomerSurname == customersurname);


            return Ok(Custitle);

           
        }

        //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetCustomerBySaleID/{SaleId}")] //route
        [HttpGet]
        //get Customer by ID (Read)
        public IActionResult GetCustomerBySaleID(int saleId)
        {
            //var Customer = _db.Customers.Find(customerid);

            var Custitle = _db.Customers.Join(_db.Titles,
              c => c.TitleId,
              t => t.TitleId,
              (c, t) => new
              {
                  CustomerId = c.CustomerId,

                  TitleID = c.TitleId,
                  TitleDesc = t.TitleDescription,
                  CustomerID = c.CustomerId,
                  CustomerName = c.CustomerName,
                  CustomerSurname = c.CustomerSurname,
                  CustomerCellphoneNumber = c.CustomerCellphoneNumber,
                  CustomerEmailAddress = c.CustomerEmailAddress,
                  CustomerVATReg = c.CustomerVatreg,
                  CustomerBusinessName = c.CustomerBusinessName,

              }).Join(_db.Sales,
              c => c.CustomerID,
              t => t.CustomerId,
              (c, t) => new
              {
                  CustomerId = c.CustomerId,

                  //TitleID = t.TitleId,
                  //TitleDesc = t.TitleDescription,
                  CustomerID = c.CustomerId,
                  CustomerName = c.CustomerName,
                  CustomerSurname = c.CustomerSurname,
                  CustomerCellphoneNumber = c.CustomerCellphoneNumber,
                  CustomerEmailAddress = c.CustomerEmailAddress,
                 // CustomerVATReg = c.CustomerVatreg,
                  CustomerBusinessName = c.CustomerBusinessName,
                  SaleId = t.SaleId

              }).First(cn => cn.SaleId == saleId);

            return Ok(Custitle);
        }

        //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CreateCustomer")] //route
        [HttpPost]
        //Add Customer
        //Create a Model for table
        public IActionResult CreateCustomer(CustomerModel model) //reference the model
        {
            Customer customer = new Customer();
            customer.CustomerName = model.CustomerName; //attributes in table
            customer.CustomerSurname = model.CustomerSurname;
            customer.CustomerCellphoneNumber = model.CustomerCellphoneNumber;
            customer.CustomerEmailAddress = model.CustomerEmailAddress;
            customer.CustomerBusinessName = model.CustomerBusinessName;
            customer.CustomerVatreg = model.CustomerVatReg;
            customer.TitleId = model.TitleID;
            _db.Customers.Add(customer);
            _db.SaveChanges();

            return Ok(customer);
        }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin, Customer")]
        [Route("UpdateCustomer")] //route
        [HttpPut]
        //Update Customer
        public IActionResult UpdateCustomer(CustomerModel model)
        {
            var customer = _db.Customers.Find(model.CustomerID);
            customer.CustomerName = model.CustomerName; //attributes in table
            customer.CustomerSurname = model.CustomerSurname;
            customer.CustomerCellphoneNumber = model.CustomerCellphoneNumber;
            customer.CustomerEmailAddress = model.CustomerEmailAddress;
            customer.CustomerBusinessName = model.CustomerBusinessName;
            customer.CustomerVatreg = model.CustomerVatReg;
            customer.TitleId = model.TitleID;
            _db.Customers.Attach(customer); //Attach Record
            _db.SaveChanges();

            //add to audit trail
            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = user.UserUsername + " updated the Customer: " + model.CustomerName + " " + model.CustomerSurname;
            audit.AuditTrailDate = System.DateTime.Now;
            TimeSpan timeNow = DateTime.Now.TimeOfDay;
            audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();

            return Ok(customer);
        }

        [Route("UpdateProfile")] //route
        [HttpPut]
        //Update Customer
        public IActionResult UpdateProfile(CustomerModel model)
        {
            var customer = _db.Customers.Find(model.UsersID);
            customer.CustomerName = model.CustomerName; //attributes in table
            customer.CustomerSurname = model.CustomerSurname;
            customer.CustomerCellphoneNumber = model.CustomerCellphoneNumber;
            customer.CustomerEmailAddress = model.CustomerEmailAddress;
            customer.CustomerBusinessName = model.CustomerBusinessName;
            customer.CustomerVatreg = model.CustomerVatReg;
            customer.TitleId = model.TitleID;
            _db.Customers.Attach(customer); //Attach Record
            _db.SaveChanges();

            //add to audit trail
            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = model.CustomerName +" " +model.CustomerSurname + " updated their profile. " ;
            audit.AuditTrailDate = System.DateTime.Now;
            TimeSpan timeNow = DateTime.Now.TimeOfDay;
            audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();

            return Ok(customer);
        }

        string response = "";
     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin, Customer")]
        [Route("DeleteCustomer")] //route
        [HttpPost]
        //Delete Customer
        public IActionResult DeleteCustomer(CustomerModel model)
        {
            try
            {
                var customer = _db.Customers.Find(model.CustomerID);
                _db.Customers.Remove(customer); //Delete Record
                _db.SaveChanges();

               // add to audit trail
                var user = _db.Users.Find(model.UsersID);
                AuditTrail audit = new AuditTrail();
                audit.AuditTrailDescription = user.UserUsername + "deleted the Customer " + model.CustomerName + " " + model.CustomerSurname;
                audit.AuditTrailDate = System.DateTime.Now;
                TimeSpan timeNow = DateTime.Now.TimeOfDay;
                audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                audit.UsersId = user.UsersId;
                _db.AuditTrails.Add(audit);
                _db.SaveChanges();
                return Ok(customer);
            }
            catch (Exception)
            {
                response = "Customer could not be deleted due to existing dependencies linked to the particular account";
                return BadRequest(response);
                throw;
            }



        }

        [Route("DeleteProfile")] //route
        [HttpPost]
        //Delete Customer
        public IActionResult DeleteProfile(CustomerModel model)
        {
            try
            {
                var customer = _db.Customers.Find(model.CustomerID);
                _db.Customers.Remove(customer); //Delete Record
                _db.SaveChanges();

                //add to audit trail
                var user = _db.Users.Find(model.UsersID);
                AuditTrail audit = new AuditTrail();
                audit.AuditTrailDescription = user.UserUsername + "deleted their profile";
                audit.AuditTrailDate = System.DateTime.Now;
                TimeSpan timeNow = DateTime.Now.TimeOfDay;
                audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                audit.UsersId = user.UsersId;
                _db.AuditTrails.Add(audit);
                _db.SaveChanges();
                return Ok(customer);
            }
            catch (Exception)
            {
                response = "Customer could not be deleted due to existing dependencies linked to the particular account";
                return BadRequest(response);
                throw;
            }

            

        }
    }
}