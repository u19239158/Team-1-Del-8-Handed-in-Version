using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
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
        [Route("GetCustomer")] //route
        [HttpGet]
        //get Customer (Read)
        //public IActionResult get()
        //{
        //    var Customers = _db.Customers.ToList();
            
        //    var desc = _db.Titles.Select(td => td.TitleDescription.Where(td.TitleId = )
        //    return Ok(Customers);
        //}

        public ActionResult get()
        {
            //var TtitlesDesc = _db.Titles.Select(zz => zz.TitleDescription).ToList();
            //var Customers = _db.Customers.Include(zz => zz.Title).ToList();
            //var Titles = _db.Titles.Include(xx => xx.Customers);
            //dynamic toreturn = new List<dynamic>();
           //// foreach (var customer in Customers)
           // {
           //     dynamic dynamicCust = new ExpandoObject();
           //     dynamicCust.CustomerName = customer.CustomerName;
           //     dynamicCust.CustomerSurname = customer.CustomerSurname;
           //     dynamicCust.CustomerCellphoneNumber = customer.CustomerCellphoneNumber;
           //     dynamicCust.CustomerEmailAddress = customer.CustomerEmailAddress;
           //     dynamicCust.CustomerVatReg = customer.CustomerVatreg;
           //     dynamicCust.BusinessName = customer.CustomerBusinessName;
           //     dynamicCust.TitleID = customer.TitleId;

           //     toreturn.Add(dynamicCust);

           //     //var descr = from a in Titles
           //     //            join c in Customers on a.TitleId equals c.TitleId
           //     //            select a.TitleDescription;
           // }

            var Custitle = _db.Customers.Join(_db.Titles,
                c => c.TitleId,
                t => t.TitleId,
                (c, t) => new
                {
                    TitleID = c.TitleId,
                    TitleDesc = t.TitleDescription,
                    CustomerName = c.CustomerName,
                    CustomerSurname = c.CustomerSurname,
                    CustomerCellphone = c.CustomerCellphoneNumber,
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
                  TitleID = c.TitleId,
                  TitleDesc = t.TitleDescription,
                  CustomerID = c.CustomerId,
                  CustomerName = c.CustomerName,
                  CustomerSurname = c.CustomerSurname,
                  CustomerCellphone = c.CustomerCellphoneNumber,
                  CustomerEmailAddress = c.CustomerEmailAddress,
                  CustomerVATReg = c.CustomerVatreg,
                  CustomerBusinessName = c.CustomerBusinessName,

              }).First(cn => cn.CustomerID == customerid);

            return Ok(Custitle);
        }

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
                   TitleID = c.TitleId,
                   TitleDesc = t.TitleDescription,
                   CustomerName = c.CustomerName,
                   CustomerSurname = c.CustomerSurname,
                   CustomerCellphone = c.CustomerCellphoneNumber,
                   CustomerEmailAddress = c.CustomerEmailAddress,
                   CustomerVATReg = c.CustomerVatreg,
                   CustomerBusinessName = c.CustomerBusinessName,

               }).Where(cn => cn.CustomerName == customername);
            

            return Ok(Custitle);
        }

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
                   TitleID = c.TitleId,
                   TitleDesc = t.TitleDescription,
                   CustomerName = c.CustomerName,
                   CustomerSurname = c.CustomerSurname,
                   CustomerCellphone = c.CustomerCellphoneNumber,
                   CustomerEmailAddress = c.CustomerEmailAddress,
                   CustomerVATReg = c.CustomerVatreg,
                   CustomerBusinessName = c.CustomerBusinessName,

               }).Where(cn => cn.CustomerSurname == customersurname);


            return Ok(Custitle);

           
        }

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

            return Ok(customer);
        }

        [Route("DeleteCustomer/{customerid}")] //route
        [HttpDelete]
        //Delete Customer
        public IActionResult DeleteCustomer(int customerid)
        {
            var customer = _db.Customers.Find(customerid);
            _db.Customers.Remove(customer); //Delete Record
            _db.SaveChanges();

            return Ok(customer);
        }
    }
}