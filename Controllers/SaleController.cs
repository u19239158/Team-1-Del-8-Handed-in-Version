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
    public class SaleController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public SaleController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetSales")] //route
        [HttpGet]
        //get Sales (Read)
        public IActionResult get()
        {
            // var sale = _db.Sales.ToList();
            var Sales = _db.Sales.Join(_db.OrderStatuses,
                 su => su.OrderStatusId,
                 so => so.OrderStatusId,

                 (su, so) => new
                 {
                     SaleID = su.SaleId,
                     SaleDescription = su.SaleOrderDescription,
                     SaleDate = su.SaleOrderDate,
                     SaleAssign = su.SaleOrderAssign,
                     SaleReceiveType = su.SaleOrderRecieveType,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     OrderStatusID = so.OrderStatusId,
                     OrderStatusDesc = so.OrderStatusDescription,
                     PaymentTypeID = su.PaymentTypeId
      
                    //attributes in table
                }).Join(_db.PaymentTypes,
                 sor => sor.PaymentTypeID,
                 sd => sd.PaymentTypeId,
                 (sor, sd) => new
                 {
                     SaleID = sor.SaleID,
                     SaleDescription = sor.SaleDescription,
                     SaleDate = sor.SaleDate,
                     SaleAssign = sor.SaleAssign,
                     SaleReceiveType = sor.SaleReceiveType,
                     SalePaymentDate = sor.SalePaymentDate,
                     SalePaymentAmount = sor.SalePaymentAmount,
                     OrderStatusID = sor.OrderStatusID,
                     OrderStatusDesc = sor.OrderStatusDesc,
                     PaymentTypeID = sor.PaymentTypeID,
                     PaymentTypeDescription = sd.PaymentTypeDescription

                 });

            return Ok(Sales);

        }

        [Route("GetSaleByID/{saleid}")] //route
        [HttpGet]
        //get Sales by ID (Read)
        public IActionResult get(int saleid)
        {
            var Sale = _db.Sales.Join(_db.OrderStatuses,
                su => su.OrderStatusId,
                so => so.OrderStatusId,

                (su, so) => new
                {
                    SaleID = su.SaleId,
                    SaleDescription = su.SaleOrderDescription,
                    SaleDate = su.SaleOrderDate,
                    SaleAssign = su.SaleOrderAssign,
                    SaleReceiveType = su.SaleOrderRecieveType,
                    SalePaymentDate = su.PaymentDate,
                    SalePaymentAmount = su.PaymentAmount,
                    OrderStatusID = so.OrderStatusId,
                    OrderStatusDesc = so.OrderStatusDescription,
                    PaymentTypeID = su.PaymentTypeId

                     //attributes in table
                 }).Join(_db.PaymentTypes,
                sor => sor.PaymentTypeID,
                sd => sd.PaymentTypeId,
                (sor, sd) => new
                {
                    SaleID = sor.SaleID,
                    SaleDescription = sor.SaleDescription,
                    SaleDate = sor.SaleDate,
                    SaleAssign = sor.SaleAssign,
                    SaleReceiveType = sor.SaleReceiveType,
                    SalePaymentDate = sor.SalePaymentDate,
                    SalePaymentAmount = sor.SalePaymentAmount,
                    OrderStatusID = sor.OrderStatusID,
                    OrderStatusDesc = sor.OrderStatusDesc,
                    PaymentTypeID = sor.PaymentTypeID,
                    PaymentTypeDescription = sd.PaymentTypeDescription

                }).First(ss => ss.SaleID == saleid);

            return Ok(Sale);
        }

        [Route("GetSalesByDate/{SaleOrderdate}")] //route
        [HttpGet]
        //get Sales by Date (Read)
        public IActionResult get(DateTime SaleOrderdate)
        {
            var Sale = _db.Sales.Join(_db.OrderStatuses,
                 su => su.OrderStatusId,
                 so => so.OrderStatusId,

                 (su, so) => new
                 {
                     SaleID = su.SaleId,
                     SaleDescription = su.SaleOrderDescription,
                     SaleDate = su.SaleOrderDate,
                     SaleAssign = su.SaleOrderAssign,
                     SaleReceiveType = su.SaleOrderRecieveType,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     OrderStatusID = so.OrderStatusId,
                     OrderStatusDesc = so.OrderStatusDescription,
                     PaymentTypeID = su.PaymentTypeId

                    //attributes in table
                }).Join(_db.PaymentTypes,
                 sor => sor.PaymentTypeID,
                 sd => sd.PaymentTypeId,
                 (sor, sd) => new
                 {
                     SaleID = sor.SaleID,
                     SaleDescription = sor.SaleDescription,
                     SaleDate = sor.SaleDate,
                     SaleAssign = sor.SaleAssign,
                     SaleReceiveType = sor.SaleReceiveType,
                     SalePaymentDate = sor.SalePaymentDate,
                     SalePaymentAmount = sor.SalePaymentAmount,
                     OrderStatusID = sor.OrderStatusID,
                     OrderStatusDesc = sor.OrderStatusDesc,
                     PaymentTypeID = sor.PaymentTypeID,
                     PaymentTypeDescription = sd.PaymentTypeDescription

                 }).Where(ss => ss.SaleDate == SaleOrderdate);

            return Ok(Sale);
            
        }

        [Route("GetSalesReceiveType/{SaleOrderRecievetype}")] //route
        [HttpGet]
        //get Sales by ReceiveType (Read)
        public IActionResult get(bool SaleOrderRecievetype)
        {
            var Sale = _db.Sales.Join(_db.OrderStatuses,
                 su => su.OrderStatusId,
                 so => so.OrderStatusId,

                 (su, so) => new
                 {
                     SaleID = su.SaleId,
                     SaleDescription = su.SaleOrderDescription,
                     SaleDate = su.SaleOrderDate,
                     SaleAssign = su.SaleOrderAssign,
                     SaleReceiveType = su.SaleOrderRecieveType,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     OrderStatusID = so.OrderStatusId,
                     OrderStatusDesc = so.OrderStatusDescription,
                     PaymentTypeID = su.PaymentTypeId

                     //attributes in table
                 }).Join(_db.PaymentTypes,
                 sor => sor.PaymentTypeID,
                 sd => sd.PaymentTypeId,
                 (sor, sd) => new
                 {
                     SaleID = sor.SaleID,
                     SaleDescription = sor.SaleDescription,
                     SaleDate = sor.SaleDate,
                     SaleAssign = sor.SaleAssign,
                     SaleReceiveType = sor.SaleReceiveType,
                     SalePaymentDate = sor.SalePaymentDate,
                     SalePaymentAmount = sor.SalePaymentAmount,
                     OrderStatusID = sor.OrderStatusID,
                     OrderStatusDesc = sor.OrderStatusDesc,
                     PaymentTypeID = sor.PaymentTypeID,
                     PaymentTypeDescription = sd.PaymentTypeDescription

                 }).Where(ss => ss.SaleReceiveType == SaleOrderRecievetype);

            return Ok(Sale);
        }

        [Route("GetSalesByOrderStatus/{orderstatusdescription}")] //route
        [HttpGet]
        //get Sales by Date (Read)
        public IActionResult get(string orderstatusdescription)
        {
            var Sale = _db.Sales.Join(_db.OrderStatuses,
                 su => su.OrderStatusId,
                 so => so.OrderStatusId,

                 (su, so) => new
                 {
                     SaleID = su.SaleId,
                     SaleDescription = su.SaleOrderDescription,
                     SaleDate = su.SaleOrderDate,
                     SaleAssign = su.SaleOrderAssign,
                     SaleReceiveType = su.SaleOrderRecieveType,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     OrderStatusID = so.OrderStatusId,
                     OrderStatusDesc = so.OrderStatusDescription,
                     PaymentTypeID = su.PaymentTypeId

                     //attributes in table
                 }).Join(_db.PaymentTypes,
                 sor => sor.PaymentTypeID,
                 sd => sd.PaymentTypeId,
                 (sor, sd) => new
                 {
                     SaleID = sor.SaleID,
                     SaleDescription = sor.SaleDescription,
                     SaleDate = sor.SaleDate,
                     SaleAssign = sor.SaleAssign,
                     SaleReceiveType = sor.SaleReceiveType,
                     SalePaymentDate = sor.SalePaymentDate,
                     SalePaymentAmount = sor.SalePaymentAmount,
                     OrderStatusID = sor.OrderStatusID,
                     OrderStatusDesc = sor.OrderStatusDesc,
                     PaymentTypeID = sor.PaymentTypeID,
                     PaymentTypeDescription = sd.PaymentTypeDescription

                 }).Where(ss => ss.OrderStatusDesc == orderstatusdescription);

            return Ok(Sale);

        }

        [Route("CreateSales")] //route
        [HttpPost]
        //Add Sales
        //Create a Model for table
        public IActionResult CreateSale(SaleModel model) //reference the model
        {
            Sale sale = new Sale();
            sale.SaleOrderDescription = model.SaleOrderDescription; //attributes in table
            sale.SaleOrderDate = model.SaleOrderDate;
            sale.SaleOrderAssign = model.SaleOrderAssign;
            sale.SaleOrderRecieveType = model.SaleOrderRecieveType;
            sale.PaymentAmount = model.PaymentAmount;
            sale.PaymentDate = model.PaymentDate;
            sale.OrderStatusId = model.OrderStatusId;
            sale.PaymentTypeId = model.PaymentTypeId;

            _db.Sales.Add(sale);
            _db.SaveChanges();

            return Ok(sale);
        }

    }
}