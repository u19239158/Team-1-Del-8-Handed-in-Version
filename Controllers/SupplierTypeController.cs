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
    public class SupplierTypeController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public SupplierTypeController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Route("GetSupplierType")] //route
        [HttpGet]
        //get SupplierType (Read)
        public IActionResult get()
        {
            var SupplierTypes = _db.SupplierTypes.ToList();
            return Ok(SupplierTypes);
        }

        [Route("CreateSupplierType")] //route
        [HttpPost]
        //Add SupplierType
        //Create a Model for table
        public IActionResult CreateSupplierType(SupplierTypeModel model) //reference the model
        {
            SupplierType suppliertype = new SupplierType();
            suppliertype.SupplierTypeDesc = model.SupplierType_Description; //attributes in table
            _db.SupplierTypes.Add(suppliertype);
            _db.SaveChanges();

            return Ok(suppliertype);
        }

        [Route("UpdateSupplierType")] //route
        [HttpPut]
        //Update SupplierType
        public IActionResult UpdateSupplierType(SupplierTypeModel model)
        {
            var suppliertype = _db.SupplierTypes.Find(model.SupplierType_ID);
            suppliertype.SupplierTypeDesc = model.SupplierType_Description; //attributes in table
            _db.SupplierTypes.Attach(suppliertype); //Attach Record
            _db.SaveChanges();

            return Ok(suppliertype);
        }

        [Route("DeleteSupplierType/{supplierid}")] //route
        [HttpDelete]
        //Delete SupplierType
        public IActionResult DeleteSupplierType(int supplierid)
        {
            var suppliertype = _db.SupplierTypes.Find(supplierid);
            _db.SupplierTypes.Remove(suppliertype); //Delete Record
            _db.SaveChanges();

            return Ok(suppliertype);
        }
    }
}