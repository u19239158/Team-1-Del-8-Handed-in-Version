﻿using System;
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
    public class SpecialController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public SpecialController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSpecials")] //route
        [HttpGet]
        //get Specials (Read)
        public IActionResult get()
        {
            var VAT = _db.Vats.FirstOrDefault(zz => zz.VatId == 2);
            //var special = _db.Specials.ToList();
            var special = _db.Specials.Join(_db.ProductSpecials,
               a => a.SpecialId,
               t => t.SpecialId,
               (a, t) => new
               {
                   SpecialId = a.SpecialId,
                   SpecialPrice = t.SpecialPrice,
                   ProductSpecialId = t.ProductSpecialId,
                   SpecialDescription = a.SpecialDescription,
                   SpecialStartDate = a.SpecialStartDate,
                   SpecialEndDate = a.SpecialEndDate,
                   SpecialImage = a.SpecialImage,
                   ProductItemId = t.ProductItemId

               }).Join(_db.ProductItems,
               a => a.ProductItemId,
               t => t.ProductItemId,
               (a, t) => new
               {
                   SpecialId = a.SpecialId,
                   SpecialPrice = a.SpecialPrice,
                   ProductSpecialId = a.ProductSpecialId,
                   SpecialDescription = a.SpecialDescription,
                   SpecialStartDate = a.SpecialStartDate,
                   SpecialEndDate = a.SpecialEndDate,
                   SpecialImage = a.SpecialImage,
                   ProductItemName = t.ProductItemName,
                   ProductItemId = t.ProductItemId,
                   CategoryTypeId = t.CategoryTypeId

               }).Join(_db.CategoryTypes,
               a => a.CategoryTypeId,
               t => t.CategoryTypeId,
               (a, t) => new
               {
                   SpecialId = a.SpecialId,
                   SpecialPrice = a.SpecialPrice,
                   ProductSpecialId = a.ProductSpecialId,
                   SpecialDescription = a.SpecialDescription,
                   SpecialStartDate = a.SpecialStartDate,
                   SpecialEndDate = a.SpecialEndDate,
                   SpecialImage = a.SpecialImage,
                   ProductItemName = a.ProductItemName,
                   ProductItemId = a.ProductItemId,
                   CategoryTypeImage = t.CategoryTypeImage,
                   VATInclusive = a.SpecialPrice + (a.SpecialPrice * VAT.VatPercentage), //VAT Inclusive
                   VATAmount = a.SpecialPrice + (a.SpecialPrice * VAT.VatPercentage) - a.SpecialPrice, //VAT Amount

               });
            return Ok(special);

        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSpecialsByProductItemId/{productItemId}")] //route
        [HttpGet]
        //get Specials (Read)
        public IActionResult getbyproduct(int productItemId)
        {
            //var special = _db.Specials.ToList();
            var special = _db.Specials.Join(_db.ProductSpecials,
               a => a.SpecialId,
               t => t.SpecialId,
               (a, t) => new
               {
                   SpecialId = a.SpecialId,
                   SpecialPrice = t.SpecialPrice,
                   ProductSpecialId = t.ProductSpecialId,
                   SpecialDescription = a.SpecialDescription,
                   SpecialStartDate = a.SpecialStartDate,
                   SpecialEndDate = a.SpecialEndDate,
                   SpecialImage = a.SpecialImage,
                   ProductItemId = t.ProductItemId

               }).Join(_db.ProductItems,
               a => a.ProductItemId,
               t => t.ProductItemId,
               (a, t) => new
               {
                   SpecialId = a.SpecialId,
                   SpecialPrice = a.SpecialPrice,
                   ProductSpecialId = a.ProductSpecialId,
                   SpecialDescription = a.SpecialDescription,
                   SpecialStartDate = a.SpecialStartDate,
                   SpecialEndDate = a.SpecialEndDate,
                   SpecialImage = a.SpecialImage,
                   ProductItemName = t.ProductItemName,
                   prod = t.ProductItemCost,
                   ProductItemId = t.ProductItemId

               }).First(ss => ss.ProductItemId == productItemId);
            return Ok(special);

        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSpecialsByID/{speciaid}")] //route
        [HttpGet]
        //get Specials by ID (Read)
        public IActionResult get(int speciaid)
        {
            // var special = _db.Specials.Find(speciaid);
            var special = _db.Specials.Join(_db.ProductSpecials,
               a => a.SpecialId,
               t => t.SpecialId,
               (a, t) => new
               {
                   SpecialId = a.SpecialId,
                   SpecialPrice = t.SpecialPrice,
                   ProductSpecialId = t.ProductSpecialId,
                   SpecialDescription = a.SpecialDescription,
                   SpecialStartDate = a.SpecialStartDate,
                   SpecialEndDate = a.SpecialEndDate,
                   SpecialImage = a.SpecialImage,
                   ProductItemId = t.ProductItemId

               }).Join(_db.ProductItems,
               a => a.ProductItemId,
               t => t.ProductItemId,
               (a, t) => new
               {
                   SpecialId = a.SpecialId,
                   SpecialPrice = a.SpecialPrice,
                   ProductSpecialId = a.ProductSpecialId,
                   SpecialDescription = a.SpecialDescription,
                   SpecialStartDate = a.SpecialStartDate,
                   SpecialEndDate = a.SpecialEndDate,
                   SpecialImage = a.SpecialImage,
                   ProductItemName = t.ProductItemName,
                   ProductItemCost = t.ProductItemCost,
                   ProductItemId = t.ProductItemId

               }).First(ss => ss.SpecialId == speciaid);
            return Ok(special);
        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSpecialsByStartDate/{SpecialStartdate}")] //route
        [HttpGet]
        //get Specials by Start date (Read)
        public IActionResult get(DateTime SpecialStartdate)
        {
            // var special = _db.Specials.FirstOrDefault(sd => sd.SpecialStartDate == SpecialStartdate);
            var special = _db.Specials.Join(_db.ProductSpecials,
               a => a.SpecialId,
               t => t.SpecialId,
               (a, t) => new
               {
                   SpecialID = a.SpecialId,
                   SpecialPrice = t.SpecialPrice,
                   ProductSpecialId = t.ProductSpecialId,
                   SpecialDescription = a.SpecialDescription,
                   SpecialStartDate = a.SpecialStartDate,
                   SpecialEndDate = a.SpecialEndDate,
                   SpecialImage = a.SpecialImage,

               }).Where(sd => sd.SpecialStartDate == SpecialStartdate);
            return Ok(special);
        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSpecialsByEndDate/{SpecialEnddate}")] //route
        [HttpGet]
        //get Specials by Start date (Read)
        public IActionResult Get(DateTime SpecialEnddate)
        {
            // var special = _db.Specials.FirstOrDefault(se => se.SpecialEndDate == SpecialEnddate);
            var special = _db.Specials.Join(_db.ProductSpecials,
              a => a.SpecialId,
              t => t.SpecialId,
              (a, t) => new
              {
                  SpecialID = a.SpecialId,
                  SpecialPrice = t.SpecialPrice,
                  ProductSpecialId = t.ProductSpecialId,
                  SpecialDescription = a.SpecialDescription,
                  SpecialStartDate = a.SpecialStartDate,
                  SpecialEndDate = a.SpecialEndDate,
                  SpecialImage = a.SpecialImage,

              }).Where(sd => sd.SpecialEndDate == SpecialEnddate);
            return Ok(special);
        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CreateSpecials")] //route
        [HttpPost]
        //Add Specials
        //Create a Model for table
        public IActionResult CreateSpecials(SpecialModel model) //reference the model
        {
            string resp;
            var special1 = _db.ProductSpecials.FirstOrDefault(ss => ss.ProductItemId == model.ProductItemId);
            if (special1 == null)
            {
                var prod = _db.ProductItems.Find(model.ProductItemId);

                Special special = new Special();
                {
                    special.SpecialDescription = model.SpecialDescription;
                    special.SpecialStartDate = model.SpecialStartDate.AddDays(1);
                    special.SpecialEndDate = model.SpecialEndDate.AddDays(1);
                }

                _db.Specials.Add(special);
                _db.SaveChanges();

                var discount = _db.Discounts.FirstOrDefault(zz => zz.DiscountId == model.DiscountId);
                ProductSpecial PSpecial = new ProductSpecial();
                {
                    PSpecial.ProductItemId = model.ProductItemId;
                    PSpecial.SpecialId = special.SpecialId;
                    PSpecial.SpecialPrice = model.ProductItemCost - (model.ProductItemCost * discount.DiscountPercentage);
                }

                _db.ProductSpecials.Add(PSpecial);
                _db.SaveChanges();

                var user = _db.Users.Find(model.UsersID);
                AuditTrail audit = new AuditTrail();
                decimal value = Convert.ToDecimal(discount.DiscountPercentage);
                string result = value.ToString("#0.##%");
                audit.AuditTrailDescription = user.UserUsername + " Added a special on " + prod.ProductItemName + " at " + result;
                audit.AuditTrailDate = System.DateTime.Now;
                TimeSpan timeNow = DateTime.Now.TimeOfDay;
                audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                audit.UsersId = user.UsersId;
                _db.AuditTrails.Add(audit);
                _db.SaveChanges();
            }
            else
            {
                resp = "Product Item is already on Special.";
                return BadRequest(resp);
            }


            return Ok();


        }


        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("UpdateSpecials")] //route
        [HttpPut]
        //Update Specials
        public IActionResult UpdateSpecials(SpecialModel model)
        {
            var special = _db.Specials.Find(model.SpecialID);
            {
                special.SpecialDescription = model.SpecialDescription;
                special.SpecialStartDate = model.SpecialStartDate.AddDays(1);
                special.SpecialEndDate = model.SpecialEndDate.AddDays(1);
            }
            _db.Specials.Attach(special);
            _db.SaveChanges();
            var prod = _db.ProductItems.Find(model.ProductItemId);
            var discount = _db.Discounts.FirstOrDefault(zz => zz.DiscountId == model.DiscountId);
            ProductSpecial PSpecial = new ProductSpecial();
            {
                PSpecial.ProductItemId = model.ProductItemId;
                PSpecial.SpecialId = special.SpecialId;
                PSpecial.SpecialPrice =  model.ProductItemCost - Convert.ToInt32(model.ProductItemCost) * discount.DiscountPercentage;
            }

            _db.ProductSpecials.Attach(PSpecial);
            _db.SaveChanges();

            _db.Specials.Attach(special); //Attach Record
            _db.SaveChanges();

            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            decimal value = Convert.ToDecimal(discount.DiscountPercentage);
            string result = value.ToString("#0.##%");
            audit.AuditTrailDescription = user.UserUsername + " Updated the special on " + prod.ProductItemName + " to " + result;
            audit.AuditTrailDate = System.DateTime.Now;
            TimeSpan timeNow = DateTime.Now.TimeOfDay;
            audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();

            return Ok(special);


        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("DeleteSpecials/{specialid}")] //route
        [HttpDelete]
        //Delete Specialss
        public IActionResult DeleteSpecials( int specialid, int userId)
        {
            var spec = _db.ProductSpecials.FirstOrDefault(zz => zz.SpecialId == specialid);
            
            //var Pspecial = _db.ProductSpecials.Find(productspecialId);
            _db.ProductSpecials.Remove(spec);
            //_db.ProductSpecials.Remove(Pspecial);//Delete Record
            _db.SaveChanges();

            var special = _db.Specials.Find(specialid);


            _db.Specials.Remove(special);
            _db.SaveChanges();

            //var user = _db.Users.Find(userId);
            //AuditTrail audit = new AuditTrail();
            //audit.AuditTrailDescription = user.UserUsername + " Deleted a special";
            //audit.AuditTrailDate = System.DateTime.Now;
            //TimeSpan timeNow = DateTime.Now.TimeOfDay;
            //audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            //audit.UsersId = user.UsersId;
            //_db.AuditTrails.Add(audit);
            //_db.SaveChanges();

            return Ok(special);

          
        }
    }
}