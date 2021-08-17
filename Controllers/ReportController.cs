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

    //    [Route("GetDeliveryReportData")] //route
    //    [HttpGet]
    //    //get Sales with status "needs packing"
    //    public IActionResult Get(ReportModel model)
    //    {
    //        //var NeedsPackingSales = _db.Sales.Include(od => od.OrderStatus).Where(od => od.OrderStatus.OrderStatusDescription == "Needs Packing").ToList();
    //        var ReadyForDeliveryOrder = _db.Sales.Join(_db.OrderStatuses,
    //             a => a.OrderStatusId,
    //            t => t.OrderStatusId,
    //            (a, t) => new
    //            {
    //                OrderStatusId = a.OrderStatusId,
    //                SaleId = a.SaleId,
    //                SaleOrderDescription = a.SaleOrderDescription,
    //                SaleOrderDate = a.SaleOrderDate,
    //                SaleOrderRecieveType = a.SaleOrderRecieveType,
    //                AssignedTo = a.SaleOrderAssign,
    //                PaymentDate = a.PaymentDate,
    //                OrderStatusDescription = t.OrderStatusDescription

    //            }).Where(oo => oo.OrderStatusDescription == "Needs Packing")

    //    //        .Join(_db.Customers,
    //    //        a => a.OrderStatusId,
    //    //        t => t.OrderStatusId,
    //    //        (a, t) => new
    //    //        {
    //    //            OrderStatusId = a.OrderStatusId,
    //    //            SaleId = a.SaleId,
    //    //            SaleOrderDescription = a.SaleOrderDescription,
    //    //            SaleOrderDate = a.SaleOrderDate,
    //    //            SaleOrderRecieveType = a.SaleOrderRecieveType,
    //    //            AssignedTo = a.SaleOrderAssign,
    //    //            PaymentDate = a.PaymentDate,
    //    //            OrderStatusDescription = t.OrderStatusDescription

    //        //        });

    //        //    return Ok(ReadyForDeliveryOrder);
    //        //}
    //    }
   
    } }