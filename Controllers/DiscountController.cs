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
    public class DiscountController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public DiscountController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }


        [Route("GetDiscount")] //route
        [HttpGet]
        //get (Read)
        public IActionResult get()
        {
            var Discounts = _db.Discounts.ToList();
            return Ok(Discounts);
        }



        [Route("CreateDiscount")] //route
        [HttpPost]
        //Add Discount
        //Create a Model from table attributes
        public IActionResult CreatDiscount(DiscountModel model) //reference the model
        {
            Discount discount = new Discount();
            discount.DiscountPercentage = model.Discount_Percentage; //attributes in table
            _db.Discounts.Add(discount);
            _db.SaveChanges();

            return Ok(discount);
        }



        [Route("UpdateDiscount")] //route
        [HttpPut]
        //Update delivery price
        public IActionResult UpdateDeliveryPrice(DiscountModel model)
        {
            var discount = _db.Discounts.Find(model.Discount_ID);
            discount.DiscountPercentage = model.Discount_Percentage; //attributes in table
            _db.Discounts.Attach(discount); //Attach 
            _db.SaveChanges();

            return Ok(discount);
        }


        [Route("DeleteDiscount/{discountid}")] //route
        [HttpDelete]
        //Delete DeliveryPrice
        public IActionResult DeleteDeliveryPrice(int discountid)
        {
            var discount = _db.Discounts.Find(discountid);
            _db.Discounts.Remove(discount); //Delete Record
            _db.SaveChanges();

            return Ok(discount);
        }
    }
}