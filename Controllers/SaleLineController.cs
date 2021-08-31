﻿using System;
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
    public class SaleLineController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public SaleLineController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetSaleLine")] //route
        [HttpGet]
        //get SaleLines (Read)
        public IActionResult get()
        {
            var SaleLine = _db.SaleLines.ToList();
            return Ok(SaleLine);

        }

        [Route("GetSaleLine/{salelineid}")] //route
        [HttpGet]
        //get SaleLine by ID (Read)
        public IActionResult get(int salelineid)
        {
            var SaleLine = _db.SaleLines.Find(salelineid);
            return Ok(SaleLine);
        }


        [Route("CreateSaleLine")] //route
        [HttpPost]
        //Add Sales
        //Create a Model for table
        public IActionResult CreateSaleLine(SaleLineModel model) //reference the model
        {
            SaleLine saleLine = new SaleLine();
            saleLine.SaleLineQuantity = saleLine.SaleLineQuantity; //attributes in table
            _db.SaleLines.Add(saleLine);
            _db.SaveChanges();

            return Ok(saleLine);
        }
    }
}