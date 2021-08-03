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
    public class DeliveryController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public DeliveryController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Route("GetDelivery")] //route
        [HttpGet]
        //get (Read)                                                                                                                                                                                        
        public IActionResult get()
        {
            var Deliveries = _db.Deliveries.ToList();
            return Ok(Deliveries);
        }

        //[Route("GetDeliveryByID/{deliveryid}")] //route
        //[HttpGet]
        ////get Delivery by ID (Read)
        //public IActionResult get(int deliveryid)
        //{
        //    var Deliveries = _db.Employees.Find(deliveryid);
        //    return Ok(Deliveries);
        //}



        [Route("CreateDelivery")] //route
        [HttpPost]
        //Add Delivery
        //Create a Model from table attributes
        public IActionResult CreateDelivery(DeliveryModel model) //reference the model
        {
            Delivery delivery = new Delivery();
            delivery.DeliveryDate = model.Delivery_Date; //attributes in table
            delivery.DeliveryDistance = model.Delivery_Distance;
            delivery.CourierTrackingNumber = model.Courier_TrackingNumber;
            _db.Deliveries.Add(delivery);
            _db.SaveChanges();

            return Ok(delivery);
        }



        [Route("UpdateDelivery")] //route
        [HttpPut]
        //Update delivery
        public IActionResult UpdateDelivery(DeliveryModel model)
        {
            var delivery = _db.Deliveries.Find(model.DeliveryID);
            delivery.DeliveryDate = model.Delivery_Date; //attributes in table
            delivery.DeliveryDistance = model.Delivery_Distance;
            delivery.CourierTrackingNumber = model.Courier_TrackingNumber;
            _db.Deliveries.Attach(delivery); //Attach 
            _db.SaveChanges();

            return Ok(delivery);
        }




        [Route("DeleteDeliveries/{deliveryid}")] //route
        [HttpDelete]
        //Delete Delivery
        public IActionResult DeleteDelivery(int deliveryid)
        {
            var delivery = _db.Deliveries.Find(deliveryid);
            _db.Deliveries.Remove(delivery); //Delete Record
            _db.SaveChanges();

            return Ok(delivery);
        }
    }
}

