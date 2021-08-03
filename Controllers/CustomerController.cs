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
        public IActionResult get()
        {
            var Customers = _db.Customers.ToList();
            return Ok(Customers);
        }

        [Route("GetCustomerByID/{customerid}")] //route
        [HttpGet]
        //get Customer by ID (Read)
        public IActionResult get(int customerid)
        {
            var Customer = _db.Customers.Find(customerid);
            return Ok(Customer);
        }

        [Route("GetCustomerByName/{customername}")] //route
        [HttpGet]
        //get Customer by Name (Read)
        public IActionResult Get(string customername)
        {
            var Customer = _db.Customers.FirstOrDefault(cn => cn.CustomerName == customername);
            return Ok(Customer);
        }

        [Route("GetCustomerBySurname/{customersurname}")] //route
        [HttpGet]
        //get Customer by ID (Read)
        public IActionResult get(string customersurname)
        {
            var Customer = _db.Customers.FirstOrDefault(cs => cs.CustomerSurname == customersurname);
            return Ok(Customer);
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