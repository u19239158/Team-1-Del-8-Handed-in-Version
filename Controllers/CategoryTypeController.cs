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
   // [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryTypeController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public CategoryTypeController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetCategoryType")] //route
        [HttpGet]
        //get Category Type (Read)
        public IActionResult get()
        {
            //var CategoryTypes = _db.CategoryTypes.ToList();

             var Cattype = _db.CategoryTypes.Join(_db.ProductCategories,
                 c => c.ProductCategoryId,
                 t => t.ProductCategoryId,
                 (c, t) => new
                 {
                     ProductCategoryID = c.ProductCategoryId,
                     ProductCategoryDesc = t.ProductCategoryDescription,
                     CategoryTypeId = c.CategoryTypeId,
                     CategoryTypeDescription = c.CategoryTypeDescription,
                     CategoryTypeImage =c.CategoryTypeImage,
                     ItemDescription = c.ItemDescription

                 });

            return Ok(Cattype);
        }

      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetCategoryTypeByID/{categorytypeid}")] //route
        [HttpGet]
        //get CategoryType by ID (Read)
        public IActionResult get(int categorytypeid)
        {
            var Cattype = _db.CategoryTypes.Join(_db.ProductCategories,
                c => c.ProductCategoryId,
                t => t.ProductCategoryId,
                (c, t) => new
                {
                    ProductCategoryID = c.ProductCategoryId,
                    ProductCategoryDesc = t.ProductCategoryDescription,
                    CategoryTypeId = c.CategoryTypeId,
                    CategoryTypeDescription = c.CategoryTypeDescription,
                    CategoryTypeImage = c.CategoryTypeImage,
                    ItemDescription = c.ItemDescription

                }).First( cc => cc.CategoryTypeId == categorytypeid) ;

            return Ok(Cattype);
        }

       // [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetCategoryTypeByDescription/{categorytypedescription}")] //route
        [HttpGet]
        //get CategoryType by Description (Read)
        public IActionResult get(string categorytypedescription)
        {
            var Cattype = _db.CategoryTypes.Join(_db.ProductCategories,
                c => c.ProductCategoryId,
                t => t.ProductCategoryId,
                (c, t) => new
                {
                    ProductCategoryID = c.ProductCategoryId,
                    ProductCategoryDesc = t.ProductCategoryDescription,
                    CategoryTypeId = c.CategoryTypeId,
                    CategoryTypeDescription = c.CategoryTypeDescription,
                    CategoryTypeImage = c.CategoryTypeImage,
                    ItemDescription = c.ItemDescription

                }).First(cc => cc.CategoryTypeDescription == categorytypedescription); 

            return Ok(Cattype);
        }

      //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetCategoryTypeByProdDesc/{productcategorydescription}")] //route
        [HttpGet]
        //get CategoryType by Description (Read)
        public IActionResult Get(string productCategoryDescription)
        {
            var Cattype = _db.CategoryTypes.Join(_db.ProductCategories,
                c => c.ProductCategoryId,
                t => t.ProductCategoryId,
                (c, t) => new
                {
                    ProductCategoryID = c.ProductCategoryId,
                    ProductCategoryDesc = t.ProductCategoryDescription,
                    CategoryTypeId = c.CategoryTypeId,
                    CategoryTypeDescription = c.CategoryTypeDescription,
                    CategoryTypeImage = c.CategoryTypeImage,
                    ItemDescription = c.ItemDescription

                }).Where(cc => cc.ProductCategoryDesc == productCategoryDescription);

            return Ok(Cattype);

        }

       // [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CreateCategoryType")] //route
        [HttpPost]
        //Add CategoryType
        //Create a Model for table
        public IActionResult CreateCategoryType(CategoryTypeModel model) //reference the model
        {
            CategoryType catType = new CategoryType();
            catType.CategoryTypeDescription = model.CategoryTypeDescription; //attributes in table
            catType.ProductCategoryId = model.ProductCategoryID;
            catType.ItemDescription = model.ItemDescription;
            catType.CategoryTypeImage = model.CategoryTypeImage;
            _db.CategoryTypes.Add(catType);
            _db.SaveChanges();

            return Ok(catType);
        }

       // [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("UpdateCategoryType")] //route
        [HttpPut]
        //Update CategoryType
        public IActionResult UpdateCategoryType(CategoryTypeModel model)
        {
            var catType = _db.CategoryTypes.Find(model.CategoryTypeID);
            catType.CategoryTypeDescription = model.CategoryTypeDescription;
            catType.ProductCategoryId = model.ProductCategoryID;
            catType.ItemDescription = model.ItemDescription;
            catType.CategoryTypeImage = model.CategoryTypeImage;
            _db.CategoryTypes.Attach(catType); //Attach Record
            _db.SaveChanges();

            return Ok(catType);
        }

       // [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("DeleteCategoryType/{categorytypeid}")] //route
        [HttpDelete]
        //Delete Category Type
        public IActionResult DeleteCategoryType(int categorytypeid)
        {
            var catType = _db.CategoryTypes.Find(categorytypeid);
            _db.CategoryTypes.Remove(catType); //Delete Record
            _db.SaveChanges();

            return Ok(catType);
        }

    }
}