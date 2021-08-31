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
    public class SupplierPaymentController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public SupplierPaymentController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSupplierPayments")] //route
        [HttpGet]
        //get Supplier Payments (Read)
        public IActionResult get()
        {
            var SupPayments = _db.SupplierPayments.Join(_db.Suppliers,
                 a => a.SupplierId,
                 t => t.SupplierId,
                 (a, t) => new
                 {
                     SupplierID = t.SupplierId,
                     SupplierName = t.SupplierName,

                     SupplierPaymentId = a.SupplierPaymentId,
                     SupplierAmount = a.SupplierAmount

                 });

            return Ok(SupPayments);

        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSupplierPaymentByID/{supplierpaymentid}")] //route
        [HttpGet]
        //get Supplier Payments by ID (Read)
        public IActionResult get(int supplierpaymentid)
        {
            var SupPayment = _db.SupplierPayments.Join(_db.Suppliers,
                 a => a.SupplierId,
                 t => t.SupplierId,
                 (a, t) => new
                 {
                     SupplierID = t.SupplierId,
                     SupplierName = t.SupplierName,

                     SupplierPaymentId = a.SupplierPaymentId,
                     SupplierAmount = a.SupplierAmount

                 }).First (ss => ss.SupplierPaymentId == supplierpaymentid);
            return Ok(SupPayment);
        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSupplierPaymentBySupplierName/{suppliername}")] //route
        [HttpGet]
        //get Supplier Payments by ID (Read)
        public IActionResult get(string suppliername)
        {
            var SupPayments = _db.SupplierPayments.Join(_db.Suppliers,
                 a => a.SupplierId,
                 t => t.SupplierId,
                 (a, t) => new
                 {
                     SupplierID = t.SupplierId,
                     SupplierName = t.SupplierName,

                     SupplierPaymentId = a.SupplierPaymentId,
                     SupplierAmount = a.SupplierAmount

                 }).First(ss => ss.SupplierName == suppliername);
            return Ok(SupPayments);
        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CreateSupplierPayments")] //route
        [HttpPost]
        //Add Supplier Payments
        //Create a Model for table
        public IActionResult CreateSupplierPayment(SupplierPaymentModel model) //reference the model
        {
            SupplierPayment payments = new SupplierPayment();
            payments.SupplierAmount = model.SupplierAmount; //attributes in table
            payments.SupplierId = model.SupplierId;
            _db.SupplierPayments.Add(payments);
            _db.SaveChanges();

            return Ok(payments);
        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("UpdateSupplierPayments")] //route
        [HttpPut]
        //Update Supplier Payment
        public IActionResult UpdateSupplierPayment(SupplierPaymentModel model)
        {
            var payment = _db.SupplierPayments.Find(model.SupplierPaymentId);
            payment.SupplierAmount = model.SupplierAmount;
            payment.SupplierId = model.SupplierId;
            _db.SupplierPayments.Attach(payment); //Attach Record
            _db.SaveChanges();

            return Ok(payment);
        }
    }
}