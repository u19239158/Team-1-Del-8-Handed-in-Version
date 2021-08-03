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
    public class ProductItemWrittenOffStockController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public ProductItemWrittenOffStockController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetProductItemWrittenOffStocks")] //route
        [HttpGet]
        //get Product Item Write-off (Read)
        public IActionResult get()
        {
            var PItemWriteOffs = _db.ProductItemWrittenOffStocks.ToList();
            return Ok(PItemWriteOffs);

        }

        [Route("GetProductItemWrittenOffStock/{productItemwrittenoffstockid}")] //route
        [HttpGet]
        //get Product Item Write-of by ID (Read)
        public IActionResult get(int productItemwrittenoffstockid)
        {
            var PItemWriteOffs = _db.ProductItemWrittenOffStocks.Find(productItemwrittenoffstockid);
            return Ok(PItemWriteOffs);
        }


        [Route("CreateProductItemWrittenOffStock")] //route
        [HttpPost]
        //Add Product Item Write-of
        //Create a Model for table
        public IActionResult CreateProductItemWrittenOffStock(ProductItemWrittenOffStockModel model) //reference the model
        {
            ProductItemWrittenOffStock PItemWriteOff = new ProductItemWrittenOffStock();
            PItemWriteOff.WriteOffQuantity = model.WriteOffQuantity; //attributes in table
            PItemWriteOff.WriteOffReason = model.WriteOffReason;
            _db.ProductItemWrittenOffStocks.Add(PItemWriteOff);
            _db.SaveChanges();

            return Ok(PItemWriteOff);
        }
    }
}