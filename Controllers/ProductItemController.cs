﻿using System;
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

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductItemController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public ProductItemController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetProductItems")] //route
        [HttpGet]
        //get Product Items (Read)
        public IActionResult get()
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
                    });

                return Ok(productItems);

            }
        }

        [Route("GetPItemsByID/{productitemid}")] //route
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
                        CategoryTypeName = t.CategoryTypeDescription,
                        ProductItemId = a.ProductItemId,
                        CategoryTypeDescription = t.ItemDescription,
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
                        CategoryTypeName = t.CategoryTypeDescription,
                        ProductItemId = a.ProductItemId,
                        CategoryTypeDescription = t.ItemDescription,
                        ProductItemName = a.ProductItemName,
                        ProductItemCost = a.ProductItemCost,
                        QuantityOnHand = a.QuantityOnHand,



                    }).Where(pp => pp.CategoryTypeId == categoryTypeId);

                return Ok(productItems);
            }
        }


        [Route("CreateProductItem")] //route
        [HttpPost]
        //Add Product Item
        //Create a Model for table
        public IActionResult CreateProductItem(ProductItemModel model) //reference the model
        {
            ProductItem PItem = new ProductItem();
            PItem.ProductItemName = model.ProductItemName; //attributes in table
            PItem.ProductItemCost = model.ProductItemCost;
            PItem.CategoryTypeId = model.CategoryTypeID;
            PItem.QuantityOnHand = model.QuantityOnHand;
            _db.ProductItems.Add(PItem);
            _db.SaveChanges();

            return Ok(PItem);
        }

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

            return Ok(PItem);
        }

        [Route("DeleteProductItem/{productitemid}")] //route
        [HttpDelete]
        //Delete Product Item
        public IActionResult DeleteProductItem(int productitemid)
        {
            var Pitem = _db.ProductItems.Find(productitemid);
            _db.ProductItems.Remove(Pitem); //Delete Record
            _db.SaveChanges();

            return Ok(Pitem);
        }
    }
}