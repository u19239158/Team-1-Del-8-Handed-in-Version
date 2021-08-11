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
    public class UserRoleController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public UserRoleController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetUserRole")] //route
        [HttpGet]
        //get User Role (Read)
        public IActionResult get()
        {
            var UserRoles = _db.UserRoles.ToList();
            return Ok(UserRoles);

        }

        [Route("GetUserRoleByID/{userroleid}")] //route
        [HttpGet]
        //get UserRole by ID (Read)
        public IActionResult get(int userroleid)
        {
            var UserRoles = _db.UserRoles.Find(userroleid);
            return Ok(UserRoles);
        }

        [Route("GetUserRoleByName/{userrolename}")] //route
        [HttpGet]
        //get UserRole by Name (Read)
        public IActionResult get(string userrolename)
        {
            var UserRoles = _db.UserRoles.FirstOrDefault(un => un.UserRoleName == userrolename);
            return Ok(UserRoles);
        }


        [Route("CreateUserRole")] //route
        [HttpPost]
        //Add UserRole
        //Create a Model for table
        public IActionResult CreateUserRole(UserRoleModel model) //reference the model
        {
            UserRole userrole = new UserRole();
            userrole.UserRoleName = model.UserRoleName;
            userrole.UserRoleDescription = model.UserRoleDescription; //attributes in table
            _db.UserRoles.Add(userrole);
            _db.SaveChanges();

            return Ok(userrole);
        }

        [Route("UpdateUserRole")] //route
        [HttpPut]
        //Update UserRole
        public IActionResult UpdateUserRole(UserRoleModel model)
        
        {
            var userrole = _db.UserRoles.Find(model.UserRoleID);
            userrole.UserRoleName = model.UserRoleName;
            userrole.UserRoleDescription = model.UserRoleDescription;
            _db.UserRoles.Attach(userrole); //Attach Record
            _db.SaveChanges();

            return Ok(userrole);
        }

        [Route("DeleteUserRole/{userroleid}")] //route
        [HttpDelete]
        //Delete UserRole
        public IActionResult DeleteUserRole(int userroleid)
        {
            var userrole = _db.UserRoles.Find(userroleid);
            _db.UserRoles.Remove(userrole); //Delete Record
            _db.SaveChanges();

            return Ok(userrole);
        }
    }
}