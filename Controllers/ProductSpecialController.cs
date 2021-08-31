using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    public class ProductSpecialController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public ProductSpecialController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetProductSpecials")] //route
        [HttpGet]
        //get Product Specials (Read)
        public IActionResult get()
        {
            var ProductSpecials = _db.ProductSpecials.ToList();
            return Ok(ProductSpecials);

        }


        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetProductSpecial/{productspecialid}")] //route
        [HttpGet]
        //get Product Specials by ID (Read)
        public IActionResult get(int productspecialid)
        {
            var ProductSpecials = _db.ProductSpecials.Find(productspecialid);
            return Ok(ProductSpecials);
        }


        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CreateProductSpecials")] //route
        [HttpPost]
        //Add Product Specials
        //Create a Model for table
        public IActionResult CreateProductSpecials(ProductSpecialModel model) //reference the model
        {
            ProductSpecial ProductSpecial = new ProductSpecial();
            ProductSpecial.SpecialPrice = model.SpecialPrice; //attributes in table
            _db.ProductSpecials.Add(ProductSpecial);
            _db.SaveChanges();

            return Ok(ProductSpecial);
        }


        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("UpdateProductSpecials")] //route
        [HttpPut]
        //Update Product Specials
        public IActionResult UpdateProductSpecials(ProductSpecialModel model)
        {
            var ProductSpecial = _db.ProductSpecials.Find(model.ProductSpecialId);
            ProductSpecial.SpecialPrice = model.SpecialPrice;
            _db.ProductSpecials.Attach(ProductSpecial); //Attach Record
            _db.SaveChanges();

            return Ok(ProductSpecial);
        }


        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("DeleteOrderStatus/{productspecialid}")] //route
        [HttpDelete]
        //Delete Product Specials
        public IActionResult DeleteProductSpecials(int productspecialid)
        {
            var ProductSpecial = _db.ProductSpecials.Find(productspecialid);
            _db.ProductSpecials.Remove(ProductSpecial); //Delete Record
            _db.SaveChanges();

            return Ok(ProductSpecial);
        }
    }
}