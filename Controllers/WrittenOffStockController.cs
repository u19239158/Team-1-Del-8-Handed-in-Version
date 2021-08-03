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
    public class WrittenOffStockController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public WrittenOffStockController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Route("GetWrittenOffStock")] //route
        [HttpGet]
        //get WrittenOffStock (Read)
        public IActionResult get()
        {
            var WrittenOffStocks = _db.WrittenOffStocks.ToList();
            return Ok(WrittenOffStocks);
        }

        [Route("CreateWrittenOffStock")] //route
        [HttpPost]
        //Add WrittenOffStock
        //Create a Model for table
        public IActionResult CreateWrittenOffStock(WrittenOffStockModel model) //reference the model
        {
            WrittenOffStock writtenoffstock = new WrittenOffStock();
            writtenoffstock.WrittenOffStockDate = model.WrittenOffStock_Date; //attributes in table
            _db.WrittenOffStocks.Add(writtenoffstock);
            _db.SaveChanges();

            return Ok(writtenoffstock);
        }

        [Route("UpdateWrittenOffStock")] //route
        [HttpPut]
        //Update WrittenOffStock
        public IActionResult UpdateWrittenOffStock(WrittenOffStockModel model)
        {
            var writtenoffstock = _db.WrittenOffStocks.Find(model.WrittenOffStock_ID);
            writtenoffstock.WrittenOffStockDate = model.WrittenOffStock_Date; //attributes in table
            _db.WrittenOffStocks.Attach(writtenoffstock); //Attach Record
            _db.SaveChanges();

            return Ok(writtenoffstock);
        }

        [Route("DeleteWrittenOffStock/{writtenoffstockid}")] //route
        [HttpDelete]
        //Delete WrittenOffStock
        public IActionResult DeleteWrittenOffStock(int writtenoffstockid)
        {
            var writtenoffstock = _db.WrittenOffStocks.Find(writtenoffstockid);
            _db.WrittenOffStocks.Remove(writtenoffstock); //Delete Record
            _db.SaveChanges();

            return Ok(writtenoffstock);
        }
    }
}