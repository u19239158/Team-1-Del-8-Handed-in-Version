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
    public class SupplierPaymentController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public SupplierPaymentController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetSupplierPayments")] //route
        [HttpGet]
        //get Supplier Payments (Read)
        public IActionResult get()
        {
            var payments = _db.SupplierPayments.ToList();
            return Ok(payments);

        }

        [Route("GetSupplierPayments/{supplieramountid}")] //route
        [HttpGet]
        //get Supplier Payments by ID (Read)
        public IActionResult get(int supplieramountid)
        {
            var payments = _db.SupplierPayments.Find(supplieramountid);
            return Ok(payments);
        }


        [Route("CreateSupplierPayments")] //route
        [HttpPost]
        //Add Supplier Payments
        //Create a Model for table
        public IActionResult CreateSupplierPayment(SupplierPaymentModel model) //reference the model
        {
            SupplierPayment payments = new SupplierPayment();
            payments.SupplierAmount = model.SupplierAmount; //attributes in table
            _db.SupplierPayments.Add(payments);
            _db.SaveChanges();

            return Ok(payments);
        }

        [Route("UpdateSupplierPayments")] //route
        [HttpPut]
        //Update Supplier Payment
        public IActionResult UpdateSupplierPayment(SupplierPaymentModel model)
        {
            var payment = _db.SupplierPayments.Find(model.SupplierAmountID);
            payment.SupplierAmount = model.SupplierAmount;
            _db.SupplierPayments.Attach(payment); //Attach Record
            _db.SaveChanges();

            return Ok(payment);
        }
    }
}