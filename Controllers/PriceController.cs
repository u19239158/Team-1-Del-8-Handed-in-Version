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
    public class PriceController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public PriceController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Route("GetPrice")] //route
        [HttpGet]
        //get Price (Read)
        public IActionResult get()
        {
            var Prices = _db.Prices.ToList();
            return Ok(Prices);
        }


        [Route("CreatePrice")] //route
        [HttpPost]
        //Add Price
        //Create a Model for table
        public IActionResult CreatePrice(PriceModel model) //reference the model
        {
            Price price = new Price();
            price.PriceDescription = model.PriceDescription; //attributes in table
            price.PriceDate = model.PriceDate; //attributes in table
            _db.Prices.Add(price);
            _db.SaveChanges();

            return Ok(price);
        }

        [Route("UpdatePrice")] //route
        [HttpPut]
        //Update Price
        public IActionResult UpdatePrice(PriceModel model)
        {
            var price = _db.Prices.Find(model.Price_ID);
            price.PriceDescription = model.PriceDescription; //attributes in table
            price.PriceDate = model.PriceDate; //attributes in table
            _db.Prices.Attach(price); //Attach Record
            _db.SaveChanges();

            return Ok(price);
        }

        [Route("DeletePrice/{priceid}")] //route
        [HttpDelete]
        //Delete Price
        public IActionResult DeletePrice(int priceid)
        {
            var price = _db.Prices.Find(priceid);
            _db.Prices.Remove(price); //Delete Record
            _db.SaveChanges();

            return Ok(price);
        }
    }
}