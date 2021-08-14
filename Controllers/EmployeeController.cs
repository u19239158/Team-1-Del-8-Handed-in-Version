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
    public class EmployeeController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db

        public EmployeeController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Route("GetEmployee")] //route
        [HttpGet]
        //get Employee (Read)
        public IActionResult get()
        {
            var Employees = _db.Employees.ToList();
            return Ok(Employees);

        }

        [Route("GetEmployeeByName/{employeeid}")] //route
        [HttpGet]
        //get Employee by name (Read)
        public IActionResult get(int employeid)
        {
            var Employees = _db.Employees.FirstOrDefault(en => en.EmployeeId == employeid);
            return Ok(Employees);
        }


        [Route("GetEmployeeByName/{employeename}")] //route
        [HttpGet]
        //get Employee by name (Read)
        public IActionResult get(string employeename)
        {
            var Employees = _db.Employees.FirstOrDefault(en => en.EmployeeName == employeename);
            return Ok(Employees);
        }

        [Route("GetEmployeeBySurname/{employeesurname}")] //route
        [HttpGet]
        //get Employee by name (Read)
        public IActionResult Get(string employeesurname)
        {
            var Employees = _db.Employees.FirstOrDefault(es => es.EmployeeSurname == employeesurname);
            return Ok(Employees);
        }

        [Route("CreateEmployee")] //route
        [HttpPost]
        //Add Employee
        //Create a Model for table
        public IActionResult CreateEmployee(EmployeeModel model) //reference the model
        {
            Employee employee = new Employee();
            employee.EmployeeName = model.EmployeeName; //attributes in table
            employee.EmployeeSurname = model.EmployeeSurName;
            employee.EmployeeAddressLine1 = model.EmployeeAddressLine1;
            employee.EmployeeAddressLine2 = model.EmployeeAddressLine2;
            employee.EmployeeDob = model.EmployeeDOB;
            employee.EmployeeIdnumber = (model.EmployeeIDNumber);
            _db.Employees.Add(employee);
            _db.SaveChanges();

            return Ok(employee);
        }

        [Route("UpdateEmployee")] //route
        [HttpPut]
        //Update Employee
        public IActionResult UpdateEmployee(EmployeeModel model)
        {
            var employee = _db.Employees.Find(model.Employee_ID);
            employee.EmployeeName = model.EmployeeName; //attributes in table
            employee.EmployeeSurname = model.EmployeeSurName;
            employee.EmployeeAddressLine1 = model.EmployeeAddressLine1;
            employee.EmployeeAddressLine2 = model.EmployeeAddressLine2;
            employee.EmployeeDob = model.EmployeeDOB;
            employee.EmployeeIdnumber = model.EmployeeIDNumber;
            _db.Employees.Attach(employee); //Attach Record
            _db.SaveChanges();

            return Ok(employee);
        }

        [Route("DeleteEmployee/{employeeid}")] //route
        [HttpDelete]
        //Delete Employee
        public IActionResult DeleteEmployee(int employeeid)
        {
            var delemployee = _db.Employees.Find(employeeid);
            _db.Employees.Remove(delemployee); //Delete Record
            _db.SaveChanges();

            return Ok(delemployee);
        }
    }
}