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
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductItemController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public ProductItemController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }


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


        [Route("GetProductItems")] //route
        [HttpGet]
        //get Product Items (Read)
        public IActionResult get()
        {
            //var productItems = _db.ProductItems.ToList();
            {
                //var pitem = _db.ProductSpecials.Include(zz => zz.ProductItem).ThenInclude(zz => zz.CategoryType).Select(zz => new ProductItemModel
                //{
                //    CategoryTypeID = (int)zz.ProductItem.CategoryTypeId,
                //    // CategoryTypeImage = zz.ProductItem.CategoryTypeImage,
                //    ProductItemId = (int)zz.ProductItemId,
                //    ProductItemName = zz.ProductItem.ProductItemName,
                //    ProductSpecialID = zz.ProductSpecialId

                //}
                //    );

                var productItems = _db.ProductItems.Join(_db.CategoryTypes,
                    a => a.CategoryTypeId,
                    t => t.CategoryTypeId,
                    (a, t) => new
                    {
                        CategoryTypeId = a.CategoryTypeId,
                        CategoryTypeName = t.CategoryTypeDescription,
                        ProductItemId = a.ProductItemId,
                        CategoryTypeDescription = t.ItemDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand
                    });

                return Ok(productItems);

            }
        }

        [Route("GetProductItemsWPrice")] //route
        [HttpGet]
        //get Product Items (Read)
        public IActionResult GetProductItemsWPrice()
        {
            //var productItems = _db.ProductItems.ToList();
            {

                var productItems = _db.ProductItems.Join(_db.CategoryTypes,
                    a => a.CategoryTypeId,
                    t => t.CategoryTypeId,
                    (a, t) => new
                    {
                        CategoryTypeId = a.CategoryTypeId,
                        CategoryTypeName = t.CategoryTypeDescription,
                        ProductItemId = a.ProductItemId,
                        CategoryTypeDescription = t.ItemDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand
                    }).Join(_db.Prices,
                    a => a.ProductItemId,
                    t => t.ProductItemId,
                    (a, t) => new
                    {
                        CategoryTypeId = a.CategoryTypeId,
                        CategoryTypeName = a.CategoryTypeName,
                        ProductItemId = a.ProductItemId,
                        CategoryTypeDescription = a.CategoryTypeDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand,
                        PriceDescription = t.PriceDescription


                    });

                return Ok(productItems);

            }
        }

        [Route("GetProdItemsByID/{productitemid}")] //route
        [HttpGet]
        //get Product Items by ID (Read)
        public IActionResult get(int productitemid)
        {
            //var productItem = _db.ProductItems.Find(productitemid);
            {

                var productItems = _db.ProductItems.Join(_db.CategoryTypes,
                    a => a.CategoryTypeId,
                    t => t.CategoryTypeId,
                    (a, t) => new
                    {
                        CategoryTypeId = a.CategoryTypeId,
                        CategoryTypeDescription = t.CategoryTypeDescription,
                        ProductItemId = a.ProductItemId,
                        ItemDescription = t.ItemDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand,
                

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
                        QuantityOnHand = a.QuantityOnHand,
                        PriceDescription = t.PriceDescription


                    }).First(pp => pp.ProductItemId == productitemid);

                return Ok(productItems);
            }
        }

        [Route("GetPItemsByID/{productitemid}")] //route
        [HttpGet]
        //get Product Items by ID (Read)
        public IActionResult GetPItems(int productitemid)
        {
            //var productItem = _db.ProductItems.Find(productitemid);
            {

                var productItems = _db.ProductItems.Join(_db.CategoryTypes,
                    a => a.CategoryTypeId,
                    t => t.CategoryTypeId,
                    (a, t) => new
                    {
                        CategoryTypeId = a.CategoryTypeId,
                        CategoryTypeDescription = t.CategoryTypeDescription,
                        ProductItemId = a.ProductItemId,
                        ItemDescription = t.ItemDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand,


                    }).First(pp => pp.ProductItemId == productitemid);

                return Ok(productItems);
            }
        }

        [Route("GetPItemsByName/{ProductItemname}")] //route
        [HttpGet]
        //get Product Items by name (Read)
        public IActionResult get(string ProductItemname)
        {
            //var productItem = _db.ProductItems.FirstOrDefault(pn => pn.ProductItemName == ProductItemname);
            {

                var productItems = _db.ProductItems.Join(_db.CategoryTypes,
                    a => a.CategoryTypeId,
                    t => t.CategoryTypeId,
                    (a, t) => new
                    {
                        CategoryTypeId = a.CategoryTypeId,
                        CategoryTypeName = t.CategoryTypeDescription,
                        ProductItemId = a.ProductItemId,
                        CategoryTypeDescription = t.ItemDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand,



                    }).Where(pp => pp.ProductItemName == ProductItemname);

                return Ok(productItems);
            }
        }

        [Route("GetPItemsByCatType/{categoryTypeId}")] //route
        [HttpGet]
        //get Product Items by name (Read)
        public IActionResult Get(int categoryTypeId)
        {
            //var productItem = _db.ProductItems.FirstOrDefault(pn => pn.ProductItemName == ProductItemname);
            {

                var productItems = _db.ProductItems.Join(_db.CategoryTypes,
                    a => a.CategoryTypeId,
                    t => t.CategoryTypeId,
                    (a, t) => new
                    {
                        CategoryTypeId = a.CategoryTypeId,
                        CategoryTypeImage = t.CategoryTypeImage,
                        CategoryTypeName = t.CategoryTypeDescription,
                        ProductItemId = a.ProductItemId,
                        ItemDescription = t.ItemDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand,



                    }).Join(_db.Prices,
                    a => a.ProductItemId,
                    t => t.ProductItemId,
                    (a, t) => new
                    {
                        CategoryTypeId = a.CategoryTypeId,
                        CategoryTypeName = a.CategoryTypeName,
                        ProductItemId = a.ProductItemId,
                        ItemDescription = a.ItemDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand,
                        PriceDescription = t.PriceDescription


                    }).Where(pp => pp.CategoryTypeId == categoryTypeId);

                return Ok(productItems);
            }
        }


        //I am adding this to display productItems by filtering through the 7 product Categories
        [Route("GetProdByProductCategory/{productcategoryid}")] //route
        [HttpGet]
        //get Product Items by category (Read)
        public IActionResult GetP(int productcategoryid)
        {
            //var productItem = _db.ProductItems.FirstOrDefault(pn => pn.ProductItemName == ProductItemname);

            {
                var markup = _db.Markups.FirstOrDefault(zz => zz.MarkupId == 3);
                var VAT = _db.Vats.FirstOrDefault(zz => zz.VatId == 2);
                var productItems = _db.ProductItems.Join(_db.CategoryTypes,
                    a => a.CategoryTypeId,
                    t => t.CategoryTypeId,
                    (a, t) => new
                    {
                        CategoryTypeId = a.CategoryTypeId,
                        CategoryTypeImage = t.CategoryTypeImage,
                        CategoryTypeDescription = t.CategoryTypeDescription,
                        sellingPrice = a.ProductItemCost + (a.ProductItemCost * markup.MarkupPercentage), //VAT Exclusive
                        ProductItemId = a.ProductItemId,
                        ItemDescription = t.ItemDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand,
                        ProductCategoryId = t.ProductCategoryId,


                    }).Join(_db.ProductCategories,
                    a => a.ProductCategoryId,
                    t => t.ProductCategoryId,
                    (a, t) => new
                    {
                        CategoryTypeId = a.CategoryTypeId,
                        CategoryTypeImage = a.CategoryTypeImage,
                        CategoryTypeName = a.CategoryTypeDescription,
                        ProductItemId = a.ProductItemId,
                        sellingPrice = a.sellingPrice, //VAT Exclusive
                        VATInclusive = a.sellingPrice + (a.sellingPrice * VAT.VatPercentage), //VAT Inclusive
                        VATAmount = a.sellingPrice + (a.sellingPrice * VAT.VatPercentage) - a.sellingPrice, //VAT Amount
                        CategoryTypeDescription = a.ItemDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand,
                        ProductCategoryDescription = t.ProductCategoryDescription,
                        ProductCategoryId = t.ProductCategoryId,



                    }).Where(pp => pp.ProductCategoryId == productcategoryid);

                return Ok(productItems);
            }
        }


        //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CreateProductItem")] //route
        [HttpPost]
        //Add Product Item
        //Create a Model for table
        public IActionResult CreateProductItem(ProductItemModel model) //reference the model
        {
            ProductItem PItem = new ProductItem();
            {
                PItem.ProductItemName = model.ProductItemName; //attributes in table
                PItem.ProductItemCost = model.ProductItemCost;
                PItem.CategoryTypeId = model.CategoryTypeID;
                PItem.QuantityOnHand = 0;
            }
          //  PItem.QuantityOnHand = model.QuantityOnHand;
            _db.ProductItems.Add(PItem);
            _db.SaveChanges();

            var markup = _db.Markups.FirstOrDefault(zz => zz.MarkupId == model.MarkupId);
            Price ProdPrice = new Price();
            {
                ProdPrice.ProductItemId = PItem.ProductItemId;
                ProdPrice.PriceDate = System.DateTime.Now;
                ProdPrice.PriceDescription = (decimal)(model.ProductItemCost + (model.ProductItemCost * markup.MarkupPercentage));
            }

            _db.Prices.Add(ProdPrice);
            _db.SaveChanges();

           // add to audit trail
            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = user.UserUsername + " added the Product Item: " + model.ProductItemName;
            audit.AuditTrailDate = System.DateTime.Now;
            TimeSpan timeNow = DateTime.Now.TimeOfDay;
            audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();

            return Ok();
        }


    //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("UpdateProductItem")] //route
        [HttpPut]
        //Update Product Item
        public IActionResult UpdateProductItems(ProductItemModel model)
        {
            var PItem = _db.ProductItems.Find(model.ProductItemId);
            PItem.ProductItemName = model.ProductItemName;
            PItem.ProductItemCost = model.ProductItemCost;
            //PItem.ProductItemImage = Convert.ToByte(model.ProductItemImage);
           // PItem.QuantityOnHand = model.QuantityOnHand;
            _db.ProductItems.Attach(PItem); //Attach Record
            _db.SaveChanges();

            var markup = _db.Markups.FirstOrDefault(zz => zz.MarkupId == model.MarkupId);
            var Product = _db.Prices.FirstOrDefault(cc => cc.ProductItemId == model.ProductItemId);
            {
                //Product.ProductItemId = PItem.ProductItemId;
                Product.PriceDate = System.DateTime.Now;
                Product.PriceDescription = (decimal)(model.ProductItemCost + (model.ProductItemCost * markup.MarkupPercentage));
            }

            _db.Prices.Attach(Product);
            _db.SaveChanges();

           // add to audit trail
            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = user.UserUsername + " updated the Product Item: " + model.ProductItemName;
            audit.AuditTrailDate = System.DateTime.Now;
            TimeSpan timeNow = DateTime.Now.TimeOfDay;
            audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();

            return Ok();
        }

        string response = "";
        // [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("DeleteProductItem")] //route
        [HttpPost]
        //Delete Product Item
        public IActionResult DeleteProductItem(ProductItemModel model)
        {
            
                var ProdSpec = _db.ProductSpecials.FirstOrDefault(zz => zz.ProductItemId == model.ProductItemId);
            var item = _db.SupplierOrderLines.FirstOrDefault(zz => zz.ProductItemId == model.ProductItemId);
            var items = _db.SaleLines.FirstOrDefault(zz => zz.ProductItemId == model.ProductItemId);
            var ite = _db.ProductItemStockTakes.FirstOrDefault(zz => zz.ProductItemId == model.ProductItemId);
            var it = _db.ProductItemWrittenOffStocks.FirstOrDefault(zz => zz.ProductItemId == model.ProductItemId);

            if (item != null || items != null || ite != null || it != null)
            {
                response = "Product Item could not be deleted due to existing dependencies";
                return BadRequest(response);
            }
                else if (ProdSpec == null)
                {
                    var ItemPrice = _db.Prices.FirstOrDefault(zz => zz.ProductItemId == model.ProductItemId);
                    var Pitem = _db.ProductItems.Find(model.ProductItemId);
                    _db.Prices.Remove(ItemPrice);
                    _db.SaveChanges();
                    _db.ProductItems.Remove(Pitem);  //Delete Record
                    _db.SaveChanges();

                    //add to audit trail
                    var user = _db.Users.Find(model.UsersID);
                    AuditTrail audit = new AuditTrail();
                    audit.AuditTrailDescription = user.UserUsername + " deleted the Product Item: " + model.ProductItemName;
                    audit.AuditTrailDate = System.DateTime.Now;
                    TimeSpan timeNow = DateTime.Now.TimeOfDay;
                    audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                    audit.UsersId = user.UsersId;
                    _db.AuditTrails.Add(audit);
                    _db.SaveChanges();

                    return Ok();

                }
                else
                {
                    response = "Product Item could not be deleted as it belongs to a Special";
                    return BadRequest(response);

                }
           
              
                
            
         

            
        }
    }
}