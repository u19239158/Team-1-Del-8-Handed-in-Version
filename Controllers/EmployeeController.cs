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
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public EmployeeController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetEmployee")] //route
        [HttpGet]
        //get Employee (Read)
        public IActionResult get()
        {
            var Employees = _db.Employees.ToList();
            return Ok(Employees);

        }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetEmployeeById/{employeeid}")] //route
        [HttpGet]
        //get Employee by name (Read)
        public IActionResult get(int employeeid)
        {
            var Employees = _db.Employees.FirstOrDefault(en => en.EmployeeId == employeeid);
            return Ok(Employees);
        }

    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetEmployeeByName/{employeename}")] //route
        [HttpGet]
        //get Employee by name (Read)
        public IActionResult get(string employeename)
        {
            var Employees = _db.Employees.FirstOrDefault(en => en.EmployeeName == employeename);
            return Ok(Employees);
        }
        
    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetEmployeeBySurname/{employeesurname}")] //route
        [HttpGet]
        //get Employee by name (Read)
        public IActionResult Get(string employeesurname)
        {
            var Employees = _db.Employees.FirstOrDefault(es => es.EmployeeSurname == employeesurname);
            return Ok(Employees);
        }

    //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CreateEmployee")] //route
        [HttpPost]
        //Add Employee
        //Create a Model for table
        public IActionResult CreateEmployee(EmployeeModel model) //reference the model
        {
            var newUser = new User
            {
                UserUsername = model.UserUsername,
                UserPassword = ComputeSha256Hash(model.UserPassword),
                UserRoleId = 3,

            };
            _db.Users.Add(newUser);
            _db.SaveChanges();


            PasswordHistory pass = new PasswordHistory();
            pass.PasswordHistoryDate = System.DateTime.Now;
            pass.UsersId = newUser.UsersId;
            pass.PasswordHistoryText = newUser.UserPassword;
            _db.PasswordHistories.Add(pass);
            _db.SaveChanges();

            Employee employee = new Employee();
            {
                employee.EmployeeName = model.EmployeeName; //attributes in table
                employee.EmployeeSurname = model.EmployeeSurName;
                employee.EmployeeAddressLine1 = model.EmployeeAddressLine1;
                employee.EmployeeAddressLine2 = model.EmployeeAddressLine2;
                employee.EmployeeCellphoneNumber = model.EmployeeCellphoneNumber;
                employee.EmployeeDob = model.EmployeeDOB.AddDays(1);
                employee.EmployeeIdnumber = (model.EmployeeIDNumber);
                employee.UsersId = newUser.UsersId;
                _db.Employees.Add(employee);
                _db.SaveChanges();

            }

            //add to audit trail
            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = user.UserUsername + " added the Employee: " + model.EmployeeName + " " + model.EmployeeSurName;
            audit.AuditTrailDate = System.DateTime.Now;
            TimeSpan timeNow = DateTime.Now.TimeOfDay;
            audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();


            return Ok();
        }

        private string ComputeSha256Hash(string rawData)
        {
            // Create a SHA256   
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array  
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // Convert byte array to a string   
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

     //   [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("UpdateEmployee")] //route
        [HttpPut]
        //Update Employee
        public IActionResult UpdateEmployee(EmployeeModel model)
        {

            // var newUser = new User
            //{
            //    UserUsername = model.UserUsername,
            //    //UserPassword = ComputeSha256Hash(model.UserPassword),
            //    UserRoleId = 3,

            //};
            //_db.Users.Add(newUser);

            var employee = _db.Employees.Find(model.Employee_ID);
            employee.EmployeeName = model.EmployeeName; //attributes in table
            employee.EmployeeSurname = model.EmployeeSurName;
            employee.EmployeeAddressLine1 = model.EmployeeAddressLine1;
            employee.EmployeeAddressLine2 = model.EmployeeAddressLine2;
            employee.EmployeeCellphoneNumber = model.EmployeeCellphoneNumber;
            employee.EmployeeDob = model.EmployeeDOB.AddDays(1);
            employee.EmployeeIdnumber = model.EmployeeIDNumber;
            _db.Employees.Attach(employee); //Attach Record
            _db.SaveChanges();

            //add to audit trail
            var user = _db.Users.Find(model.UsersID);
            AuditTrail audit = new AuditTrail();
            audit.AuditTrailDescription = user.UserUsername + " updated the Employee: " + model.EmployeeName + " " + model.EmployeeSurName;
            audit.AuditTrailDate = System.DateTime.Now;
            TimeSpan timeNow = DateTime.Now.TimeOfDay;
            audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
            audit.UsersId = user.UsersId;
            _db.AuditTrails.Add(audit);
            _db.SaveChanges();

            return Ok(employee);
        }

        string response = "";
        //    [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("DeleteEmployee")] //route
        [HttpPost]
        //Delete Employee
        public IActionResult DeleteEmployee(EmployeeModel model)
        {
            try
            {
                var delemployee = _db.Employees.Find(model.Employee_ID);    //Delete Record
                var user = _db.Users.FirstOrDefault(zz => zz.UsersId == delemployee.UsersId);
                var pass = _db.PasswordHistories.Select(zz => zz.UsersId == delemployee.UsersId);
                var audit1 = _db.AuditTrails.Select(zz => zz.UsersId == delemployee.UsersId);
                _db.AuditTrails.Remove((AuditTrail)audit1);
                _db.PasswordHistories.Remove((PasswordHistory)pass);
                
               
                _db.Users.Remove(user);
                _db.Employees.Remove(delemployee);

                _db.SaveChanges();
                //add to audit trail
                var users = _db.Users.Find(model.UsersID);
                AuditTrail audit = new AuditTrail();
                audit.AuditTrailDescription = user.UserUsername + "deleted the Employee: " + model.EmployeeName + " " + model.EmployeeSurName;
                audit.AuditTrailDate = System.DateTime.Now;
                TimeSpan timeNow = DateTime.Now.TimeOfDay;
                audit.AuditTrailTime = new TimeSpan(timeNow.Hours, timeNow.Minutes, timeNow.Seconds);
                audit.UsersId = users.UsersId;
                _db.AuditTrails.Add(audit);
                _db.SaveChanges();
                return Ok(delemployee);
            }
            catch (Exception)
            {
                response = "Employee could not be deleted as they are assigned to system functions";
                return BadRequest(response);
                throw;
            }

           
        }
    }
}