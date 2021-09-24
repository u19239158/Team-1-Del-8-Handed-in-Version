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
    public class WriteOffController : ControllerBase
    {

        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public WriteOffController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetProductItemWrittenOffStocks")] //route
        [HttpGet]
        //get Product Item Write-off (Read)
        public IActionResult get()
        {
            var PItemWriteOffs = _db.ProductItemWrittenOffStocks.ToList();
            return Ok(PItemWriteOffs);

        }
        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetProductItemWrittenOffStock/{productItemwrittenoffstockid}")] //route
        [HttpGet]
        //get Product Item Write-of by ID (Read)
        public IActionResult get(int productItemwrittenoffstockid)
        {
            var PItemWriteOffs = _db.ProductItemWrittenOffStocks.Find(productItemwrittenoffstockid);
            return Ok(PItemWriteOffs);
        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("WriteOffStock")] //route
        [HttpPost]
        //Add Product Item Write-of
        //Create a Model for table
        public IActionResult WriteOffStock(ProductItemWrittenOffStockModel model) //reference the model
        {
            WrittenOffStock writtenoffstock = new WrittenOffStock
            {
                //WrittenOffStockId = model.WrittenOffStockId,
                WrittenOffStockDate = System.DateTime.Now // assigning the date the writeoff happened to the correct table
            };
            _db.WrittenOffStocks.Add(writtenoffstock);
            _db.SaveChanges();

            ProductItemWrittenOffStock PItemWriteOff = new ProductItemWrittenOffStock
            {
                WriteOffQuantity = model.WriteOffQuantity, //attributes in table 
                WriteOffReason = model.WriteOffReason,
                //NewPQuantity.ProductItemId = model.ProductItemId;  //(int)PItemWriteOff.ProductItemId; // Getting the Id of the producitem to match with the bridge and the model
                ProductItemId = model.ProductItemId,
                WrittenOffStockId = writtenoffstock.WrittenOffStockId
            };

            _db.ProductItemWrittenOffStocks.Add(PItemWriteOff);
            _db.SaveChanges();
            //NewPQuantity.QuantityOnHand = NewPQuantity.QuantityOnHand - model.WriteOffQuantity;// Function to subtract the entered quantity from the existing quantity on hand and assign it the productitem
            var NewPQuantity = _db.ProductItems.Find(model.ProductItemId);
            //NewPQuantity.ProductItemId = model.ProductItemId;  //(int)PItemWriteOff.ProductItemId; // Getting the Id of the producitem to match with the bridge and the model
            NewPQuantity.QuantityOnHand = NewPQuantity.QuantityOnHand - model.WriteOffQuantity;// Function to subtract the entered quantity from the existing quantity on hand and assign it the productitem
            _db.ProductItems.Attach(NewPQuantity);
            //Attach Record
            _db.SaveChanges();

            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = user.UserUsername + " wrote off " + model.WriteOffQuantity + " items of the " + NewPQuantity.ProductItemName;
            audit.AuditTrailDate = System.DateTime.Now;
            TimeSpan timeNow = DateTime.Now.TimeOfDay;
            audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();

            return Ok();
        }
        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("UpdatePIQuantity")] //route
        [HttpPut]
        //Update Quant on Hand
        public IActionResult UpdatePIQuantity(ProductItemWrittenOffStockModel model)
        {
            var NewPQuantity = _db.ProductItems.Find(model.ProductItemId);
            //NewPQuantity.ProductItemId = model.ProductItemId;  //(int)PItemWriteOff.ProductItemId; // Getting the Id of the producitem to match with the bridge and the model
            NewPQuantity.QuantityOnHand = NewPQuantity.QuantityOnHand - model.WriteOffQuantity;// Function to subtract the entered quantity from the existing quantity on hand and assign it the productitem
            _db.ProductItems.Attach(NewPQuantity);
             //Attach Record
            _db.SaveChanges();

            return Ok(NewPQuantity);
        }
    }
}