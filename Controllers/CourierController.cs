﻿using System;
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
    public class CourierController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public CourierController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

            //add to audit trail
            //var user = _db.Users.Find(model.UsersID);
            //AuditTrail audit = new AuditTrail();
            //audit.AuditTrailDescription = user.UserUsername + " added the Courier: " + model.CourierName ;
            //audit.AuditTrailDate = System.DateTime.Now;
            //audit.AuditTrailTime = System.DateTime.Now.TimeOfDay;
            //audit.UsersId = user.UsersId;
            //_db.AuditTrails.Add(audit);
            //_db.SaveChanges();

            return Ok(courier);
        }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

            //add to audit trail
            //var user = _db.Users.Find(model.UsersID);
            //AuditTrail audit = new AuditTrail();
            //audit.AuditTrailDescription = user.UserUsername + " updated the Courier: " + model.CourierName ;
            //audit.AuditTrailDate = System.DateTime.Now;
            //audit.AuditTrailTime = System.DateTime.Now.TimeOfDay;
            //audit.UsersId = user.UsersId;
            //_db.AuditTrails.Add(audit);
            //_db.SaveChanges();

            return Ok(courier);
        }
        string response = "";
      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("DeleteCourier/{courierid}")] //route
        [HttpDelete]
        //Delete Category Type
        public IActionResult DeleteCourier(int courierid)
        {
            try
            {
                var courier = _db.Couriers.Find(courierid);
                _db.Couriers.Remove(courier); //Delete Record
                _db.SaveChanges();
                return Ok(courier);
            }
            catch (Exception)
            {
                response = "Courier could not be deleted due to active orders in transit";
                return BadRequest(response);
                throw;
            }

            //add to audit trail
            //var user = _db.Users.Find(model.UsersID);
            //AuditTrail audit = new AuditTrail();
            //audit.AuditTrailDescription = user.UserUsername + "deleted a Courier";
            //audit.AuditTrailDate = System.DateTime.Now;
            //audit.AuditTrailTime = System.DateTime.Now.TimeOfDay;
            //audit.UsersId = user.UsersId;
            //_db.AuditTrails.Add(audit);
            //_db.SaveChanges();

        }

    }
}