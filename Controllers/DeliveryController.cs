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



        [Route("UpdateDelivery")] //route
        [HttpPut]
        //Update delivery
        public IActionResult UpdateDelivery(DeliveryModel model)
        {
            var delivery = _db.Deliveries.Find(model.DeliveryID);
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
                     CustomerSurname = sd.CustomerSurname

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
                     AddressId = sor.AddressId,
                     AddressLine1 = sor.AddressLine1,
                     AddressLine2 = sor.AddressLine2,
                     AddressLine3 = sor.AddressLine3,
                     AddressPostalCode = sor.AddressPostalCode,
                     ProvinceId = sd.ProvinceId,
                     ProvinceDescription = sd.ProvinceDescription,

                 }).Where(ss => ss.SaleOrderRecieveType == true).Join(_db.Cities,
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
                        AddressId = sor.AddressId,
                        AddressLine1 = sor.AddressLine1,
                        AddressLine2 = sor.AddressLine2,
                        AddressLine3 = sor.AddressLine3,
                        AddressPostalCode = sor.AddressPostalCode,
                        ProvinceId = sor.ProvinceId,
                        ProvinceDescription = sor.ProvinceDescription,
                        CityDescription = sd.CityDescription
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
                        AddressId = sor.AddressId,
                        AddressLine1 = sor.AddressLine1,
                        AddressLine2 = sor.AddressLine2,
                        AddressLine3 = sor.AddressLine3,
                        AddressPostalCode = sor.AddressPostalCode,
                        ProvinceId = sor.ProvinceId,
                        ProvinceDescription = sor.ProvinceDescription,
                        CityDescription = sor.CityDescription,
                        DeliveryDistance = sd.DeliveryDistance
                    });

            return Ok(Unassigned);

        }
    }
}

