using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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


       [Route("GetDeliveryShiftByID/{ShiftId}")] //route
        [HttpGet]
        //get Delivery Shift (Read)
        public IActionResult GetDeliveryShiftByID(int ShiftId)
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
                    EmployeeShiftId = t.EmployeeShiftId

                }).Join(_db.Dates,
                 sor => sor.DateId,
                 sd => sd.DateId,
                 (sor, sd) => new
                 {
                     DateId = sor.DateId,
                     EmployeeID = sor.EmployeeId,
                     TimeId = sor.TimeId,
                     ShiftId = sor.ShiftId,
                     EmployeeShiftId = sor.EmployeeShiftId,
                     DayOfTheWeek = sd.DayOfTheWeek.ToString("dd/MM/yyyy")


                 }).Join(_db.Times,
                 sor => sor.TimeId,
                 sd => sd.TimeId,
                 (sor, sd) => new
                 {
                     EmployeeShiftId = sor.EmployeeShiftId,
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
                     EmployeeShiftId = sor.EmployeeShiftId,
                     ShiftId = sor.ShiftId,
                     EmployeeID = sd.EmployeeId,
                     EmployeeName = sd.EmployeeName,
                     EmployeeSurame = sd.EmployeeSurname,
                     TimeId = sor.TimeId,
                     DateId = sor.DateId,
                     DayOfTheWeek = sor.DayOfTheWeek,
                     StartTime = sor.StartTime,
                     EndTime = sor.EndTime
                 }).First(an => an.ShiftId == ShiftId);

            return Ok(DeliveryShift);

        }

        [Route("GetDeliveryShiftByEmpShiftID/{EmployeeShiftId}")] //route
        [HttpGet]
        //get Delivery Shift (Read)
        public IActionResult GetDeliveryShiftByEmpShiftID(int EmployeeShiftId)
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
                    EmployeeShiftId = t.EmployeeShiftId

                }).Join(_db.Dates,
                 sor => sor.DateId,
                 sd => sd.DateId,
                 (sor, sd) => new
                 {
                     DateId = sor.DateId,
                     EmployeeID = sor.EmployeeId,
                     TimeId = sor.TimeId,
                     ShiftId = sor.ShiftId,
                     EmployeeShiftId = sor.EmployeeShiftId,
                     DayOfTheWeek = sd.DayOfTheWeek.ToString("dd/MM/yyyy")


                 }).Join(_db.Times,
                 sor => sor.TimeId,
                 sd => sd.TimeId,
                 (sor, sd) => new
                 {
                     EmployeeShiftId = sor.EmployeeShiftId,
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
                     EmployeeShiftId = sor.EmployeeShiftId,
                     ShiftId = sor.ShiftId,
                     EmployeeID = sd.EmployeeId,
                     EmployeeName = sd.EmployeeName,
                     EmployeeSurame = sd.EmployeeSurname,
                     TimeId = sor.TimeId,
                     DateId = sor.DateId,
                     DayOfTheWeek = sor.DayOfTheWeek,
                     StartTime = sor.StartTime,
                     EndTime = sor.EndTime
                 }).First(an => an.EmployeeShiftId == EmployeeShiftId);

            return Ok(DeliveryShift);

        }

        //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin, Employee")]
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

        [Route("GetDeliveryShiftWSale")] //route
        [HttpGet]
        //get Delivery Shift (Read)
        public IActionResult GetDeliveryShiftWSale()
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
                    NoOfDeliveries = t.NoOfDeliveries,
                    DeliveryId = t.DeliveryId,
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
                     NoOfDeliveries = sor.NoOfDeliveries,
                     DeliveryId = sor.DeliveryId
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
                     NoOfDeliveries = sor.NoOfDeliveries,
                     DeliveryId = sor.DeliveryId
                 }).Join(_db.Employees,
                 sor => sor.EmployeeID,
                 sd => sd.EmployeeId,
                 (sor, sd) => new
                 {
                     ShiftId = sor.ShiftId,
                     EmployeeID = sd.EmployeeId,
                     EmployeeName = sd.EmployeeName,
                     EmployeeSurname = sd.EmployeeSurname,
                     TimeId = sor.TimeId,
                     DateId = sor.DateId,
                     DayOfTheWeek = sor.DayOfTheWeek,
                     StartTime = sor.StartTime,
                     EndTime = sor.EndTime,
                     EmployeeShiftId = sor.EmployeeShiftId,
                     NoOfDeliveries = sor.NoOfDeliveries,
                     DeliveryId = sor.DeliveryId
                 }).Join(_db.Deliveries,
                 sor => sor.DeliveryId,
                 sd => sd.DeliveryId,
                 (sor, sd) => new
                 {
                     ShiftId = sor.ShiftId,
                     EmployeeID = sor.EmployeeID,
                     EmployeeName = sor.EmployeeName,
                     EmployeeSurname = sor.EmployeeSurname,
                     TimeId = sor.TimeId,
                     DateId = sor.DateId,
                     DayOfTheWeek = sor.DayOfTheWeek,
                     StartTime = sor.StartTime,
                     EndTime = sor.EndTime,
                     EmployeeShiftId = sor.EmployeeShiftId,
                     NoOfDeliveries = sor.NoOfDeliveries,
                     DeliveryId = sor.DeliveryId,
                     SaleId = sd.SaleId, 
                 });

            return Ok(DeliveryShift);

        }


        [Route("GetDeliveryShiftDelivery")] //route
        [HttpGet]
        //get Delivery Shift (Read)
        public IActionResult GetDeliveryShiftDelivery()
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
                    NoOfDeliveries = t.NoOfDeliveries,
                    DeliveryId = t.DeliveryId

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
                     NoOfDeliveries = sor.NoOfDeliveries,
                     DeliveryId = sor.DeliveryId

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
                     NoOfDeliveries = sor.NoOfDeliveries,
                     DeliveryId = sor.DeliveryId

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
                     NoOfDeliveries = sor.NoOfDeliveries,
                     DeliveryId = sor.DeliveryId
                 }).Where( zz => zz.DeliveryId != null);

            return Ok(DeliveryShift);

        }

        //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin, Employee")]
        [Route("GetShiftTime")] //route
        [HttpGet]
        //Get Shift Time
        //Create a Model for table
        public IActionResult Get() //reference the model
        {
            var shiftTime = _db.Times.ToList();

            return Ok(shiftTime);
        }

     //   [Route("AddDate")] //route
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

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

            //add to audit trail
            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = user.UserUsername + "added a Delivery Shift";
            audit.AuditTrailDate = System.DateTime.Now;
            audit.AuditTrailTime = System.DateTime.Now.TimeOfDay;
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
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
        string response = "";
        [Route("DeleteDeliveryShift/{shiftid}")] //route
        [HttpDelete]
        //Delete DeliveryShift
        public IActionResult DeleteDeliveryShift(int shiftid)
        {
            var shift1 = _db.EmployeeShifts.FirstOrDefault(zz => zz.ShiftId == shiftid);
            if (shift1.DeliveryId >= 0)
            {
                response = "Delivery Shift could not be deleted as it is has a delivery allocated to it";
                return BadRequest(response);
            }
            else
            {
                var shift = _db.Shifts.FirstOrDefault(zz => zz.ShiftId == shiftid);
                _db.Shifts.Remove(shift);
                var delShift = _db.EmployeeShifts.FirstOrDefault(zz => zz.ShiftId == shiftid);
                _db.EmployeeShifts.Remove(delShift); //Delete Record
                _db.SaveChanges();
                return Ok(delShift);
            }
            //try
            //{
            //    var shift = _db.Shifts.FirstOrDefault(zz => zz.ShiftId == shiftid);
            //    _db.Shifts.Remove(shift);
            //    var delShift = _db.EmployeeShifts.FirstOrDefault(zz => zz.ShiftId == shiftid);
            //    _db.EmployeeShifts.Remove(delShift); //Delete Record
            //    _db.SaveChanges();
            //    return Ok(delShift);
            //}
            //catch (Exception)
            //{
            //    response = "Delivery Shift could not be deleted as it is has a delivery allocated to it";
            //    return BadRequest(response);
            //    throw;
            //}

            //add to audit trail
            //var user = _db.Users.Find(model.UsersID);
            //AuditTrail audit = new AuditTrail();
            //audit.AuditTrailDescription = user.UserUsername + "deleted a Delivery Shift";
            //audit.AuditTrailDate = System.DateTime.Now;
            //audit.AuditTrailTime = System.DateTime.Now.TimeOfDay;
            //audit.UsersId = user.UsersId;
            //_db.AuditTrails.Add(audit);
            //_db.SaveChanges();
        }

        //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

            //add to audit trail
            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = user.UserUsername + "assigned a Delivery Shift to an employee";
            audit.AuditTrailDate = System.DateTime.Now;
            audit.AuditTrailTime = System.DateTime.Now.TimeOfDay;
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();

            return Ok();
        }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

            
            var EmpShifts = _db.EmployeeShifts.Find(model.EmployeeShiftId);
            {
                //attributes in table 
                
                EmpShifts.ShiftId = shifts.ShiftId;
                EmpShifts.EmployeeId= model.EmployeeID;
            
                
            };
            _db.EmployeeShifts.Attach(EmpShifts);
            _db.SaveChanges();

            //add to audit trail
            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = user.UserUsername + "updated a Delivery Shift";
            audit.AuditTrailDate = System.DateTime.Now;
            audit.AuditTrailTime = System.DateTime.Now.TimeOfDay;
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();

            return Ok();
        }

        //  [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin, Employee")]
        [Route("GetAssigned/{employeeshiftId}")] //route
        [HttpGet]
        //get Delivery Shift (Read)
        public IActionResult GetAssigned(int employeeshiftId)
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
                    NoOfDeliveries = t.NoOfDeliveries,
                    DeliveryId = t.DeliveryId

                }).Join(_db.Deliveries,
                 sor => sor.DeliveryId,
                 sd => sd.DeliveryId,
                 (sor, sd) => new
                 {
                     DateId = sor.DateId,
                     EmployeeId = sor.EmployeeId,
                     TimeId = sor.TimeId,
                     ShiftId = sor.ShiftId,
                     EmployeeShiftId = sor.EmployeeShiftId,
                     NoOfDeliveries = sor.NoOfDeliveries,
                     SaleId = sd.SaleId


                 }).Join(_db.Sales,
                 sor => sor.SaleId,
                 sd => sd.SaleId,
                 (sor, sd) => new
                 {
                     TimeId = sor.TimeId,
                     EmployeeID = sor.EmployeeId,
                     DateId = sor.DateId,
                     ShiftId = sor.ShiftId,
                     EmployeeShiftId = sor.EmployeeShiftId,
                     NoOfDeliveries = sor.NoOfDeliveries,
                     SaleId = sd.SaleId,
                     CustomerID = sd.CustomerId


                 }).Join(_db.Customers,
                sor => sor.CustomerID,
                sd => sd.CustomerId,
                (sor, sd) => new
                {
                    CustomerID = sor.CustomerID,
                    CustomerName = sd.CustomerName,
                    CustomerCellphoneNumber = sd.CustomerCellphoneNumber,
                    CustomerSurname = sd.CustomerSurname,
                    CustomerBusinessName = sd.CustomerBusinessName,
                    SaleID = sor.SaleId,
                    EmployeeShiftId = sor.EmployeeShiftId

                }).Join(_db.Addresses,
                sor => sor.CustomerID,
                sd => sd.CustomerId,
                (sor, sd) => new
                {
                    CustomerId = sor.CustomerID,
                    CustomerName = sor.CustomerName,
                    CustomerSurname = sor.CustomerSurname,
                    CustomerBusinessName = sor.CustomerBusinessName,
                    CustomerCellphoneNumber = sor.CustomerCellphoneNumber,
                    SaleID = sor.SaleID,
                    AddressLine1 = sd.AddressLine1,
                    AddressLine2 = sd.AddressLine2,
                    AddressLine3 = sd.AddressLine3,
                    AddressPostalCode = sd.AddressPostalCode,
                    EmployeeShiftId = sor.EmployeeShiftId

                }).FirstOrDefault(zz => zz.EmployeeShiftId == employeeshiftId);

            return Ok(DeliveryShift);

        }
        //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        //[Route("UpdateMaxDeliveries")] //route
        //[HttpPut]
        ////Update UpdateMaxDeliveries
        //public IActionResult UpdateMaxDeliveries(DeliveryShiftModel model)
        //{
        //    var newMax = _db.MaxDeliveries.Find( zz => zz.MaxID = 1);
        //    newMax.MaxNumber = model.MaxNumber; //attributes in table
        //    _db.MaxDeliveries.Attach(newMax); //Attach Record
        //    _db.SaveChanges();


        //    return Ok(newMax);
        //}

    }
}