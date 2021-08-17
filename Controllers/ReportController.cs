using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NKAP_API_2.EF;
using NKAP_API_2.Models;


namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public ReportController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Route("GetPackingReportData")] //route
        [HttpGet]
        //get Sales with status "needs packing"
        public IActionResult get(ReportModel model)
        {
            //var NeedsPackingSales = _db.Sales.Include(od => od.OrderStatus).Where(od => od.OrderStatus.OrderStatusDescription == "Needs Packing").ToList();
            var NeedsPackingSales = _db.Sales.Join(_db.OrderStatuses,
                 a => a.OrderStatusId,
                t => t.OrderStatusId,
                (a, t) => new
                {
                    OrderStatusId = a.OrderStatusId,
                    SaleId = a.SaleId,
                    SaleOrderDescription = a.SaleOrderDescription,
                    SaleOrderDate = a.SaleOrderDate,
                    SaleOrderRecieveType = a.SaleOrderRecieveType,
                    AssignedTo = a.SaleOrderAssign,
                    PaymentDate = a.PaymentDate,
                    OrderStatusDescription = t.OrderStatusDescription

                }).Where(oo => oo.OrderStatusDescription == "Needs Packing");

            return Ok(NeedsPackingSales);
        }

        [Route("GetDeliveryReportData")] //route
        [HttpGet]
        //get Sales with status "needs packing"
        public IActionResult Get(ReportModel model)
        {
            //var NeedsPackingSales = _db.Sales.Include(od => od.OrderStatus).Where(od => od.OrderStatus.OrderStatusDescription == "Needs Packing").ToList();
            var ReadyForDeliveryOrder = _db.Sales.Join(_db.OrderStatuses,
                 a => a.OrderStatusId,
                t => t.OrderStatusId,
                (a, t) => new
                {
                    OrderStatusId = a.OrderStatusId,
                    SaleId = a.SaleId,
                    SaleOrderDescription = a.SaleOrderDescription,
                    SaleOrderDate = a.SaleOrderDate,
                    SaleOrderRecieveType = a.SaleOrderRecieveType,
                    SaleOrderAssign = a.SaleOrderAssign,
                    PaymentDate = a.PaymentDate,
                    OrderStatusDescription = t.OrderStatusDescription,
                    CustomerId = a.CustomerId
                    

                }).Where(oo => oo.OrderStatusDescription == "Ready for Delivery")

                .Join(_db.Customers,
                a => a.CustomerId,
                t => t.CustomerId,
                (a, t) => new
                {
                    OrderStatusId = a.OrderStatusId,
                    SaleId = a.SaleId,
                    SaleOrderDescription = a.SaleOrderDescription,
                    SaleOrderDate = a.SaleOrderDate,
                    SaleOrderRecieveType = a.SaleOrderRecieveType,
                    SaleOrderAssign = a.SaleOrderAssign,
                    PaymentDate = a.PaymentDate,
                    OrderStatusDescription = a.OrderStatusDescription,
                    CustomerName = t.CustomerName,
                    CustomerSurname = t.CustomerSurname,
                    CustomerEmailAddress = t.CustomerEmailAddress,
                    CustomerId = t.CustomerId

                }).Join(_db.Addresses,
                a => a.CustomerId,
                t => t.CustomerId,
                (a, t) => new
                {
                    AddressID = t.AddressId,
                    OrderStatusId = a.OrderStatusId,
                    SaleId = a.SaleId,
                    SaleOrderDescription = a.SaleOrderDescription,
                    SaleOrderDate = a.SaleOrderDate,
                    SaleOrderRecieveType = a.SaleOrderRecieveType,
                    SaleOrderAssign = a.SaleOrderAssign,
                    PaymentDate = a.PaymentDate,
                    OrderStatusDescription = a.OrderStatusDescription,
                    CustomerName = a.CustomerName,
                    CustomerSurname = a.CustomerSurname,
                    CustomerEmailAddress = a.CustomerEmailAddress,
                    AddressLine1 = t.AddressLine1,
                    AddressLine2 = t.AddressLine2,
                    AddressLine3 = t.AddressLine3,
                    AddressPostalCode = t.AddressPostalCode,
                    ProvinceID = t.ProvinceId

                }).Join(_db.Provinces,
                a => a.ProvinceID,
                t => t.ProvinceId,
                (a, t) => new
                {
                    AddressID = a.AddressID,
                    OrderStatusId = a.OrderStatusId,
                    SaleId = a.SaleId,
                    SaleOrderDescription = a.SaleOrderDescription,
                    SaleOrderDate = a.SaleOrderDate,
                    SaleOrderRecieveType = a.SaleOrderRecieveType,
                    SaleOrderAssign = a.SaleOrderAssign,
                    PaymentDate = a.PaymentDate,
                    OrderStatusDescription = a.OrderStatusDescription,
                    CustomerName = a.CustomerName,
                    CustomerSurname = a.CustomerSurname,
                    CustomerEmailAddress = a.CustomerEmailAddress,
                    AddressLine1 = a.AddressLine1,
                    AddressLine2 = a.AddressLine2,
                    AddressLine3 = a.AddressLine3,
                    AddressPostalCode = a.AddressPostalCode,
                    ProvinceID = a.ProvinceID,
                    ProvinceDescription = t.ProvinceDescription,

                }).Join(_db.Cities,
                a => a.ProvinceID,
                t => t.ProvinceId,
                (a, t) => new
                {
                    AddressID = a.AddressID,
                    OrderStatusId = a.OrderStatusId,
                    SaleId = a.SaleId,
                    SaleOrderDescription = a.SaleOrderDescription,
                    SaleOrderDate = a.SaleOrderDate,
                    SaleOrderRecieveType = a.SaleOrderRecieveType,
                    SaleOrderAssign = a.SaleOrderAssign,
                    PaymentDate = a.PaymentDate,
                    OrderStatusDescription = a.OrderStatusDescription,
                    CustomerName = a.CustomerName,
                    CustomerSurname = a.CustomerSurname,
                    CustomerEmailAddress = a.CustomerEmailAddress,
                    AddressLine1 = a.AddressLine1,
                    AddressLine2 = a.AddressLine2,
                    AddressLine3 = a.AddressLine3,
                    AddressPostalCode = a.AddressPostalCode,
                    ProvinceID = a.ProvinceID,
                    ProvinceDescription = a.ProvinceDescription,
                    CityID = t.CityId,
                    CityDescription = t.CityDescription

                });

            return Ok(ReadyForDeliveryOrder);
        }
    }

    } 