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
    public class CourierController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public CourierController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetCourier")] //route
        [HttpGet]
        //get Courier (Read)
        public IActionResult get()
        {

            var Couriers = _db.Couriers.Join(_db.CourierTypes,
                a => a.CourierTypeId,
                t => t.CourierTypeId,
                (a, t) => new
                {
                    CourierTypeID = a.CourierTypeId,
                    CourierTypeDescription = t.CourierTypeDescription,
                    CourierName = a.CourierName,
                    CourierNumber = a.CourierNumber,
                    CourierEmail = a.CourierEmail,
                    CourierID = a.CourierId

                });
                    
            return Ok(Couriers);
        }

        [Route("GetCourierByID/{courierid}")] //route
        [HttpGet]
        //get Courier by ID (Read)
        public IActionResult get(int courierid)
        {
            //var Couriers = _db.Couriers.Find(courierid);
            var Couriers = _db.Couriers.Join(_db.CourierTypes,
              a => a.CourierTypeId,
              t => t.CourierTypeId,
              (a, t) => new
              {
                  CourierTypeID = a.CourierTypeId,
                  CourierTypeDescription = t.CourierTypeDescription,
                  CourierName = a.CourierName,
                  CourierNumber = a.CourierNumber,
                  CourierEmail = a.CourierEmail,
                  CourierID = a.CourierId,

              }).First(pd => pd.CourierID == courierid);
            
            return Ok(Couriers);
        }

        [Route("GetCourierByName/{couriername}")] //route
        [HttpGet]
        //get Courier by ID (Read)
        public IActionResult get(string couriername)
        {
            //var Couriers = _db.Couriers.FirstOrDefault(cn => cn.CourierName == couriername);
            var Couriers = _db.Couriers.Join(_db.CourierTypes,
             a => a.CourierTypeId,
             t => t.CourierTypeId,
             (a, t) => new
             {
                 CourierTypeID = a.CourierTypeId,
                 CourierTypeDescription = t.CourierTypeDescription,
                 CourierName = a.CourierName,
                 CourierNumber = a.CourierNumber,
                 CourierEmail = a.CourierEmail,
                 CourierID = a.CourierId,

             }).First(pd => pd.CourierName == couriername);
            return Ok(Couriers);
        }

        [Route("CreateCourier")] //route
        [HttpPost]
        //Add Courier
        //Create a Model for table
        public IActionResult CreateCourier(CourierModel model) //reference the model
        {
            Courier courier = new Courier();
            courier.CourierName = model.CourierName; //attributes in table
            courier.CourierNumber = model.CourierNumber;
            courier.CourierEmail = model.CourierEmail;
            courier.CourierTypeId = model.CourierTypeID;
            _db.Couriers.Add(courier);
            _db.SaveChanges();

            return Ok(courier);
        }

        [Route("UpdateCourier")] //route
        [HttpPut]
        //Update Courier
        public IActionResult UpdateCourier (CourierModel model)
        {
            var courier = _db.Couriers.Find(model.CourierID);
            courier.CourierName = model.CourierName; //attributes in table
            courier.CourierNumber = model.CourierNumber;
            courier.CourierEmail = model.CourierEmail;
            courier.CourierTypeId = model.CourierTypeID;
            _db.Couriers.Attach(courier); //Attach Record
            _db.SaveChanges();

            return Ok(courier);
        }

        [Route("DeleteCourier/{courierid}")] //route
        [HttpDelete]
        //Delete Category Type
        public IActionResult DeleteCourier(int courierid)
        {
            var courier = _db.Couriers.Find(courierid);
            _db.Couriers.Remove(courier); //Delete Record
            _db.SaveChanges();

            return Ok(courier);
        }

    }
}