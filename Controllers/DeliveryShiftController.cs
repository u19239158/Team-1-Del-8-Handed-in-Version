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
        [Route("GetDeliveryShiftByID/{shiftid}")] //route
        [HttpGet]
        //get Delivery Shift (Read)
        public IActionResult get(int shiftid)
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
                 }).First(an => an.ShiftId == shiftid);

            return Ok(DeliveryShift);

        }

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
                    TimeId = a.TimeId,
                    EmployeeShiftId = t.EmployeeShiftId,
                    NoOfDeliveries = t.NoOfDeliveries

                }).Join(_db.Dates,
                 sor => sor.DateId,
                 sd => sd.DateId,
                 (sor, sd) => new
                 {
                     DateId = sor.DateId,
                     EmployeeID = sor.EmployeeId,
                     TimeId = sor.TimeId,
                     ShiftId = sor.ShiftId,
                     DayOfTheWeek = sd.DayOfTheWeek.ToString("dd/MM/yyyy"),
                     EmployeeShiftId = sor.EmployeeShiftId,
                     NoOfDeliveries = sor.NoOfDeliveries


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
                     EndTime = sd.EndTime,
                     EmployeeShiftId = sor.EmployeeShiftId,
                     NoOfDeliveries = sor.NoOfDeliveries


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
                     EndTime = sor.EndTime,
                     EmployeeShiftId = sor.EmployeeShiftId,
                     NoOfDeliveries = sor.NoOfDeliveries
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

        [Route("AddShift")] //route
        [HttpPost]
        //Add Date
        //Create a Model for table
        public IActionResult Addshift(DeliveryShiftModel model) //reference the model
        {
            Shift shift = new Shift();
            shift.DateId = model.DateID;
            shift.TimeId = model.TimeID;
            
            _db.Shifts.Add(shift);
            _db.SaveChanges();

            return Ok(shift);
        }

        //[Route("UpdateDeliveryShift")] //route
        //[HttpPut]
        ////Add Date
        ////Create a Model for table
        //public IActionResult UpdateDeliveryShift(DeliveryShiftModel model) //reference the model
        //{
        //    Date shiftDate = new Date();
        //    Time shiftTime = new Time();
        //    var shift = _db.EmployeeShifts.Find(model.EmployeeShiftID);
        //    shiftDate.DayOfTheWeek = model.DayOfTheWeek;
        //    shiftTime.StartTime = model.StartTime;
        //    shiftTime.EndTime = model.EndTime;
        //    shift.EmployeeId = model.EmployeeID;
        //    _db.Dates.Add(shiftDate);
        //    _db.SaveChanges();

        //    return Ok(shiftDate);
        //}

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

        [Route("AssignDeliveryShift")] //route
        [HttpPost]
        //Add Product Item Write-of
        //Create a Model for table
        public IActionResult AssignDeliveryShift(DeliveryShiftModel model) //reference the model
        {
            Time Times = _db.Times.Find(model.TimeID);
            {
                model.StartTime = Times.StartTime;
                model.EndTime = Times.EndTime;      
            };
      
            _db.SaveChanges();

            Date Dates = new Date
            {
                //attributes in table 
                DayOfTheWeek = model.DayOfTheWeek
            };
            _db.Dates.Add(Dates);
            _db.SaveChanges();

            Shift shifts = new Shift
            {
                DateId = Dates.DateId,
                TimeId = Times.TimeId  // assigning the date the writeoff happened to the correct table
            };
            _db.Shifts.Add(shifts);
            _db.SaveChanges();


            EmployeeShift EmpShifts = new EmployeeShift
            {
                //attributes in table 
                ShiftId = shifts.ShiftId,
                EmployeeId = model.EmployeeID,
            };
            _db.EmployeeShifts.Add(EmpShifts);
            _db.SaveChanges();

            return Ok();
        }

        [Route("UpdateDeliveryShift")] //route
        [HttpPut]
        //Create a Model for table
        public IActionResult UpdateDeliveryShift(DeliveryShiftModel model) //reference the model
        {
            Time Times = _db.Times.Find(model.TimeID);
            {
                model.StartTime = Times.StartTime;
                model.EndTime = Times.EndTime;
            };

            _db.SaveChanges();

            Date Dates = new Date
            {
                //attributes in table 
                DayOfTheWeek = model.DayOfTheWeek
            };
            _db.Dates.Add(Dates);
            _db.SaveChanges();

            var shifts = _db.Shifts.Find(model.ShiftId);
            {
                shifts.DateId = Dates.DateId;
                shifts.TimeId = Times.TimeId;
                
                
            };
            _db.Shifts.Attach(shifts);
            _db.SaveChanges();

            
            var EmpShifts = _db.EmployeeShifts.Find(model.EmployeeShiftID);
            {
                //attributes in table 
                
                EmpShifts.ShiftId = shifts.ShiftId;
                EmpShifts.EmployeeId= model.EmployeeID;
            
                
            };
            _db.EmployeeShifts.Attach(EmpShifts);
            _db.SaveChanges();

            return Ok();
        }



    }
}