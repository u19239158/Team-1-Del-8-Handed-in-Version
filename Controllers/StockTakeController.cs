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
    public class StockTakeController : ControllerBase
    {
            private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
            public StockTakeController(NKAP_BOLTING_DB_4Context db)
            { _db = db; }
            [Route("GetStockTake")] //route
            [HttpGet]
            //get StockTake (Read)
            public IActionResult get()
            {
                var StockTakes = _db.StockTakes.ToList();
                return Ok(StockTakes);
            }

        [Route("GetStockTakeByID/{stocktakeid}")] //route
        [HttpGet]
        //get Stock Take by ID (Read)
        public IActionResult get(int stocktakeid)
        {
            var StockTakes = _db.StockTakes.Find(stocktakeid);
            return Ok(StockTakes);
        }

        [Route("CreateStockTake")] //route
        [HttpPost]
        //Add Stock Take
        //Create a Model for table
        public IActionResult CreateStockTake(StockTakeModel model) //reference the model
        {
            StockTake stocktake = new StockTake();
            stocktake.StockTakeDate = Convert.ToDateTime(model.StockTakeDate); //attributes in table
            _db.StockTakes.Add(stocktake);
            _db.SaveChanges();

            return Ok(stocktake);
        }
    }
}