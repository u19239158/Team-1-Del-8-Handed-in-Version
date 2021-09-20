using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetPackingReportData")] //route
        [HttpGet]
        //get Sales with status "needs packing"
        public IActionResult Getpacking( )

        {


            var NeedsPackingSales = _db.Sales.Join(_db.OrderStatuses,
           a => a.OrderStatusId,
          t => t.OrderStatusId,
          (a, t) => new
          {
              OrderStatusId = a.OrderStatusId,
              SaleId = a.SaleId,
              SaleOrderDescription = a.SaleOrderDescription,

              SaleOrderDate = a.SaleOrderDate,
              SaleOrderRecieveType = a.SaleOrderRecieveType == true ? "Collection" : "Delivery",
              AssignedTo = a.SaleOrderAssign,
              PaymentDate = a.PaymentDate,
              OrderStatusDescription = t.OrderStatusDescription

          }).Where(oo => oo.OrderStatusDescription == "Needs Packing");

            return Ok(NeedsPackingSales);
        }
        //var NeedsPackingSales = _db.Sales.Include(od => od.OrderStatus).Where(od => od.OrderStatus.OrderStatusDescription == "Needs Packing").ToList();




    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetDeliveryReportData")] //route
        [HttpGet]
        //get Sales with status "needs packing"

        public IActionResult Get()

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


                })

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
                    CustomerCellphoneNumber = t.CustomerCellphoneNumber,
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
                    CustomerCellphoneNumber = a.CustomerCellphoneNumber,
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
                    CustomerCellphoneNumber = a.CustomerCellphoneNumber,
                    AddressLine1 = a.AddressLine1,
                    AddressLine2 = a.AddressLine2,
                    AddressLine3 = a.AddressLine3,
                    AddressPostalCode = a.AddressPostalCode,
                    ProvinceID = a.ProvinceID,
                    ProvinceDescription = t.ProvinceDescription,

                }).Where(oo => oo.OrderStatusId == 3);
                //.Join(_db.Cities,
                //a => a.,
                //t => t.ProvinceId,
                //(a, t) => new
                //{
                //    AddressID = a.AddressID,
                //    OrderStatusId = a.OrderStatusId,
                //    SaleId = a.SaleId,
                //    SaleOrderDescription = a.SaleOrderDescription,
                //    SaleOrderDate = a.SaleOrderDate,
                //    SaleOrderRecieveType = a.SaleOrderRecieveType,
                //    SaleOrderAssign = a.SaleOrderAssign,
                //    PaymentDate = a.PaymentDate,
                //    OrderStatusDescription = a.OrderStatusDescription,
                //    CustomerName = a.CustomerName,
                //    CustomerSurname = a.CustomerSurname,
                //    CustomerEmailAddress = a.CustomerEmailAddress,
                //    CustomerCellphoneNumber = a.CustomerCellphoneNumber,
                //    AddressLine1 = a.AddressLine1,
                //    AddressLine2 = a.AddressLine2,
                //    AddressLine3 = a.AddressLine3,
                //    AddressPostalCode = a.AddressPostalCode,
                //    ProvinceID = a.ProvinceID,
                //    ProvinceDescription = a.ProvinceDescription,
                //    CityID = t.CityId,
                //    CityDescription = t.CityDescription

                //});

            return Ok(ReadyForDeliveryOrder);
        }


    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GenerateSalesReportSum")] //route
        [HttpPost]
        //get Sales by Date (Read)
        public IActionResult getSalesReportSum(ReportModel model)
        {
            decimal Total  = 0;
            var Sales = _db.Sales.Join(_db.Customers,
                 su => su.CustomerId,
                 so => so.CustomerId,

                 (su, so) => new
                 {
                     SaleID = su.SaleId,
                     SaleDescription = su.SaleOrderDescription, //attributes in table
                     SaleOrderDate = su.SaleOrderDate,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     CustomerId = so.CustomerId,
                     CustomerName = so.CustomerName,
                     CustomerCellphoneNumber = so.CustomerCellphoneNumber,
                     CustomerBusinessName = so.CustomerBusinessName,
                     CustomerEmailAddress = so.CustomerEmailAddress,
                     StartDate = model.StartDate,
                     EndDate = model.EndDate,
                    
                 }).Where(ss => ss.SaleOrderDate > model.StartDate && ss.SaleOrderDate < model.EndDate).Sum(zz => zz.SalePaymentAmount);
            Total = Sales;
            return Ok(Total);

        }

        [Route("GenerateSalesReportAvg")] //route
        [HttpPost]
        //get Sales by Date (Read)
        public IActionResult getSalesReportAvg(ReportModel model)
        {
            decimal Total = 0;
            var Sales = _db.Sales.Join(_db.Customers,
                 su => su.CustomerId,
                 so => so.CustomerId,

                 (su, so) => new
                 {
                     SaleID = su.SaleId,
                     SaleDescription = su.SaleOrderDescription, //attributes in table
                     SaleOrderDate = su.SaleOrderDate,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     CustomerId = so.CustomerId,
                     CustomerName = so.CustomerName,
                     CustomerCellphoneNumber = so.CustomerCellphoneNumber,
                     CustomerBusinessName = so.CustomerBusinessName,
                     CustomerEmailAddress = so.CustomerEmailAddress,
                     StartDate = model.StartDate,
                     EndDate = model.EndDate,

                 }).Where(ss => ss.SaleOrderDate > model.StartDate && ss.SaleOrderDate < model.EndDate).Average(zz => zz.SalePaymentAmount);
            Total = Sales;
            return Ok(Total);

        }


        //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GenerateSalesReport")] //route
        [HttpPost]
        public IActionResult getSalesReport([FromBody]ReportModel model)
        {
            var Sales = _db.Sales.Join(_db.Customers,
                 su => su.CustomerId,
                 so => so.CustomerId,

                 (su, so) => new
                 {
                     SaleID = su.SaleId,
                     SaleDescription = su.SaleOrderDescription, //attributes in table
                     SaleOrderDate = su.SaleOrderDate,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     CustomerId = so.CustomerId,
                     CustomerName = so.CustomerName,
                     CustomerSurname = so.CustomerSurname,
                     CustomerCellphoneNumber = so.CustomerCellphoneNumber,
                     CustomerBusinessName = so.CustomerBusinessName,
                     CustomerEmailAddress = so.CustomerEmailAddress,
                     StartDate = model.StartDate,
                     EndDate = model.EndDate,


                 }).Where(ss => ss.SaleOrderDate > model.StartDate && ss.SaleOrderDate < model.EndDate);

            return Ok(Sales);

        }


    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GenerateStockLevel")] //route
        [HttpGet]
        //get Sales by Date (Read)
        public IActionResult getStock()
        {
            var Stocklevel = _db.ProductItems.Join(_db.CategoryTypes,
                 su => su.CategoryTypeId,
                 so => so.CategoryTypeId,

                 (su, so) => new
                 {
                     ProductItemId = su.ProductItemId,
                     ProductItemName = su.ProductItemName, //attributes in table
                     QuantityOnHand = su.QuantityOnHand,
                     CategoryTypeId = su.CategoryTypeId,
                     CategoryTypeDescription = so.CategoryTypeDescription,
                     ProductCategoryId = so.ProductCategoryId


                 }).Join(_db.ProductCategories,
                 su => su.ProductCategoryId,
                 so => so.ProductCategoryId,
                  (su, so) => new
                  {
                      ProductItemId = su.ProductItemId,
                      ProductItemName = su.ProductItemName, //attributes in table
                      QuantityOnHand = su.QuantityOnHand,
                      CategoryTypeId = su.CategoryTypeId,
                      CategoryTypeDescription = su.CategoryTypeDescription,
                      ProductCategoryId = so.ProductCategoryId,
                      ProductCategoryDescription = so.ProductCategoryDescription
                  });

            return Ok(Stocklevel);

        }


    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GenerateFrequentBuyerReport")] //route
        [HttpPost]
        //get Frequent Buyers (Read)
        public IActionResult getFrequentBuyers(ReportModel model)
        {
            var Sales = _db.Sales.Join(_db.Customers,
                 su => su.CustomerId,
                 so => so.CustomerId,

                 (su, so) => new
                 {
                     SaleID = su.SaleId,
                     SaleDescription = su.SaleOrderDescription, //attributes in table
                     SaleOrderDate = su.SaleOrderDate,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     CustomerId = so.CustomerId,
                     CustomerName = so.CustomerName,
                     CustomerCellphoneNumber = so.CustomerCellphoneNumber,
                     CustomerBusinessName = so.CustomerBusinessName,
                     CustomerEmailAddress = so.CustomerEmailAddress,
                     StartDate = model.StartDate,
                     EndDate = model.EndDate,
                     


                 }).Where(ss => ss.SaleOrderDate > model.StartDate && ss.SaleOrderDate < model.EndDate).OrderBy(zz=> zz.SaleID);

           // return getFrequenBuyersList (Sales)
            return Ok(Sales);
        }


    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GenerateFrequentBuyerReportCount")] //route
        [HttpPost]
        //get Frequent Buyers (Read)
        public IActionResult getFrequentBuyersCount(ReportModel model)
        {

            var Sales = _db.Sales.Join(_db.Customers,
                 su => su.CustomerId,
                 so => so.CustomerId,

                 (su, so) => new
                 {
                     SaleID = su.SaleId,
                     SaleDescription = su.SaleOrderDescription, //attributes in table
                     SaleOrderDate = su.SaleOrderDate,
                     SalePaymentDate = su.PaymentDate,
                     SalePaymentAmount = su.PaymentAmount,
                     CustomerId = so.CustomerId,
                     CustomerName = so.CustomerName,
                     CustomerCellphoneNumber = so.CustomerCellphoneNumber,
                     CustomerBusinessName = so.CustomerBusinessName,
                     CustomerEmailAddress = so.CustomerEmailAddress,
                     StartDate = model.StartDate,
                     EndDate = model.EndDate,


                 }).Where(ss => ss.SaleOrderDate > model.StartDate && ss.SaleOrderDate < model.EndDate).Count();

            // return getFrequenBuyersList (Sales)
            return Ok(Sales);


        }


        //public IActionResult getFrequenBuyersList(Sales)

        //{
        //    var Fsales = Sales.GroupBy(zz => zz.Sales.SaleId);
        //    foreach (var Sale in Fsales)
        //    {
        //        dynamic var = new ExpandoObject();
        //        var.SaleId = Sale.Key;
        //        var.FrequentBuyers = Math.Round((double)Sale.Count(ss => ss.SaleId));
        //    }

        //    return Ok(Fsales);
        //}



    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetFastSellingProductsCount")] //route
        [HttpPost]
        //get Fast Selling Products (Read)
        public IActionResult getFastSellingProductsCount(ReportModel model, int ProductItemId)
        {

            var FastSellingP = _db.ProductItems.Join(_db.SaleLines,
                 su => su.ProductItemId,
                 so => so.ProductItemId,

                 (su, so) => new
                 {
                     ProductItemId = su.ProductItemId,
                     SaleLineId = so.SaleLineId,
                     SaleLineQuantity = so.SaleLineQuantity,
                     SaleId = so.SaleId,
                     ProductItemName = su.ProductItemName,

                 }).Join(_db.Sales,
                 su => su.SaleId,
                 so => so.SaleId,

                 (su, so) => new
                 {
                     SaleOrderDate = so.SaleOrderDate,
                     ProductItemId = su.ProductItemId,
                     SaleLineId = su.SaleLineId,
                     SaleLineQuantity = su.SaleLineQuantity,
                     SaleId = so.SaleId,
                     ProductItemName = su.ProductItemName,

                 }).Where(ss => ss.SaleOrderDate > model.StartDate && ss.SaleOrderDate < model.EndDate);
            var total = _db.SaleLines.Where(qq =>qq.ProductItemId == model.ProductItemId).Select(i => i.SaleLineQuantity).Sum(); ;
           // var sum  = FastSellingP.SumAsync(zz => zz.SaleLineQuantity);
            return Ok(total);

        }


    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetFastSellingProducts")] //route
        [HttpPost]
        //get Fast Selling Products (Read)
        public IActionResult getFastSellingProducts(ReportModel model)
        {

            var FastSellingP = _db.ProductItems.Join(_db.SaleLines,
                 su => su.ProductItemId,
                 so => so.ProductItemId,

                 (su, so) => new
                 {
                     ProductItemId = su.ProductItemId,
                     SaleLineId = so.SaleLineId,
                     SaleLineQuantity = so.SaleLineQuantity,
                     SaleId = so.SaleId,
                     ProductItemName = su.ProductItemName,

                 }).Join(_db.Sales,
                 su => su.SaleId,
                 so => so.SaleId,

                 (su, so) => new
                 {
                     SaleOrderDate = so.SaleOrderDate,
                     ProductItemId = su.ProductItemId,
                     SaleLineId = su.SaleLineId,
                     SaleLineQuantity = su.SaleLineQuantity,
                     SaleId = so.SaleId,
                     ProductItemName = su.ProductItemName,

                 }).Where(ss => ss.SaleOrderDate > model.StartDate && ss.SaleOrderDate < model.EndDate);

            return Ok(FastSellingP);

        }


    //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSlowSellingProducts")] //route
        [HttpPost]
        //get Slow Selling Products (Read)
        public IActionResult getSlowSellingProducts(ReportModel model)
        {

            var SlowSellingP = _db.ProductItems.Join(_db.SaleLines,
                 su => su.ProductItemId,
                 so => so.ProductItemId,

                 (su, so) => new
                 {
                     ProductItemId = su.ProductItemId,
                     SaleLineId = so.SaleLineId,
                     SaleLineQuantity = so.SaleLineQuantity,
                     SaleId = so.SaleId,
                     ProductItemName = su.ProductItemName,

                 }).Join(_db.Sales,
                 su => su.SaleId,
                 so => so.SaleId,

                 (su, so) => new
                 {
                     ProductItemId = su.ProductItemId,
                     SaleLineId = su.SaleLineId,
                     SaleLineQuantity = su.SaleLineQuantity,
                     SaleId = so.SaleId,
                     ProductItemName = su.ProductItemName,

                 });

            return Ok(SlowSellingP);

        }


     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("MostPopularLocation")] //route
        [HttpPost]
        //get Slow Selling Products (Read)
        public IActionResult getMostPopularLocation( )
        {

            var PopularLocation = _db.Sales.Join(_db.Customers,
                a => a.CustomerId,
                t => t.CustomerId,
                (a, t) => new
                {
                    
                    SaleId = a.SaleId,
                    CustomerId = t.CustomerId

                }).Join(_db.Addresses,
                a => a.CustomerId,
                t => t.CustomerId,
                (a, t) => new
                {
                    SaleId = a.SaleId,
                    AddressID = t.AddressId,
                    ProvinceID = t.ProvinceId

                }).Join(_db.Provinces,
                a => a.ProvinceID,
                t => t.ProvinceId,
                (a, t) => new
                {
                    SaleId = a.SaleId,
                    ProvinceID = a.ProvinceID,
                    ProvinceDescription = t.ProvinceDescription,

                }).Join(_db.Cities,
                a => a.ProvinceID,
                t => t.ProvinceId,
                (a, t) => new
                {
                    SaleId = a.SaleId,
                    ProvinceID = a.ProvinceID,
                    ProvinceDescription = a.ProvinceDescription,
                    CityID = t.CityId,
                    CityDescription = t.CityDescription

                });
            
            return Ok(PopularLocation);

        }
    }

} 

