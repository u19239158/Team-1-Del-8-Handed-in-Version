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
    public class TitleController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public TitleController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetTitle")] //route
        [HttpGet]
        //get Titles (Read)
        public IActionResult get()
        {
            var Titles = _db.Titles.ToList();
            return Ok(Titles);

        }
    }
}