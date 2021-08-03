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
    public class MarkupController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public MarkupController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Route("GetMarkup")] //route
        [HttpGet]
        //get Markup (Read)
        public IActionResult get()
        {
            var Markups = _db.Markups.ToList();
            return Ok(Markups);
        }

        [Route("CreateMarkup")] //route
        [HttpPost]
        //Add Markup
        //Create a Model for table
        public IActionResult CreateMarkup(MarkupModel model) //reference the model
        {
            Markup markup = new Markup();
            markup.MarkupPercentage = model.Markup_Percentage; //attributes in table
            _db.Markups.Add(markup);
            _db.SaveChanges();

            return Ok(markup);
        }

        [Route("UpdateMarkup")] //route
        [HttpPut]
        //Update Markup
        public IActionResult UpdateMarkup(MarkupModel model)
        {
            var markup = _db.Markups.Find(model.Markup_ID);
            markup.MarkupPercentage = model.Markup_Percentage; //attributes in table
            _db.Markups.Attach(markup); //Attach Record
            _db.SaveChanges();

            return Ok(markup);
        }

        [Route("DeleteMarkup/{markupid}")] //route
        [HttpDelete]
        //Delete Markup
        public IActionResult DeleteMarkup(int markupid)
        {
            var markup = _db.Markups.Find(markupid);
            _db.Markups.Remove(markup); //Delete Record
            _db.SaveChanges();

            return Ok(markup);
        }
    }
}