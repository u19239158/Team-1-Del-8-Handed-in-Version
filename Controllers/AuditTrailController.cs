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
    public class AuditTrailController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public AuditTrailController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetAuditTrail")] //route
        [HttpGet]
        //get Audit Trail (Read)
        public IActionResult get()
        {
            var AuditTrails = _db.AuditTrails.ToList();
            return Ok(AuditTrails);
        }

        //[Route("GetAuditTrailByID/{id}")] //route
        //[HttpGet]
        ////get Audit Trail by ID (Read)
        //public IActionResult get(int id)
        //{
        //    var Address = _db.AuditTrails.Find(id);
        //    return Ok(Address);
        //}

        [Route("CreateAuditTrail")] //route
        [HttpPost]
        //Add AuditTrail
        //Create a Model for table
        public IActionResult CreateAddress(AuditTrailModel model) //reference the model
        {
            AuditTrail auditTrail = new AuditTrail();
            auditTrail.AuditTrailDescription = model.AuditTrailDescription; //attributes in table
            auditTrail.AuditTrailDate = model.AuditTrailDate;
            auditTrail.AuditTrailTime = (model.AuditTrailTime);
            _db.AuditTrails.Add(auditTrail);
            _db.SaveChanges();

            return Ok(auditTrail);
        }
    }

   
}