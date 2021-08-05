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
            var EmployeeShifts = _db.EmployeeShifts.Join(_db.Employees,
                 su => su.EmployeeId,
                 so => so.EmployeeId,

                 (su, so) => new
                 {
                     EmployeeId = so.EmployeeId,
                     Employee = so.EmployeeName,
                     EmployeeShiftID = su.EmployeeShiftId,
                     NoOfDeliveries = su.NoOfDeliveries,
                     ShiftId = su.ShiftId,
                     ShiftFull = su.ShiftFull,
                     DeliveryID = su.DeliveryId
                    //attributes in table

                }).Join(_db.Shifts,
                 sor => sor.ShiftId,
                 sd => sd.ShiftId,
                 (sor, sd) => new
                 {
                     EmployeeId = sor.EmployeeId,
                     Employee = sor.Employee,
                     EmployeeShiftID = sor.EmployeeShiftID,
                     NoOfDeliveries = sor.NoOfDeliveries,
                     ShiftFull = sor.ShiftFull,
                     ShiftID = sd.ShiftId,
                     DeliveryID = sor.DeliveryID

                 }).Join(_db.Deliveries,
                 sor => sor.DeliveryID,
                 sd => sd.DeliveryId,
                 (jj, dd) => new
                 {
                     EmployeeId = jj.EmployeeId,
                     Employee = jj.Employee,
                     EmployeeShiftID = jj.EmployeeShiftID,
                     NoOfDeliveries = jj.NoOfDeliveries,
                     ShiftFull = jj.ShiftFull,
                     ShiftID = jj.ShiftID,
                     DeliveryID = jj.DeliveryID

                 })
                ;
            return Ok(EmployeeShifts);
        }

        [Route("GetEmployeeShiftByName/{employeename}")] //route
        [HttpGet]
        //get EmployeeShiftByName (Read)
        public IActionResult get(string employeename)
        {
            var EmployeeShifts = _db.EmployeeShifts.Join(_db.Employees,
                 su => su.EmployeeId,
                 so => so.EmployeeId,

                 (su, so) => new
                 {
                     EmployeeId = so.EmployeeId,
                     Employee = so.EmployeeName,
                     EmployeeShiftID = su.EmployeeShiftId,
                     NoOfDeliveries = su.NoOfDeliveries,
                     ShiftId = su.ShiftId,
                     ShiftFull = su.ShiftFull,
                     DeliveryID = su.DeliveryId
                     //attributes in table

                 }).Join(_db.Shifts,
                 sor => sor.ShiftId,
                 sd => sd.ShiftId,
                 (sor, sd) => new
                 {
                     EmployeeId = sor.EmployeeId,
                     Employee = sor.Employee,
                     EmployeeShiftID = sor.EmployeeShiftID,
                     NoOfDeliveries = sor.NoOfDeliveries,
                     ShiftFull = sor.ShiftFull,
                     ShiftID = sd.ShiftId,
                     DeliveryID = sor.DeliveryID

                 }).Join(_db.Deliveries,
                 sor => sor.DeliveryID,
                 sd => sd.DeliveryId,
                 (jj, dd) => new
                 {
                     EmployeeId = jj.EmployeeId,
                     Employee = jj.Employee,
                     EmployeeShiftID = jj.EmployeeShiftID,
                     NoOfDeliveries = jj.NoOfDeliveries,
                     ShiftFull = jj.ShiftFull,
                     ShiftID = jj.ShiftID,
                     DeliveryID = jj.DeliveryID

                 }).Where(ss => ss.Employee == employeename)
                ;
            return Ok(EmployeeShifts);
        }

        [Route("GetEmployeeShiftByDate/{date}")] //route
        [HttpGet]
        //get EmployeeShiftByName (Read)
        public IActionResult get(int date)
        {
            var EmployeeShifts = _db.EmployeeShifts.Join(_db.Employees,
                 su => su.EmployeeId,
                 so => so.EmployeeId,

                 (su, so) => new
                 {
                     EmployeeId = so.EmployeeId,
                     Employee = so.EmployeeName,
                     EmployeeShiftID = su.EmployeeShiftId,
                     NoOfDeliveries = su.NoOfDeliveries,
                     ShiftId = su.ShiftId,
                     ShiftFull = su.ShiftFull,
                     DeliveryID = su.DeliveryId,
                    
                     
                     //attributes in table

                 }).Join(_db.Shifts,
                 sor => sor.ShiftId,
                 sd => sd.ShiftId,
                 (sor, sd) => new
                 {
                     EmployeeId = sor.EmployeeId,
                     Employee = sor.Employee,
                     EmployeeShiftID = sor.EmployeeShiftID,
                     NoOfDeliveries = sor.NoOfDeliveries,
                     ShiftFull = sor.ShiftFull,
                     ShiftID = sd.ShiftId,
                     DeliveryID = sor.DeliveryID,
                     shiftdate = sd.DateId
                   

                 }).Join(_db.Deliveries,
                 sor => sor.DeliveryID,
                 sd => sd.DeliveryId,
                 (jj, dd) => new
                 {
                     EmployeeId = jj.EmployeeId,
                     Employee = jj.Employee,
                     EmployeeShiftID = jj.EmployeeShiftID,
                     NoOfDeliveries = jj.NoOfDeliveries,
                     ShiftFull = jj.ShiftFull,
                     ShiftID = jj.ShiftID,
                     DeliveryID = jj.DeliveryID,
                     Shiftdate = jj.shiftdate

                 }).Where(ss => ss.Shiftdate == date)
                ;
            return Ok(EmployeeShifts);
        }

        [Route("CreateEmployeeShift")] //route
        [HttpPost]
        //Add EmployeeShift
        //Create a Model for table
        public IActionResult CreateEmployeeShift(EmployeeShiftModel model) //reference the model
        {
            EmployeeShift employeeshift = new EmployeeShift();
            employeeshift.NoOfDeliveries = model.NoOfDeliveries; //attributes in table
            employeeshift.ShiftFull = model.ShiftFull;
            employeeshift.DeliveryId = model.DeliveryId;
            employeeshift.EmployeeId = model.EmployeeId;
            employeeshift.ShiftId = model.ShiftId;
            _db.EmployeeShifts.Add(employeeshift);
            _db.SaveChanges();

            return Ok(employeeshift);
        }

        [Route("UpdateEmployeeShift")] //route
        [HttpPut]
        //Update EmployeeShift
        public IActionResult UpdateEmployeeShift(EmployeeShiftModel model)
        {
            var employeeshift = _db.EmployeeShifts.Find(model.EmployeeShiftId);
            employeeshift.NoOfDeliveries = model.NoOfDeliveries; //attributes in table
            employeeshift.ShiftFull = model.ShiftFull;
            employeeshift.DeliveryId = model.DeliveryId;
            employeeshift.EmployeeId = model.EmployeeId;
            employeeshift.ShiftId = model.ShiftId;
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