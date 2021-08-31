using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    public class SupplierController : ControllerBase
    {
            private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
            public SupplierController(NKAP_BOLTING_DB_4Context db)
            { _db = db; }
        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSupplier")] //route
            [HttpGet]
            //get Supplier (Read)
            public IActionResult get()
            {
                var Suppliers = _db.Suppliers.ToList();
                 return Ok(Suppliers);
            }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSupplierByID/{supplierid}")] //route
        [HttpGet]
        //get Supplier by ID (Read)
        public IActionResult get(int supplierid)
        {
            var Suppliers = _db.Suppliers.First(sc => sc.SupplierId == supplierid);
            return Ok(Suppliers);
        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSupplierByName/{suppliername}")] //route
        [HttpGet]
        //get Supplier by Name (Read)
        public IActionResult get(string suppliername)
        {
            var Suppliers = _db.Suppliers.First(sc => sc.SupplierName == suppliername);
            return Ok(Suppliers);
        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CreateSupplier")] //route
        [HttpPost]
        //Add Supplier
        //Create a Model for table
        public IActionResult CreateSupplier(SupplierModel model) //reference the model
        {
            Supplier supplier = new Supplier();
            supplier.SupplierName = model.SupplierName; //attributes in table
            supplier.SupplierNumber = model.SupplierNumber;
            supplier.SupplierEmail = model.SupplierEmail;
            supplier.SupplierAddressLine1 = model.SupplierAddressLine1;
            supplier.SupplierAddressLine2 = model.SupplierAddressLine2;
            supplier.SupplierAddressLine3 = model.SupplierAddressLine3;
            supplier.SupplierCityTown = model.SupplierCityTown;
            supplier.SupplierPostalCode = model.SupplierPostalCode;
         // supplier.SupplierBalance = model.SupplierBalance;
            _db.Suppliers.Add(supplier);
            _db.SaveChanges();

            return Ok(supplier);
        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("UpdateSupplier")] //route
        [HttpPut]
        //Update Supplier
        public IActionResult UpdateSupplier(SupplierModel model)
        {
            var supplier = _db.Suppliers.Find(model.SupplierId);
            supplier.SupplierName = model.SupplierName; //attributes in table
            supplier.SupplierNumber = model.SupplierNumber;
            supplier.SupplierEmail = model.SupplierEmail;
            supplier.SupplierAddressLine1 = model.SupplierAddressLine1;
            supplier.SupplierAddressLine2 = model.SupplierAddressLine2;
            supplier.SupplierAddressLine3 = model.SupplierAddressLine3;
            supplier.SupplierCityTown = model.SupplierCityTown;
            supplier.SupplierPostalCode = model.SupplierPostalCode;
        //  supplier.SupplierBalance = model.SupplierBalance;
            _db.Suppliers.Attach(supplier); //Attach Record
            _db.SaveChanges();

            return Ok(supplier);
        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("DeleteSupplier/{supplierid}")] //route
        [HttpDelete]
        //Delete Supplier
        public IActionResult DeleteSupplier(int supplierid)
        {
            var supplier = _db.Suppliers.Find(supplierid);
            _db.Suppliers.Remove(supplier); //Delete Record
            _db.SaveChanges();

            return Ok(supplier);
        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CaptureSupplierPayment")] //route
        [HttpPost]
        //Add Product Item Write-of
        //Create a Model for table
        public IActionResult CaptureSupplierPayment(SupplierPaymentModel model) //reference the model
        {
            SupplierPayment payment = new SupplierPayment
            {
                //attributes in table 
                SupplierAmount = model.SupplierAmount,
                SupplierId = model.SupplierId,
                SupplierPaymentDate = System.DateTime.Now
                 
            };
            _db.SupplierPayments.Add(payment);
            _db.SaveChanges();

            Supplier Suppayment = _db.Suppliers.Find(model.SupplierId);
            {
                //attributes in table 
                Suppayment.SupplierBalance = Suppayment.SupplierBalance - model.SupplierAmount;
            };
            _db.Suppliers.Attach(Suppayment);
            _db.SaveChanges();

          

            return Ok();
        }
    }
}