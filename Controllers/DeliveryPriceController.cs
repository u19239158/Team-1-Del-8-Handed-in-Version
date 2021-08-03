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
    public class DeliveryPriceController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public DeliveryPriceController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }


        [Route("GetDeliveryPrice")] //route
        [HttpGet]
        //get (Read)
        public IActionResult get()
        {
            var DeliveryPrices = _db.DeliveryPrices.ToList();
            return Ok(DeliveryPrices);
        }



        [Route("CreateDeliveryPrice")] //route
        [HttpPost]
        //Add Delivery Price
        //Create a Model from table attributes
        public IActionResult CreateDeliveryPrice(DeliveryPriceModel model) //reference the model
        {
            DeliveryPrice deliveryprice = new DeliveryPrice();
            deliveryprice.DeliveryDate = model.Delivery_Date; //attributes in table
            deliveryprice.DeliveryDistance = model.Delivery_Distance;
            deliveryprice.DeliveryPrice1 = model.Delivery_Price;
            _db.DeliveryPrices.Add(deliveryprice);
            _db.SaveChanges();

            return Ok(deliveryprice);
        }



        [Route("UpdateDeliveryPrice")] //route
        [HttpPut]
        //Update delivery price
        public IActionResult UpdateDeliveryPrice(DeliveryPriceModel model)
        {
            var deliveryprice = _db.DeliveryPrices.Find(model.DeliveryPriceID);
            deliveryprice.DeliveryDate = model.Delivery_Date; //attributes in table
            deliveryprice.DeliveryDistance = model.Delivery_Distance;
            deliveryprice.DeliveryPrice1 = model.Delivery_Price;
            _db.DeliveryPrices.Attach(deliveryprice); //Attach 
            _db.SaveChanges();

            return Ok(deliveryprice);
        }




        [Route("DeleteDeliveryPrice/{deliverypriceid}")] //route
        [HttpDelete]
        //Delete Delivery Price
        public IActionResult DeleteDeliveryPrice(int deliverypriceid)
        {
            var deliveryprice = _db.DeliveryPrices.Find(deliverypriceid);
            _db.DeliveryPrices.Remove(deliveryprice); //Delete Record
            _db.SaveChanges();

            return Ok(deliveryprice);
        }
    }
}