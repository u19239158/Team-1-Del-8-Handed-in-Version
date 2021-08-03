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
    public class ProductItemStockTakeController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public ProductItemStockTakeController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetProductItemStockTakeS")] //route
        [HttpGet]
        //get Product Item Stock Take (Read)
        public IActionResult get()
        {
            var PItemStockTakes = _db.ProductItemStockTakes.ToList();
            return Ok(PItemStockTakes);

        }

        [Route("GetProductItemStockTake/{productitemstocktakeid}")] //route
        [HttpGet]
        //get Product Item Stock Take by ID (Read)
        public IActionResult get(int productitemstocktakeid)
        {
            var PItemStockTakes = _db.ProductItemStockTakes.Find(productitemstocktakeid);
            return Ok(PItemStockTakes);
        }


        [Route("CreateProductItemStockTake")] //route
        [HttpPost]
        //Add Product Item Stock Take
        //Create a Model for table
        public IActionResult CreateProductItemStockTake(ProductItemStockTakeModel model) //reference the model
        {
            ProductItemStockTake PItemStockTake = new ProductItemStockTake();
            PItemStockTake.StockTakeQuantity = model.StockTakeQuantity; //attributes in table
            _db.ProductItemStockTakes.Add(PItemStockTake);
            _db.SaveChanges();

            return Ok(PItemStockTake);
        }
    }
}