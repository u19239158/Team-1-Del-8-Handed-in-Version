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

        [Route("DoStockTake")] //route
        [HttpPost]
        //Add Product Item StockTake
        //Create a Model for table
        public IActionResult DoStockTake(ProductItemStockTakeModel model) //reference the model
        {
            StockTake stock = new StockTake
            {
                StockTakeId = model.StockTakeID,
                StockTakeDate = model.StockTakeDate  // assigning the date the stocktake happened to the correct table
            };
            _db.StockTakes.Add(stock);
            _db.SaveChanges();

            ProductItemStockTake PItemStockTake = new ProductItemStockTake
            {
                StockTakeQuantity = model.StockTakeQuantity, //attributes in table 
                //NewPQuantity.ProductItemId = model.ProductItemId;  //(int)PItemWriteOff.ProductItemId; // Getting the Id of the producitem to match with the bridge and the model
                ProductItemId = model.ProductItemID,
                StockTakeId = model.StockTakeID
            };


            //NewPQuantity.QuantityOnHand = NewPQuantity.QuantityOnHand - model.WriteOffQuantity;// Function to subtract the entered quantity from the existing quantity on hand and assign it the productitem

            _db.ProductItemStockTakes.Add(PItemStockTake);
            _db.SaveChanges();

            return Ok(PItemStockTake);
        }

        [Route("UpdateProdItemQuantity")] //route
        [HttpPut]
        //Update Quant on Hand
        public IActionResult UpdateProdQuantity(ProductItemStockTakeModel model)
        {
            var NewPQuantity = _db.ProductItems.Find(model.ProductItemID);
            //NewPQuantity.ProductItemId = model.ProductItemId;  //(int)PItemWriteOff.ProductItemId; // Getting the Id of the producitem to match with the bridge and the model
            NewPQuantity.QuantityOnHand =  model.StockTakeQuantity;// Function to subtract the entered quantity from the existing quantity on hand and assign it the productitem
            _db.ProductItems.Attach(NewPQuantity);
            //Attach Record
            _db.SaveChanges();

            return Ok(NewPQuantity);
        }
    }
}