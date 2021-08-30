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

        [Route("SearchSales/{OrderStatusId}")] //route
        [HttpGet]
        //get Sales by Date (Read)
        public IActionResult get(SaleModel model, int OrderStatusId)
        {
            var Sale = _db.Sales.Join(_db.OrderStatuses,
                 su => su.OrderStatusId,
                 so => so.OrderStatusId,

                 (su, so) => new
                 {
                     SaleID = su.SaleId,
                     SaleDescription = su.SaleOrderDescription, //attributes in table
                     SaleOrderDate = su.SaleOrderDate,
                     SaleAssign = su.SaleOrderAssign,
                     SaleReceiveType = su.SaleOrderRecieveType,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     OrderStatusID = so.OrderStatusId,
                     OrderStatusDesc = so.OrderStatusDescription,
                     PaymentTypeID = su.PaymentTypeId,
                     StartDate = model.StartDate,
                     EndDate = model.EndDate


                 }).Join(_db.PaymentTypes,
                 sor => sor.PaymentTypeID,
                 sd => sd.PaymentTypeId,
                 (sor, sd) => new
                 {
                     SaleID = sor.SaleID,
                     SaleDescription = sor.SaleDescription,
                     SaleOrderDate = sor.SaleOrderDate,
                     SaleAssign = sor.SaleAssign,
                     SaleReceiveType = sor.SaleReceiveType,
                     SalePaymentDate = sor.SalePaymentDate,
                     SalePaymentAmount = sor.SalePaymentAmount,
                     OrderStatusID = sor.OrderStatusID,
                     OrderStatusDesc = sor.OrderStatusDesc,
                     PaymentTypeID = sor.PaymentTypeID,
                     PaymentTypeDescription = sd.PaymentTypeDescription,
                     StartDate = model.StartDate,
                     EndDate = model.EndDate
                     
                 }).Where(ss => ss.SaleOrderDate > model.StartDate && ss.SaleOrderDate < model.EndDate).Where(ss => ss.OrderStatusID == OrderStatusId);

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
                     SaleDescription = su.SaleOrderDescription, //attributes in table
                     SaleDate = su.SaleOrderDate,
                     SaleAssign = su.SaleOrderAssign,
                     SaleReceiveType = su.SaleOrderRecieveType,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     OrderStatusID = so.OrderStatusId,
                     OrderStatusDesc = so.OrderStatusDescription,
                     PaymentTypeID = su.PaymentTypeId

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

        [Route("ViewSale/{saleid}")] //route
        [HttpGet]
        //get Sales by ID (Read)
        public IActionResult Get(int saleid)
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
                    PaymentTypeID = su.PaymentTypeId,
                    CustomerID = su.CustomerId

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
                    PaymentTypeDescription = sd.PaymentTypeDescription,
                    CustomerID = sor.CustomerID


                }).Join(_db.Customers,
                sor => sor.CustomerID,
                sd => sd.CustomerId,
                (sor, sd) => new
                {
                    CustomerID = sor.CustomerID,
                    SaleDescription = sor.SaleDescription,
                    SaleDate = sor.SaleDate,
                    SaleAssign = sor.SaleAssign,
                    SaleReceiveType = sor.SaleReceiveType,
                    SalePaymentDate = sor.SalePaymentDate,
                    SalePaymentAmount = sor.SalePaymentAmount,
                    OrderStatusID = sor.OrderStatusID,
                    OrderStatusDesc = sor.OrderStatusDesc,
                    PaymentTypeID = sor.PaymentTypeID,
                    PaymentTypeDescription = sor.PaymentTypeDescription,
                    CustomerName = sd.CustomerName,
                    CustomerSurname = sd.CustomerSurname,
                    CustomerBusinessName = sd.CustomerBusinessName,
                    SaleID = sor.SaleID

                }).First(ss => ss.SaleID == saleid);

            return Ok(Sale);
        }

        [Route("PackOrder")] //route
        [HttpPut]
        //Update Order Status
        public IActionResult PackOrder(SaleModel model, int OrderStatusId)
        {
            var PackOrder = _db.Sales.Find(model.SaleID);
            PackOrder.OrderStatusId = model.OrderStatusId;
            _db.Sales.Attach(PackOrder); //Attach Record
            _db.SaveChanges();

            return Ok(PackOrder);
        }

        [Route("ViewAllSales")] //route
        [HttpGet]
        //get Sales by ID (Read)
        public IActionResult ViewAllSales()
        {
            var Sale = _db.Sales.Join(_db.OrderStatuses,
                su => su.OrderStatusId,
                so => so.OrderStatusId,

                (su, so) => new
                {
                    SaleID = su.SaleId,
                    // SaleDescription = su.SaleOrderDescription,
                    SaleOrderDate = su.SaleOrderDate,
                    //SaleAssign = su.SaleOrderAssign,
                    //SaleReceiveType = su.SaleOrderRecieveType,
                    //SalePaymentDate = su.PaymentDate,
                    //SalePaymentAmount = su.PaymentAmount,
                    OrderStatusID = so.OrderStatusId,
                    OrderStatusDescription = so.OrderStatusDescription,
                    //PaymentTypeID = su.PaymentTypeId,
                    CustomerId = su.CustomerId

                    //attributes in table
                }).Join(_db.Customers,
                sor => sor.CustomerId,
                sd => sd.CustomerId,
                (sor, sd) => new
                {
                    CustomerId = sor.CustomerId,
                    //SaleDescription = sor.SaleDescription,
                    SaleOrderDate = sor.SaleOrderDate,
                    //SaleAssign = sor.SaleAssign,
                   // SaleReceiveType = sor.SaleReceiveType,
                   // SalePaymentDate = sor.SalePaymentDate,
                    //SalePaymentAmount = sor.SalePaymentAmount,
                    OrderStatusID = sor.OrderStatusID,
                    OrderStatusDescription = sor.OrderStatusDescription,
                    //PaymentTypeID = sor.PaymentTypeID,
                    //PaymentTypeDescription = sor.PaymentTypeDescription,
                    CustomerName = sd.CustomerName,
                    CustomerSurname = sd.CustomerSurname,
                    CustomerBusinessName = sd.CustomerBusinessName,
                    SaleID = sor.SaleID

                });

            return Ok(Sale);
        }


        [Route("UpdateOrder")] //route
        [HttpPut]
        //Update Order Status
        public IActionResult UpdateOrder(SaleModel model, int OrderStatusId)
        {
            var orderstatus = _db.Sales.Find(model.SaleID);
            orderstatus.OrderStatusId = model.OrderStatusId;
            _db.Sales.Attach(orderstatus); //Attach Record
            _db.SaveChanges();

            return Ok(orderstatus);
        }

        [Route("GetComplexSaleByID/{saleid}")] //route
        [HttpGet]
        //get Sales by ID (Read)
        public IActionResult GetComplexSale(int saleid)
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
                    PaymentTypeID = su.PaymentTypeId,
                    CustomerId = su.CustomerId


                    //attributes in table
                }).Join(_db.Customers,
                sor => sor.CustomerId,
                sd => sd.CustomerId,
                (sor, sd) => new
                {
                    CustomerId = sor.CustomerId,
                    CustomerName = sd.CustomerName,
                    CustomerSurname = sd.CustomerSurname,
                    CustomerBusinessName = sd.CustomerBusinessName,
                    CustomerCellphoneNumber = sd.CustomerCellphoneNumber,
                    
                    CustomerEmailAddress = sd.CustomerEmailAddress,
                    SaleID = sor.SaleID

                }).Join(_db.Addresses,
                sor => sor.CustomerId,
                sd => sd.CustomerId,
                (sor, sd) => new
                {
                    SaleID = sor.SaleID,
                    CustomerId = sor.CustomerId,
                    CustomerName = sor.CustomerName,
                    CustomerSurname = sor.CustomerSurname,
                    CustomerBusinessName = sor.CustomerBusinessName,
                    CustomerCellphoneNumber = sor.CustomerCellphoneNumber,
                    CustomerEmailAddress = sor.CustomerEmailAddress,
                    AddressLine1 = sd.AddressLine1,
                    AddressLine2 = sd.AddressLine2,
                    AddressLine3 = sd.AddressLine3,
                    AddressPostalCode = sd.AddressPostalCode

                }).First(ss => ss.SaleID == saleid);

            return Ok(Sale);
        }

    }
}