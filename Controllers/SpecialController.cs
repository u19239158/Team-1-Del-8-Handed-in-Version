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
    public class SpecialController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public SpecialController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetSpecials")] //route
        [HttpGet]
        //get Specials (Read)
        public IActionResult get()
        {
            var special = _db.Specials.ToList();
            return Ok(special);

        }

        [Route("GetSpecialsByID/{speciaid}")] //route
        [HttpGet]
        //get Specials by ID (Read)
        public IActionResult get(int speciaid)
        {
            var special = _db.Specials.Find(speciaid);
            return Ok(special);
        }

        [Route("GetSpecialsByStartDate/{SpecialStartdate}")] //route
        [HttpGet]
        //get Specials by Start date (Read)
        public IActionResult get(DateTime SpecialStartdate)
        {
            var special = _db.Specials.FirstOrDefault(sd => sd.SpecialStartDate == SpecialStartdate);
            return Ok(special);
        }

        [Route("GetSpecialsByEndDate/{SpecialEnddate}")] //route
        [HttpGet]
        //get Specials by Start date (Read)
        public IActionResult Get(DateTime SpecialEnddate)
        {
            var special = _db.Specials.FirstOrDefault(se => se.SpecialEndDate == SpecialEnddate);
            return Ok(special);
        }


        [Route("CreateSpecials")] //route
        [HttpPost]
        //Add Specials
        //Create a Model for table
        public IActionResult CreateSpecials(SpecialModel model) //reference the model
        {
            Special special = new Special();
            special.SpecialDescription = model.SpecialDescription;
            special.SpecialStartDate = model.SpecialStartDate;
            special.SpecialEndDate = model.SpecialEndDate;
            byte[] byteArray = new byte[model.SpecialImage];
            special.SpecialImage = byteArray;
            /* special.SpecialImage = Convert.ToByte(model.SpecialImage);*/ //attributes in table
            _db.Specials.Add(special);
            _db.SaveChanges();

            return Ok(special);
        }

        [Route("UpdateSpecials")] //route
        [HttpPut]
        //Update Specials
        public IActionResult UpdateSpecials(SpecialModel model)
        {
            var special = _db.Specials.Find(model.SpeciaID);
            special.SpecialDescription = model.SpecialDescription;
            special.SpecialStartDate = model.SpecialStartDate;
            special.SpecialEndDate = model.SpecialEndDate;
            byte[] byteArray = new byte[model.SpecialImage];
            special.SpecialImage = byteArray;
            //special.SpecialImage = Convert.ToByte(model.SpecialImage);
            _db.Specials.Attach(special); //Attach Record
            _db.SaveChanges();

            return Ok(special);
        }

        [Route("DeleteSpecials/{specialid}")] //route
        [HttpDelete]
        //Delete Specialss
        public IActionResult DeleteSpecials(int specialid)
        {
            var special = _db.Specials.Find(specialid);
            _db.Specials.Remove(special); //Delete Record
            _db.SaveChanges();

            return Ok(special);
        }
    }
}