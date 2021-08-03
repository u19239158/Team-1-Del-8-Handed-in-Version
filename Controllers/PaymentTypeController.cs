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
    public class PaymentTypeController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public PaymentTypeController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Route("GetPaymentType")] //route
        [HttpGet]
        //get PaymentType (Read)
        public IActionResult get()
        {
            var PaymentTypes = _db.PaymentTypes.ToList();
            return Ok(PaymentTypes);
        }


        [Route("CreatePaymentType")] //route
        [HttpPost]
        //Add PaymentType
        //Create a Model for table
        public IActionResult CreatePaymentType(PaymentTypeModel model) //reference the model
        {
            PaymentType paymenttype = new PaymentType();
            paymenttype.PaymentTypeDescription = model.PriceDescription; //attributes in table
            _db.PaymentTypes.Add(paymenttype);
            _db.SaveChanges();

            return Ok(paymenttype);
        }

        [Route("UpdatePaymentType")] //route
        [HttpPut]
        //Update PaymentType
        public IActionResult UpdatePaymentType(PaymentTypeModel model)
        {
            var paymenttype = _db.PaymentTypes.Find(model.PaymentType_ID);
            paymenttype.PaymentTypeDescription = model.PriceDescription; //attributes in table
            _db.PaymentTypes.Attach(paymenttype); //Attach Record
            _db.SaveChanges();

            return Ok(paymenttype);
        }

        [Route("DeletePaymentType/{paymenttypeid}")] //route
        [HttpDelete]
        //Delete PaymentType
        public IActionResult DeletePaymentType(int paymenttypeid)
        {
            var paymenttype = _db.PaymentTypes.Find(paymenttypeid);
            _db.PaymentTypes.Remove(paymenttype); //Delete Record
            _db.SaveChanges();

            return Ok(paymenttype);
        }
    }
}