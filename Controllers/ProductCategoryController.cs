using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using NKAP_API_2.EF;
using NKAP_API_2.Models;
using System.Web;
using Microsoft.AspNetCore.Authorization;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public ProductCategoryController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin,Customer")]
        [Route("GetProdCat")] //route
        [HttpGet]
        //get Product Categories (Read)
        public IActionResult get()
        {
            var AllProductCategories = _db.ProductCategories.ToList();
            return Ok(AllProductCategories);

        }

    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin,Customer")]
        [Route("GetPCByID/{productcategoryid}")] //route
        [HttpGet]
        //get Product Categories by ID (Read)
        public IActionResult get(int productcategoryid)
        {
            var productCategory = _db.ProductCategories.Find(productcategoryid);
            return Ok(productCategory);
        }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin,Customer")]
        [Route("GetPCByDescription/{ProductCategoryDescription}")] //route
        [HttpGet]
        //get Product Categories by name (Read)
        public IActionResult get(string ProductCategoryDescription)
        {
            var productCategory = _db.ProductCategories.FirstOrDefault(pc => pc.ProductCategoryDescription == ProductCategoryDescription);
            return Ok(productCategory);
        }

    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CreatePC")] //route
        [HttpPost]
        //Add Product Categories
        //Create a Model for table
        public IActionResult CreateProductCategory(ProductCategoryModel model) //reference the model
        {
            ProductCategory ProdCat = new ProductCategory();
            ProdCat.ProductCategoryDescription = model.ProductCategoryDesc;
            ProdCat.ProductCategoryImage = model.ProductCategoryImage; //attributes in table
            _db.ProductCategories.Add(ProdCat);
            _db.SaveChanges();

            return Ok(ProdCat);
        }



     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("UpdatePC")] //route
        [HttpPut]
        //Update Product Categories
        public IActionResult UpdateProductCategory(ProductCategoryModel model)
        {
            var ProdCat = _db.ProductCategories.Find(model.ProductCategoryID);
            ProdCat.ProductCategoryDescription = model.ProductCategoryDesc;
            ProdCat.ProductCategoryImage = model.ProductCategoryImage;
            _db.ProductCategories.Attach(ProdCat); //Attach Record
            _db.SaveChanges();

            return Ok(ProdCat);
        }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("DeletePC/{productcategoryid}")] //route
        [HttpDelete]
        //Delete Product Categories 
        public IActionResult DeleteProductCategory(int productcategoryid)
        {
            var ProdCat = _db.ProductCategories.Find(productcategoryid);
            _db.ProductCategories.Remove(ProdCat); //Delete Record
            _db.SaveChanges();

            return Ok(ProdCat);
        }
    }
}