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
    public class SupplierController : ControllerBase
    {
            private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
            public SupplierController(NKAP_BOLTING_DB_4Context db)
            { _db = db; }
            [Route("GetSupplier")] //route
            [HttpGet]
            //get Supplier (Read)
            public IActionResult get()
            {
                //var Suppliers = _db.Suppliers.ToList();
            var Suppliers = _db.Suppliers.Join(_db.SupplierTypes,
             c => c.SupplierTypeId,
             t => t.SupplierTypeId,
             (c, t) => new
             {
                 SupplierId = c.SupplierId,
                 SupplierName = c.SupplierName,
                 SupplierNumber = c.SupplierNumber,
                 SupplierEmail = c.SupplierEmail,
               //SupplierLocation = c.SupplierLocation,
                 SupplierAddressLine1 = c.SupplierAddressLine1,
                 SupplierAddressLine2 = c.SupplierAddressLine2,
                 SupplierAddressLine3 = c.SupplierAddressLine3,
                 SupplierCityTown = c.SupplierCityTown,
                 SupplierPostalCode = c.SupplierPostalCode,
             //  SupplierBalance = c.SupplierBalance,
             //  SupplierTypeId = t.SupplierTypeId,
                 SupplierTypeDesc = t.SupplierTypeDesc,

             });


            return Ok(Suppliers);
            }

        [Route("GetSupplierByID/{supplierid}")] //route
        [HttpGet]
        //get Supplier by ID (Read)
        public IActionResult get(int supplierid)
        {
            //var Suppliers = _db.Suppliers.Find(supplierid);
            var Suppliers = _db.Suppliers.Join(_db.SupplierTypes,
             c => c.SupplierTypeId,
             t => t.SupplierTypeId,
             (c, t) => new
             {
                 SupplierID = c.SupplierId,
                 SupplierName = c.SupplierName,
                 SupplierNumber = c.SupplierNumber,
                 SupplierEmail = c.SupplierEmail,
             //  SupplierLocation = c.SupplierLocation,
                 SupplierAddressLine1 = c.SupplierAddressLine1,
                 SupplierAddressLine2 = c.SupplierAddressLine2,
                 SupplierAddressLine3 = c.SupplierAddressLine3,
                 SupplierCityTown = c.SupplierCityTown,
                 SupplierPostalCode = c.SupplierPostalCode,
             //  SupplierBalance = c.SupplierBalance,
             //  SupplierTypeId = t.SupplierTypeId,
                 SupplierTypeDesc = t.SupplierTypeDesc,


             }).First(sc => sc.SupplierID == supplierid);
            return Ok(Suppliers);
        }

        [Route("GetSupplierByName/{suppliername}")] //route
        [HttpGet]
        //get Supplier by Name (Read)
        public IActionResult get(string suppliername)
        {
            //var Suppliers = _db.Suppliers.FirstOrDefault(sn => sn.SupplierName == suppliername);
            var Suppliers = _db.Suppliers.Join(_db.SupplierTypes,
            c => c.SupplierTypeId,
            t => t.SupplierTypeId,
            (c, t) => new
            {
                SupplierID = c.SupplierId,
                SupplierName = c.SupplierName,
                SupplierNumber = c.SupplierNumber,
                SupplierEmail = c.SupplierEmail,
             // SupplierLocation = c.SupplierLocation,
                SupplierAddressLine1 = c.SupplierAddressLine1,
                SupplierAddressLine2 = c.SupplierAddressLine2,
                SupplierAddressLine3 = c.SupplierAddressLine3,
                SupplierCityTown = c.SupplierCityTown,
                SupplierPostalCode = c.SupplierPostalCode,
            //  SupplierBalance = c.SupplierBalance,
             // SupplierTypeId = t.SupplierTypeId,
                SupplierTypeDesc = t.SupplierTypeDesc,


            }).First(sc => sc.SupplierName == suppliername);
            return Ok(Suppliers);
        }

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
          //supplier.SupplierLocation = model.SupplierLocation;
            supplier.SupplierAddressLine1 = model.SupplierAddressLine1;
            supplier.SupplierAddressLine2 = model.SupplierAddressLine2;
            supplier.SupplierAddressLine3 = model.SupplierAddressLine3;
            supplier.SupplierCityTown = model.SupplierCityTown;
            supplier.SupplierPostalCode = model.SupplierPostalCode;
         // supplier.SupplierBalance = model.SupplierBalance;
         // supplier.SupplierTypeId = model.SupplierTypeID;
            _db.Suppliers.Add(supplier);
            _db.SaveChanges();

            return Ok(supplier);
        }

        [Route("UpdateSupplier")] //route
        [HttpPut]
        //Update Supplier
        public IActionResult UpdateSupplier(SupplierModel model)
        {
            var supplier = _db.Suppliers.Find(model.SupplierID);
            supplier.SupplierName = model.SupplierName; //attributes in table
            supplier.SupplierNumber = model.SupplierNumber;
            supplier.SupplierEmail = model.SupplierEmail;
          //supplier.SupplierLocation = model.SupplierLocation;
            supplier.SupplierAddressLine1 = model.SupplierAddressLine1;
            supplier.SupplierAddressLine2 = model.SupplierAddressLine2;
            supplier.SupplierAddressLine3 = model.SupplierAddressLine3;
            supplier.SupplierCityTown = model.SupplierCityTown;
            supplier.SupplierPostalCode = model.SupplierPostalCode;
        //  supplier.SupplierBalance = model.SupplierBalance;
        //  supplier.SupplierTypeId = model.SupplierTypeID;
            _db.Suppliers.Attach(supplier); //Attach Record
            _db.SaveChanges();

            return Ok(supplier);
        }

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
    }
}