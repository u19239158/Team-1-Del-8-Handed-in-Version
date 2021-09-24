using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using NKAP_API_2.EF;
using NKAP_API_2.Models;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckoutController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public CheckoutController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Customer")]
        [Route("Checkout")] //route
        [HttpPost]
        //Add Sales
        //Create a Model for table
        public IActionResult Checkout(SaleModel model) //reference the model
        {
            Sale sale = new Sale();
            sale.SaleOrderDescription = ""; //attributes in table
            sale.SaleOrderDate = System.DateTime.Now;
            sale.SaleOrderRecieveType = model.SaleOrderRecieveType;
            sale.PaymentAmount = model.PaymentAmount;
            sale.PaymentDate = System.DateTime.Now;
            sale.OrderStatusId = 1;
            sale.PaymentTypeId = 1;
            sale.CustomerId = model.CustomerID;
            _db.Sales.Add(sale);
            _db.SaveChanges();

            Delivery Del = new Delivery();
            Del.AddressId = model.AddressId;
            Del.SaleId = sale.SaleId;
            Del.DeliveryDistance = model.DeliveryDistance;
            _db.Deliveries.Add(Del);
            _db.SaveChanges();

            //var user = _db.Users.Find(model.UsersID);
            //AuditTrail audit = new AuditTrail();
            //audit.AuditTrailDescription = user.UserUsername + " made a sale worth: " + 'R'+ model.PaymentAmount ;
            //audit.AuditTrailDate = System.DateTime.Now;
            //TimeSpan timeNow = DateTime.Now.TimeOfDay;
            //audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            //audit.UsersId = user.UsersId;
            //_db.AuditTrails.Add(audit);
            //_db.SaveChanges();

            return Ok();
        }

        //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Customer")]
        [Route("AddSaleLine")] //route
        [HttpPost]
        //Add Sales
        //Create a Model for table
        public IActionResult AddSaleLine(SaleModel model) //reference the model
        {

            SaleLine Sline = new SaleLine();
            Sline.ProductItemId = model.ProductItemId;
            Sline.SaleLineQuantity = model.SaleLineQuantity;
            Sline.SaleId = model.SaleID;
            _db.SaleLines.Add(Sline);
            _db.SaveChanges();

            var sd = _db.Sales.Find(model.SaleID);
            sd.SaleOrderDescription += model.SaleLineQuantity + "x " + model.ProductItemName + ",";
            _db.Sales.Attach(sd); //Attach Record
            _db.SaveChanges();

            return Ok();
        }


        [Route("getProducts")] //route
        [HttpGet]
        //get Sales by Date (Read)
        public IActionResult getProducts()
        {
            var markup = _db.Markups.FirstOrDefault(zz => zz.MarkupId == 3);
            var VAT = _db.Vats.FirstOrDefault(zz => zz.VatId == 2);
            var Stocklevel = _db.ProductItems.Join(_db.CategoryTypes,
                 su => su.CategoryTypeId,
                 so => so.CategoryTypeId,

                 (su, so) => new
                 {
                     ProductItemId = su.ProductItemId,
                     ProductItemName = su.ProductItemName, //attributes in table
                     ProductItemCost = su.ProductItemCost,
                     CategoryTypeId = su.CategoryTypeId,
                     CategoryTypeDescription = so.CategoryTypeDescription,
                     ItemDescription = so.ItemDescription,
                     CategoryTypeImage = so.CategoryTypeImage,
                     ProductCategoryId = so.ProductCategoryId


                 }).Join(_db.ProductCategories,
                 su => su.ProductCategoryId,
                 so => so.ProductCategoryId,
                  (su, so) => new
                  {
                      ProductItemId = su.ProductItemId,
                      ProductItemCost = su.ProductItemCost,
                      sellingPrice = su.ProductItemCost + (su.ProductItemCost * markup.MarkupPercentage), //VAT Exclusive
                                                                                                          // VATInclusive = (su.ProductItemCost + (su.ProductItemCost * markup.MarkupPercentage))  
                      ProductItemName = su.ProductItemName, //attributes in table
                      CategoryTypeImage = su.CategoryTypeImage,
                      CategoryTypeId = su.CategoryTypeId,
                      CategoryTypeDescription = su.CategoryTypeDescription,
                      ItemDescription = su.ItemDescription,
                      ProductCategoryId = so.ProductCategoryId,
                      ProductCategoryDescription = so.ProductCategoryDescription
                  }).Join(_db.ProductCategories,
                 su => su.ProductCategoryId,
                 so => so.ProductCategoryId,
                  (su, so) => new
                  {
                      ProductItemId = su.ProductItemId,
                      ProductItemCost = su.ProductItemCost,
                      sellingPrice = su.sellingPrice, //VAT Exclusive
                      VATInclusive = su.sellingPrice + (su.sellingPrice * VAT.VatPercentage), //VAT Inclusive
                      VATAmount = su.sellingPrice + (su.sellingPrice * VAT.VatPercentage) - su.sellingPrice, //VAT Amount
                      ProductItemName = su.ProductItemName,
                      CategoryTypeImage = su.CategoryTypeImage,
                      CategoryTypeId = su.CategoryTypeId,
                      CategoryTypeDescription = su.CategoryTypeDescription,
                      ItemDescription = su.ItemDescription,
                      ProductCategoryId = so.ProductCategoryId,
                      ProductCategoryDescription = so.ProductCategoryDescription
                  });

            return Ok(Stocklevel);

        }

        [Route("getProductWPrice")] //route
        [HttpGet]
        //get Sales by Date (Read)
        public IActionResult getProductWPrice()
        {

            //var markup = _db.Markups.FirstOrDefault(zz => zz.MarkupId == 3);
            var VAT = _db.Vats.FirstOrDefault(zz => zz.VatId == 2);
            var ActiveSpec = _db.Specials.Where(ss => ss.SpecialStartDate < System.DateTime.Now && ss.SpecialEndDate > System.DateTime.Now);
            //var sep = ActiveSpec.AsQueryable();
            //var pd = sep.Select(ss => ss.SpecialId);

            //var bar = _db.ProductSpecials.Find(pd);
            var items = _db.ProductItems.Join(_db.CategoryTypes,
                   su => su.CategoryTypeId,
                   so => so.CategoryTypeId,

                   (su, so) => new
                   {
                       ProductItemId = su.ProductItemId,
                       ProductItemName = su.ProductItemName, //attributes in table
                       ProductItemCost = su.ProductItemCost,
                       CategoryTypeId = su.CategoryTypeId,
                       CategoryTypeDescription = so.CategoryTypeDescription,
                       ItemDescription = so.ItemDescription,
                       CategoryTypeImage = so.CategoryTypeImage,
                       ProductCategoryId = so.ProductCategoryId


                   }).Join(_db.ProductCategories,
                   su => su.ProductCategoryId,
                   so => so.ProductCategoryId,
                    (su, so) => new
                    {
                        ProductItemId = su.ProductItemId,
                        ProductItemCost = su.ProductItemCost,
                        //sellingPrice = su.ProductItemCost + (su.ProductItemCost * markup.MarkupPercentage), //VAT Exclusive
                        // VATInclusive = (su.ProductItemCost + (su.ProductItemCost * markup.MarkupPercentage))  
                        ProductItemName = su.ProductItemName, //attributes in table
                        CategoryTypeImage = su.CategoryTypeImage,
                        CategoryTypeId = su.CategoryTypeId,
                        CategoryTypeDescription = su.CategoryTypeDescription,
                        ItemDescription = su.ItemDescription,
                        ProductCategoryId = so.ProductCategoryId,
                        ProductCategoryDescription = so.ProductCategoryDescription
                    }).Join(_db.Prices,
                      a => a.ProductItemId,
                      t => t.ProductItemId,
                      (a, t) => new
                      {
                          CategoryTypeId = a.CategoryTypeId,
                          CategoryTypeDescription = a.CategoryTypeDescription,
                          ProductItemId = a.ProductItemId,
                          ItemDescription = a.ItemDescription,
                          ProductItemName = a.ProductItemName,
                          ProductItemCost = a.ProductItemCost,
                          //QuantityOnHand = t.QuantityOnHand,
                          PriceDescription = t.PriceDescription,
                          ProductCategoryId = a.ProductCategoryId,
                          CategoryTypeImage = a.CategoryTypeImage,
                      }).Join(_db.ProductCategories,
                   su => su.ProductCategoryId,
                   so => so.ProductCategoryId,
                    (su, so) => new
                    {
                        ProductItemId = su.ProductItemId,
                        ProductItemCost = su.ProductItemCost,
                        PriceDescription = su.PriceDescription, //VAT Exclusive
                        VATInclusive = su.PriceDescription + (su.PriceDescription * VAT.VatPercentage), //VAT Inclusive
                        VATAmount = su.PriceDescription + (su.PriceDescription * VAT.VatPercentage) - su.PriceDescription, //VAT Amount
                        ProductItemName = su.ProductItemName,
                        CategoryTypeImage = su.CategoryTypeImage,
                        CategoryTypeId = su.CategoryTypeId,
                        CategoryTypeDescription = su.CategoryTypeDescription,
                        ItemDescription = su.ItemDescription,
                        ProductCategoryId = so.ProductCategoryId,
                        ProductCategoryDescription = so.ProductCategoryDescription,
                    });

            return Ok(items);
            // var spec = _db.ProductSpecials.Where(ss => ss.SpecialId = pd);
            //foreach (var item in pro)

            if (ActiveSpec == null)
            {
                var items = _db.ProductItems.Join(_db.CategoryTypes,
               su => su.CategoryTypeId,
               so => so.CategoryTypeId,

               (su, so) => new
               {
                   ProductItemId = su.ProductItemId,
                   ProductItemName = su.ProductItemName, //attributes in table
                       ProductItemCost = su.ProductItemCost,
                   CategoryTypeId = su.CategoryTypeId,
                   CategoryTypeDescription = so.CategoryTypeDescription,
                   ItemDescription = so.ItemDescription,
                   CategoryTypeImage = so.CategoryTypeImage,
                   ProductCategoryId = so.ProductCategoryId


               }).Join(_db.ProductCategories,
               su => su.ProductCategoryId,
               so => so.ProductCategoryId,
                (su, so) => new
                {
                    ProductItemId = su.ProductItemId,
                    ProductItemCost = su.ProductItemCost,
                        //sellingPrice = su.ProductItemCost + (su.ProductItemCost * markup.MarkupPercentage), //VAT Exclusive
                        // VATInclusive = (su.ProductItemCost + (su.ProductItemCost * markup.MarkupPercentage))  
                        ProductItemName = su.ProductItemName, //attributes in table
                        CategoryTypeImage = su.CategoryTypeImage,
                    CategoryTypeId = su.CategoryTypeId,
                    CategoryTypeDescription = su.CategoryTypeDescription,
                    ItemDescription = su.ItemDescription,
                    ProductCategoryId = so.ProductCategoryId,
                    ProductCategoryDescription = so.ProductCategoryDescription
                }).Join(_db.Prices,
                  a => a.ProductItemId,
                  t => t.ProductItemId,
                  (a, t) => new
                  {
                      CategoryTypeId = a.CategoryTypeId,
                      CategoryTypeDescription = a.CategoryTypeDescription,
                      ProductItemId = a.ProductItemId,
                      ItemDescription = a.ItemDescription,
                      ProductItemName = a.ProductItemName,
                      ProductItemCost = a.ProductItemCost,
                          //QuantityOnHand = t.QuantityOnHand,
                          PriceDescription = t.PriceDescription,
                      ProductCategoryId = a.ProductCategoryId,
                      CategoryTypeImage = a.CategoryTypeImage,
                  }).Join(_db.ProductCategories,
               su => su.ProductCategoryId,
               so => so.ProductCategoryId,
                (su, so) => new
                {
                    ProductItemId = su.ProductItemId,
                    ProductItemCost = su.ProductItemCost,
                    PriceDescription = su.PriceDescription, //VAT Exclusive
                        VATInclusive = su.PriceDescription + (su.PriceDescription * VAT.VatPercentage), //VAT Inclusive
                        VATAmount = su.PriceDescription + (su.PriceDescription * VAT.VatPercentage) - su.PriceDescription, //VAT Amount
                        ProductItemName = su.ProductItemName,
                    CategoryTypeImage = su.CategoryTypeImage,
                    CategoryTypeId = su.CategoryTypeId,
                    CategoryTypeDescription = su.CategoryTypeDescription,
                    ItemDescription = su.ItemDescription,
                    ProductCategoryId = so.ProductCategoryId,
                    ProductCategoryDescription = so.ProductCategoryDescription,
                });

                return Ok(items);
            }
            else
            {

                var items = _db.ProductItems.Join(_db.CategoryTypes,
                              su => su.CategoryTypeId,
                              so => so.CategoryTypeId,

                              (su, so) => new
                              {
                                  ProductItemId = su.ProductItemId,
                                  ProductItemName = su.ProductItemName, //attributes in table
                                      ProductItemCost = su.ProductItemCost,
                                  CategoryTypeId = su.CategoryTypeId,
                                  CategoryTypeDescription = so.CategoryTypeDescription,
                                  ItemDescription = so.ItemDescription,
                                  CategoryTypeImage = so.CategoryTypeImage,
                                  ProductCategoryId = so.ProductCategoryId


                              }).Join(_db.ProductCategories,
                              su => su.ProductCategoryId,
                              so => so.ProductCategoryId,
                               (su, so) => new
                               {
                                   ProductItemId = su.ProductItemId,
                                   ProductItemCost = su.ProductItemCost,
                                       //sellingPrice = su.ProductItemCost + (su.ProductItemCost * markup.MarkupPercentage), //VAT Exclusive
                                       // VATInclusive = (su.ProductItemCost + (su.ProductItemCost * markup.MarkupPercentage))  
                                       ProductItemName = su.ProductItemName, //attributes in table
                                       CategoryTypeImage = su.CategoryTypeImage,
                                   CategoryTypeId = su.CategoryTypeId,
                                   CategoryTypeDescription = su.CategoryTypeDescription,
                                   ItemDescription = su.ItemDescription,
                                   ProductCategoryId = so.ProductCategoryId,
                                   ProductCategoryDescription = so.ProductCategoryDescription
                               }).Join(_db.ProductSpecials,
                                 a => a.ProductItemId,
                                 t => t.ProductItemId,
                                 (a, t) => new
                                 {
                                     CategoryTypeId = a.CategoryTypeId,
                                     CategoryTypeDescription = a.CategoryTypeDescription,
                                     ProductItemId = a.ProductItemId,
                                     ItemDescription = a.ItemDescription,
                                     ProductItemName = a.ProductItemName,
                                     ProductItemCost = a.ProductItemCost,
                                         //QuantityOnHand = t.QuantityOnHand,
                                         PriceDescription = t.SpecialPrice,
                                     ProductCategoryId = a.ProductCategoryId,
                                     CategoryTypeImage = a.CategoryTypeImage,
                                 }).Join(_db.ProductCategories,
                              su => su.ProductCategoryId,
                              so => so.ProductCategoryId,
                               (su, so) => new
                               {
                                   ProductItemId = su.ProductItemId,
                                   ProductItemCost = su.ProductItemCost,
                                   PriceDescription = su.PriceDescription, //VAT Exclusive
                                       VATInclusive = su.PriceDescription + (su.PriceDescription * VAT.VatPercentage), //VAT Inclusive
                                       VATAmount = su.PriceDescription + (su.PriceDescription * VAT.VatPercentage) - su.PriceDescription, //VAT Amount
                                       ProductItemName = su.ProductItemName,
                                   CategoryTypeImage = su.CategoryTypeImage,
                                   CategoryTypeId = su.CategoryTypeId,
                                   CategoryTypeDescription = su.CategoryTypeDescription,
                                   ItemDescription = su.ItemDescription,
                                   ProductCategoryId = so.ProductCategoryId,
                                   ProductCategoryDescription = so.ProductCategoryDescription,
                               });
                return Ok(items);
            }
            //return Ok(ActiveSpec);
        }

        [Route("getProductWPrices")] //route
        [HttpGet]
        //get Sales by Date (Read)
        public IActionResult getProductWPrices()
        {

            var markup = _db.Markups.FirstOrDefault(zz => zz.MarkupId == 3);
            var VAT = _db.Vats.FirstOrDefault(zz => zz.VatId == 2);
            var ActiveSpec = _db.Specials.Where(ss => ss.SpecialStartDate <= System.DateTime.Now && ss.SpecialEndDate >= System.DateTime.Now);
            var productspecial = _db.ProductSpecials.Include(zz => zz.Special).Include(zz => zz.ProductItem).ThenInclude(zz => zz.CategoryType).Include(zz => zz.ProductItem.Prices)

                .Where(ss => ss.Special.SpecialStartDate <= System.DateTime.Now && ss.Special.SpecialEndDate >= System.DateTime.Now).Select(zz => new ProductItemModel
                {
                    CategoryTypeID = (int)zz.ProductItem.CategoryTypeId,
                    CategoryTypeImage = zz.ProductItem.CategoryType.CategoryTypeImage,
                    ProductItemId = (int)zz.ProductItemId,
                    ProductItemName = zz.ProductItem.ProductItemName,
                    SpecialPrice = (decimal)zz.SpecialPrice,
                    PriceDescription = zz.ProductItem.Prices.Where(xx => xx.ProductItemId == zz.ProductItemId).Select(xx => xx.PriceDescription).FirstOrDefault()
                    // PriceDescription = zz.ProductItem.pr
                }).
                ToList();


            //}

            //return Ok(bar);


        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin,Employee")]
        [Route("Collection")] //route
        [HttpPut]
        //Update Order Status
        public IActionResult Collection(SaleModel model)
        {
            var sale = _db.Sales.Find(model.SaleID);
            sale.SaleOrderRecieveType = true;
            _db.Sales.Attach(sale); //Attach Record
            _db.SaveChanges();

            return Ok(sale);
        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin,Employee")]
        [Route("Delivery")] //route
        [HttpPut]
        //Update Order Status
        public IActionResult Delivery(SaleModel model)
        {
            var sale = _db.Sales.Find(model.SaleID);
            sale.SaleOrderRecieveType = false;
            _db.Sales.Attach(sale); //Attach Record
            _db.SaveChanges();

            return Ok(sale);
        }

        [Route("AddAddress")] //route
        [HttpPost]
        //Add Address
        //Create a Model for table
        public IActionResult AddAddress(AddressModel model) //reference the model
        {
            Address address = new Address();
            address.AddressLine1 = model.AddressLine1; //attributes in table
            address.AddressLine2 = model.AddressLine2;
            address.AddressLine3 = model.AddressLine3;
            address.AddressPostalCode = model.AddressPostalCode;
            address.CustomerId = model.CustomerID;
            address.ProvinceId = model.ProvinceID;
            _db.Addresses.Add(address);
            _db.SaveChanges();

            return Ok(address);
        }

      
    }
}
