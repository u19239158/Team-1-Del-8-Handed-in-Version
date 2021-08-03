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
    public class CourierTypeController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public CourierTypeController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetCourierType")] //route
        [HttpGet]
        //get Courier Type (Read)
        public IActionResult get()
        {
            var CouriersTypes = _db.CourierTypes.ToList();
            return Ok(CouriersTypes);
        }

        [Route("GetCourierTypeByID/{couriertypeid}")] //route
        [HttpGet]
        //get Courier Type by ID (Read)
        public IActionResult get(int couriertypeid)
        {
            var CourierTypes = _db.CourierTypes.Find(couriertypeid);
            return Ok(CourierTypes);
        }

        [Route("GetCourierTypeByDescription/{couriertypedescription}")] //route
        [HttpGet]
        //get Courier Type by Description (Read)
        public IActionResult get(string couriertypedescription)
        {
            var CourierTypes = _db.CourierTypes.FirstOrDefault(cd => cd.CourierTypeDescription == couriertypedescription);
            return Ok(CourierTypes);
        }

        [Route("CreateCourierType")] //route
        [HttpPost]
        //Add Courier Type
        //Create a Model for table
        public IActionResult CreateCourierType(CourierTypeModel model) //reference the model
        {
            CourierType couriertype = new CourierType();
            couriertype.CourierTypeDescription = model.CourierTypeDescription; //attributes in table
            _db.CourierTypes.Add(couriertype);
            _db.SaveChanges();

            return Ok(couriertype);
        }

        [Route("UpdateCourierType")] //route
        [HttpPut]
        //Update Courier
        public IActionResult UpdateCourierType (CourierTypeModel model)
        {
            var couriertype = _db.CourierTypes.Find(model.CourierTypeID);
            couriertype.CourierTypeDescription = model.CourierTypeDescription; //attributes in table
            _db.CourierTypes.Attach(couriertype); //Attach Record
            _db.SaveChanges();

            return Ok(couriertype);
        }

        [Route("DeleteCourierType/{couriertypeid}")] //route
        [HttpDelete]
        //Delete Category Type
        public IActionResult DeleteCourierType(int couriertypeid)
        {
            var couriertype = _db.CourierTypes.Find(couriertypeid);
            _db.CourierTypes.Remove(couriertype); //Delete Record
            _db.SaveChanges();

            return Ok(couriertype);
        }
    }
}