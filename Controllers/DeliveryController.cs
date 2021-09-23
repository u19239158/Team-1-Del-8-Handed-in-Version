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
    public class DeliveryController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public DeliveryController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetDelivery")] //route
        [HttpGet]
        //get (Read)                                                                                                                                                                                        
        public IActionResult get()
        {
            var Deliveries = _db.Deliveries.Join(_db.Couriers,
                su => su.CourierId,
                so => so.CourierId,

                (su, so) => new
                {
                   
                    DeliveryID = su.DeliveryId,
                    CourierId = so.CourierId,
                    CourierName = so.CourierName,
                    DeliveryDate = su.DeliveryDate,
                    CourierTrackingNumber = su.CourierTrackingNumber,
                    DeliveryDistance = su.DeliveryDistance,
                    SaleId = su.SaleId,
                    AddressId = su.AddressId,
                  
                     //attributes in table

                 }).Join(_db.Sales,
                sor => sor.SaleId,
                sd => sd.SaleId,
                (sor, sd) => new
                {
                    DeliveryID = sor.DeliveryID,
                    SaleId = sd.SaleId,
                    CourierId = sor.CourierId,
                    CourierName = sor.CourierName,
                    DeliveryDate = sor.DeliveryDate,
                    CourierTrackingNumber = sor.CourierTrackingNumber,
                    DeliveryDistance = sor.DeliveryDistance,
                    AddressId = sor.AddressId

                }).Join(_db.Addresses,
                sor => sor.AddressId,
                sd => sd.AddressId,
                (jj, dd) => new
                {
                    DeliveryID = jj.DeliveryID,
                    SaleId = jj.SaleId,
                    AddressId = dd.AddressId,
                    AddressLine1 = dd.AddressLine1,
                    AddressLine2 = dd.AddressLine2,
                    AddressLine3 = dd.AddressLine3,
                    PostalCode = dd.AddressPostalCode,
                    CourierId = jj.CourierId,
                    CourierName = jj.CourierName,
                    CourierTrackingNumber = jj.CourierTrackingNumber,
                    DeliveryDistance = jj.DeliveryDistance,
                    DeliveryDate = jj.DeliveryDate

                })
               ;
            return Ok(Deliveries);
        }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetDeliveryByDate/{deliverydate}")] //route
        [HttpGet]
        //get Delivery by ID (Read)
        public IActionResult get(DateTime deliverydate)
        {
            var Deliveries = _db.Deliveries.Join(_db.Couriers,
                su => su.CourierId,
                so => so.CourierId,

                (su, so) => new
                {

                    DeliveryID = su.DeliveryId,
                    CourierId = so.CourierId,
                    CourierName = so.CourierName,
                    DeliveryDate = su.DeliveryDate,
                    CourierTrackingNumber = su.CourierTrackingNumber,
                    DeliveryDistance = su.DeliveryDistance,
                    SaleId = su.SaleId,
                    AddressId = su.AddressId,

                    //attributes in table

                }).Join(_db.Sales,
                sor => sor.SaleId,
                sd => sd.SaleId,
                (sor, sd) => new
                {
                    DeliveryID = sor.DeliveryID,
                    SaleId = sd.SaleId,
                    CourierId = sor.CourierId,
                    CourierName = sor.CourierName,
                    DeliveryDate = sor.DeliveryDate,
                    CourierTrackingNumber = sor.CourierTrackingNumber,
                    DeliveryDistance = sor.DeliveryDistance,
                    AddressId = sor.AddressId

                }).Join(_db.Addresses,
                sor => sor.AddressId,
                sd => sd.AddressId,
                (jj, dd) => new
                {
                    DeliveryID = jj.DeliveryID,
                    SaleId = jj.SaleId,
                    AddressId = dd.AddressId,
                    AddressLine1 = dd.AddressLine1,
                    AddressLine2 = dd.AddressLine2,
                    AddressLine3 = dd.AddressLine3,
                    PostalCode = dd.AddressPostalCode,
                    CourierId = jj.CourierId,
                    CourierName = jj.CourierName,
                    CourierTrackingNumber = jj.CourierTrackingNumber,
                    DeliveryDistance = jj.DeliveryDistance,
                    DeliveryDate = jj.DeliveryDate

                }).Where(dd => dd.DeliveryDate == deliverydate)
               ;

            return Ok(Deliveries);
        }


     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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
            delivery.SaleId = model.SaleId;
            delivery.AddressId = model.AddressId;
            delivery.CourierId = model.CourierId;
            _db.Deliveries.Add(delivery);
            _db.SaveChanges();

            return Ok(delivery);
        }


      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("UpdateDelivery")] //route
        [HttpPut]
        //Update delivery
        public IActionResult UpdateDelivery(DeliveryModel model)
        {
            var delivery = _db.Deliveries.Find(model.DeliveryId);
            delivery.DeliveryDate = model.Delivery_Date; //attributes in table
            delivery.DeliveryDistance = model.Delivery_Distance;
            delivery.CourierTrackingNumber = model.Courier_TrackingNumber;
            delivery.SaleId = model.SaleId;
            delivery.AddressId = model.AddressId;
            delivery.CourierId = model.CourierId;
            _db.Deliveries.Attach(delivery); //Attach 
            _db.SaveChanges();

            return Ok(delivery);
        }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetUnassignedDeliveries")] //route
        [HttpGet]
        //get Delivery Shift (Read)
        public IActionResult GetUnassignedDeliveries()
        {
            //var Admins = _db.Admins.ToList();

            var Unassigned = _db.Sales.Join(_db.OrderStatuses,
                a => a.OrderStatusId,
                t => t.OrderStatusId,
                (a, t) => new
                {
                    SaleId = a.SaleId,
                    SaleOrderAssign = a.SaleOrderAssign,
                    SaleOrderRecieveType = a.SaleOrderRecieveType,
                    OrderStatusId = t.OrderStatusId,
                    CustomerId = a.CustomerId

                }).Join(_db.Customers,
                 sor => sor.CustomerId,
                 sd => sd.CustomerId,
                 (sor, sd) => new
                 {
                     SaleId = sor.SaleId,
                     SaleOrderAssign = sor.SaleOrderAssign,
                     SaleOrderRecieveType = sor.SaleOrderRecieveType,
                     OrderStatusId = sor.OrderStatusId,
                     CustomerId = sd.CustomerId,
                     CustomerName = sd.CustomerName,
                     CustomerSurname = sd.CustomerSurname,
                     CustomerBusinessName = sd.CustomerBusinessName

                 }).Join(_db.Addresses,
                 sor => sor.CustomerId,
                 sd => sd.CustomerId,
                 (sor, sd) => new
                 {
                     SaleId = sor.SaleId,
                     SaleOrderAssign = sor.SaleOrderAssign,
                     SaleOrderRecieveType = sor.SaleOrderRecieveType,
                     OrderStatusId = sor.OrderStatusId,
                     CustomerId = sor.CustomerId,
                     CustomerName = sor.CustomerName,
                     CustomerSurname = sor.CustomerSurname,
                     CustomerBusinessName = sor.CustomerBusinessName,
                     AddressId = sd.AddressId,
                     AddressLine1 = sd.AddressLine1,
                     AddressLine2 = sd.AddressLine2,
                     AddressLine3 = sd.AddressLine3,
                     AddressPostalCode = sd.AddressPostalCode,
                     ProvinceId = sd.ProvinceId

                 }).Where(ss => ss.SaleOrderAssign == false).Join(_db.Provinces,
                 sor => sor.ProvinceId,
                 sd => sd.ProvinceId,
                 (sor, sd) => new
                 {
                     SaleId = sor.SaleId,
                     SaleOrderAssign = sor.SaleOrderAssign,
                     SaleOrderRecieveType = sor.SaleOrderRecieveType,
                     OrderStatusId = sor.OrderStatusId,
                     CustomerId = sor.CustomerId,
                     CustomerName = sor.CustomerName,
                     CustomerSurname = sor.CustomerSurname,
                     CustomerBusinessName = sor.CustomerBusinessName,
                     AddressId = sor.AddressId,
                     AddressLine1 = sor.AddressLine1,
                     AddressLine2 = sor.AddressLine2,
                     AddressLine3 = sor.AddressLine3,
                     AddressPostalCode = sor.AddressPostalCode,
                     ProvinceId = sd.ProvinceId,
                     ProvinceDescription = sd.ProvinceDescription,

                 }).Where(ss => ss.SaleOrderRecieveType == false).Join(_db.Provinces,
                 sor => sor.ProvinceId,
                 sd => sd.ProvinceId,
                    (sor, sd) => new
                    {
                        SaleId = sor.SaleId,
                        SaleOrderAssign = sor.SaleOrderAssign,
                        SaleOrderRecieveType = sor.SaleOrderRecieveType,
                        OrderStatusId = sor.OrderStatusId,
                        CustomerId = sor.CustomerId,
                        CustomerName = sor.CustomerName,
                        CustomerSurname = sor.CustomerSurname,
                        CustomerBusinessName = sor.CustomerBusinessName,
                        AddressId = sor.AddressId,
                        AddressLine1 = sor.AddressLine1,
                        AddressLine2 = sor.AddressLine2,
                        AddressLine3 = sor.AddressLine3,
                        AddressPostalCode = sor.AddressPostalCode,
                        ProvinceId = sor.ProvinceId,
                        ProvinceDescription = sor.ProvinceDescription,
                        //CityDescription = sd.CityDescription
                    }).Where(ss => ss.OrderStatusId == 3).Join(_db.Deliveries,
                 sor => sor.AddressId,
                 sd => sd.AddressId,
                    (sor, sd) => new
                    {
                        SaleId = sor.SaleId,
                        SaleOrderAssign = sor.SaleOrderAssign,
                        SaleOrderRecieveType = sor.SaleOrderRecieveType,
                        OrderStatusId = sor.OrderStatusId,
                        CustomerId = sor.CustomerId,
                        CustomerName = sor.CustomerName,
                        CustomerSurname = sor.CustomerSurname,
                        CustomerBusinessName = sor.CustomerBusinessName,
                        AddressId = sor.AddressId,
                        AddressLine1 = sor.AddressLine1,
                        AddressLine2 = sor.AddressLine2,
                        AddressLine3 = sor.AddressLine3,
                        AddressPostalCode = sor.AddressPostalCode,
                        ProvinceId = sor.ProvinceId,
                        ProvinceDescription = sor.ProvinceDescription,
                      //CityDescription = sor.CityDescription,
                        DeliveryDistance = sd.DeliveryDistance,
                        DeliveryId = sd.DeliveryId
                    });

            return Ok(Unassigned);

        }

      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("AssignLocalDelivery")] //route
        [HttpPut]
        //Update Order Status
        public IActionResult AssignLocalDelivery(DeliveryShiftModel model)
        {
            //string response;
            //var ds = _db.EmployeeShifts.Find(model.EmployeeShiftId);
            //var md = _db.MaxDeliveries.First(zz => zz.MaxID = 1);
            //if (ds.NoOfDeliveries < md.MaxNumber)
            //{

            //}
            //else
            //{
            //    response = "Shift has reached the maximum delivery capacity";
            //    return BadRequest(response);
            //}
          
            //ds.NoOfDeliveries = +1;
            //_db.EmployeeShifts.Attach(ds); //Attach Record
            //_db.SaveChanges();

            var sd = _db.Sales.Find(model.SaleID);
            sd.SaleOrderAssign = true;
            _db.Sales.Attach(sd); //Attach Record
            _db.SaveChanges();

            //var dd = _db.EmployeeShifts.Find(model.EmployeeShiftId);
            //dd.DeliveryId = model.DeliveryId;
            //_db.EmployeeShifts.Attach(dd);
            return Ok(sd);
        }

        //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("AssignDelivery")] //route
        [HttpPut]
        //Update Order Status
        public IActionResult AssignDelivery(DeliveryShiftModel model)
        {
            var dd = _db.EmployeeShifts.Find(model.EmployeeShiftId);
            dd.DeliveryId = model.DeliveryId;
            _db.EmployeeShifts.Attach(dd);

            //add to audit trail
            //var user = _db.Users.Find(model.UsersID);
            //AuditTrail audit = new AuditTrail();
            //audit.AuditTrailDescription = user.UserUsername + " assigned a Delivery to a Shift";
            //audit.AuditTrailDate = System.DateTime.Now;
            //TimeSpan timeNow = DateTime.Now.TimeOfDay;
            //audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            //audit.UsersId = user.UsersId;
            //_db.AuditTrails.Add(audit);
            //_db.SaveChanges();

            return Ok(dd);
        }


            //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
            [Route("AssignCourier")] //route
        [HttpPut]
        //Update Order Status
        public IActionResult AssignCourier(DeliveryShiftModel model)
        {
            var sd = _db.Sales.Find(model.SaleID);
            sd.SaleOrderAssign = true;
            _db.Sales.Attach(sd); //Attach Record
            _db.SaveChanges();

            //add to audit trail
            //var user = _db.Users.Find(model.UsersID);
            //AuditTrail audit = new AuditTrail();
            //audit.AuditTrailDescription = user.UserUsername + " assigned a Courier to a Delivery";
            //audit.AuditTrailDate = System.DateTime.Now;
            //TimeSpan timeNow = DateTime.Now.TimeOfDay;
            //audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            //audit.UsersId = user.UsersId;
            //_db.AuditTrails.Add(audit);
            //_db.SaveChanges();

            return Ok(sd);
        }

      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetDeliveryInfo/{deliveryId}")] //route
        [HttpGet]
        //get (Read)                                                                                                                                                                                        
        public IActionResult GetDeliveryInfo(int deliveryId)
        {
            var Deliveries = _db.Deliveries.Join(_db.Sales,
                sor => sor.SaleId,
                sd => sd.SaleId,
                (sor, sd) => new
                {
                    DeliveryId = sor.DeliveryId,
                    SaleId = sd.SaleId,
                    CustomerId = sd.CustomerId,
                    DeliveryDate = sor.DeliveryDate,
                    CourierTrackingNumber = sor.CourierTrackingNumber,
                    DeliveryDistance = sor.DeliveryDistance,
                    AddressId = sor.AddressId

                }).Join(_db.Customers ,
                sor => sor.CustomerId,
                sd => sd.CustomerId,
                (jj, dd) => new
                {
                    DeliveryId = jj.DeliveryId,
                    SaleId = jj.SaleId,
                    CustomerName = dd.CustomerName,
                    CustomerSurname = dd.CustomerSurname,
                    CustomerBusinessName = dd.CustomerBusinessName,
                    CustomerCellphoneNumber = dd.CustomerCellphoneNumber,
                    CustomerEmailAddress = dd.CustomerEmailAddress,
                    AddressId = jj.AddressId,
                    CourierTrackingNumber = jj.CourierTrackingNumber,
                    DeliveryDistance = jj.DeliveryDistance,
                    DeliveryDate = jj.DeliveryDate

                }).Join(_db.Addresses,
                sor => sor.AddressId,
                sd => sd.AddressId,
                (jj, dd) => new
                {
                    DeliveryId = jj.DeliveryId,
                    SaleId = jj.SaleId,
                    CustomerName = jj.CustomerName,
                    CustomerSurname = jj.CustomerSurname,
                    CustomerBusinessName = jj.CustomerBusinessName,
                    CustomerCellphoneNumber = jj.CustomerCellphoneNumber,
                    CustomerEmailAddress = jj.CustomerEmailAddress,
                    AddressId = dd.AddressId,
                    AddressLine1 = dd.AddressLine1,
                    AddressLine2 = dd.AddressLine2,
                    AddressLine3 = dd.AddressLine3,
                    PostalCode = dd.AddressPostalCode,
                    CourierTrackingNumber = jj.CourierTrackingNumber,
                    DeliveryDistance = jj.DeliveryDistance,
                    DeliveryDate = jj.DeliveryDate

                }).First(zz =>zz.DeliveryId == deliveryId) ;
           
            return Ok(Deliveries);
        }
    }
}

