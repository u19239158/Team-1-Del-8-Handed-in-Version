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
            var productItems = _db.ProductItems.ToList();
            return Ok(productItems);

        }

        [Route("GetPItemsByID/{productitemid}")] //route
        [HttpGet]
        //get Product Items by ID (Read)
        public IActionResult get(int productitemid)
        {
            var productItem = _db.ProductItems.Find(productitemid);
            return Ok(productItem);
        }

        [Route("GetPItemsByName/{ProductItemname}")] //route
        [HttpGet]
        //get Product Items by name (Read)
        public IActionResult get(string ProductItemname)
        {
            var productItem = _db.ProductItems.FirstOrDefault(pn => pn.ProductItemName == ProductItemname);
            return Ok(productItem);
        }

        [Route("CreateProductItem")] //route
        [HttpPost]
        //Add Product Item
        //Create a Model for table
        public IActionResult CreateProductItem(ProductItemModel model) //reference the model
        {
            ProductItem PItem = new ProductItem();
            PItem.ProductItemName = model.ProductItemName; //attributes in table
            PItem.ProductItemDescription = model.ProductItemDescription;
            PItem.ProductItemCost = model.ProductItemCost;
            byte[] byteArray = new byte[model.ProductItemImage];
            PItem.ProductItemImage = byteArray;
            //PItem.ProductItemImage = model.ProductItemImage;
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
            var PItem = _db.ProductItems.Find(model.ProductItemID);
            PItem.ProductItemName = model.ProductItemName;
            PItem.ProductItemDescription = model.ProductItemDescription;
            PItem.ProductItemCost = model.ProductItemCost;
            byte[] byteArray = new byte[model.ProductItemImage];
            PItem.ProductItemImage = byteArray;
            //PItem.ProductItemImage = Convert.ToByte(model.ProductItemImage);
            PItem.QuantityOnHand = model.QuantityOnHand;
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