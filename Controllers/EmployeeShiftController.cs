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
    public class EmployeeShiftController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public EmployeeShiftController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Route("GetEmployeeShift")] //route
        [HttpGet]
        //get EmployeeShift (Read)
        public IActionResult get()
        {
            var EmployeeShifts = _db.EmployeeShifts.ToList();
            return Ok(EmployeeShifts);
        }


        [Route("CreateEmployeeShift")] //route
        [HttpPost]
        //Add EmployeeShift
        //Create a Model for table
        public IActionResult CreateEmployeeShift(EmployeeShiftModel model) //reference the model
        {
            EmployeeShift employeeshift = new EmployeeShift();
            employeeshift.NoOfDeliveries = model.No_Of_Deliveries; //attributes in table
            employeeshift.ShiftFull = model.Shift_Full;
            _db.EmployeeShifts.Add(employeeshift);
            _db.SaveChanges();

            return Ok(employeeshift);
        }

        [Route("UpdateEmployeeShift")] //route
        [HttpPut]
        //Update EmployeeShift
        public IActionResult UpdateEmployeeShift(EmployeeShiftModel model)
        {
            var employeeshift = _db.EmployeeShifts.Find(model.EmployeeShift_ID);
            employeeshift.NoOfDeliveries = model.No_Of_Deliveries; //attributes in table
            employeeshift.ShiftFull = model.Shift_Full;
            _db.EmployeeShifts.Attach(employeeshift); //Attach Record
            _db.SaveChanges();

            return Ok(employeeshift);
        }

        [Route("DeleteEmployeeShift/{employeeid}")] //route
        [HttpDelete]
        //Delete EmployeeShift
        public IActionResult DeleteEmployeeShift(int employeeid)
        {
            var employeeshift = _db.EmployeeShifts.Find(employeeid);
            _db.EmployeeShifts.Remove(employeeshift); //Delete Record
            _db.SaveChanges();

            return Ok(employeeshift);
        }
    }
}