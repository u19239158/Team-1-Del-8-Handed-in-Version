using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NKAP_API_2.EF;
using NKAP_API_2.Models;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryShiftController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public DeliveryShiftController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetDeliveryShift")] //route
        [HttpGet]
        //get Delivery Shift (Read)
        public IActionResult get()
        {
            //var Admins = _db.Admins.ToList();

            var DeliveryShift = _db.Shifts.Join(_db.EmployeeShifts,
                a => a.ShiftId,
                t => t.ShiftId,
                (a, t) => new
                {
                    ShiftId = a.ShiftId,
                    EmployeeId = t.EmployeeId,
                    DateId = a.DateId,
                    TimeId = a.TimeId

                }).Join(_db.Dates,
                 sor => sor.DateId,
                 sd => sd.DateId,
                 (sor, sd) => new
                 {
                     DateId = sor.DateId,
                     EmployeeID = sor.EmployeeId,
                     TimeId = sor.TimeId,
                     ShiftId = sor.ShiftId,
                     DayOfTheWeek = sd.DayOfTheWeek.ToString("dd/MM/yyyy")


                 }).Join(_db.Times,
                 sor => sor.TimeId,
                 sd => sd.TimeId,
                 (sor, sd) => new
                 {
                     TimeId = sor.TimeId,
                     EmployeeID = sor.EmployeeID,
                     DateId = sor.DateId,
                     ShiftId = sor.ShiftId,
                     DayOfTheWeek = sor.DayOfTheWeek,
                     StartTime = sd.StartTime,
                     EndTime = sd.EndTime


                 }).Join(_db.Employees,
                 sor => sor.EmployeeID,
                 sd => sd.EmployeeId,
                 (sor, sd) => new
                 {
                     ShiftId = sor.ShiftId,
                     EmployeeID = sd.EmployeeId,
                     EmployeeName = sd.EmployeeName,
                     EmployeeSurame = sd.EmployeeSurname,
                     TimeId = sor.TimeId,
                     DateId = sor.DateId,
                     DayOfTheWeek = sor.DayOfTheWeek,
                     StartTime = sor.StartTime,
                     EndTime = sor.EndTime
                 });

            return Ok(DeliveryShift);

        }

        [Route("GetShiftTime")] //route
        [HttpGet]
        //Get Shift Time
        //Create a Model for table
        public IActionResult Get() //reference the model
        {
            var shiftTime = _db.Times.ToList();

            return Ok(shiftTime);
        }

        [Route("AddDate")] //route
        [HttpPost]
        //Add Date
        //Create a Model for table
        public IActionResult AddDate(DeliveryShiftModel model) //reference the model
        {
            Date shiftDate = new Date();
            shiftDate.DayOfTheWeek = model.DayOfTheWeek;
            _db.Dates.Add(shiftDate);
            _db.SaveChanges();

            return Ok(shiftDate);
        }

        [Route("UpdateDeliveryShift")] //route
        [HttpPut]
        //Add Date
        //Create a Model for table
        public IActionResult UpdateDeliveryShift(DeliveryShiftModel model) //reference the model
        {
            Date shiftDate = new Date();
            Time shiftTime = new Time();
            shiftDate.DayOfTheWeek = model.DayOfTheWeek;
            shiftTime.StartTime = model.StartTime;
            shiftTime.EndTime = model.EndTime;
            _db.Dates.Add(shiftDate);
            _db.SaveChanges();

            return Ok(shiftDate);
        }

        [Route("DeleteDeliveryShift/{employeeshiftid}")] //route
        [HttpDelete]
        //Delete Admin
        public IActionResult DeleteDeliveryShift(int employeeshiftid)
        {
            var delShift = _db.EmployeeShifts.Find(employeeshiftid);
            _db.EmployeeShifts.Remove(delShift); //Delete Record
            _db.SaveChanges();

            return Ok(delShift);
        }

    }
}