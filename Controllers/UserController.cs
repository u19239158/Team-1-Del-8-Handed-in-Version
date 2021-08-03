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
    public class UserController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public UserController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetUser")] //route
        [HttpGet]
        //get User (Read)
        public IActionResult get()
        {
            var Users = _db.Users.ToList();
            return Ok(Users);

        }

        [Route("GetUserByID/{userid}")] //route
        [HttpGet]
        //get User by ID (Read)
        public IActionResult get(int userid)
        {
            var Users = _db.Users.Find(userid);
            return Ok(Users);
        }

        [Route("CreateUser")] //route
        [HttpPost]
        //Add User
        //Create a Model for table
        public IActionResult CreateUser(UserModel model) //reference the model
        {
            Users user = new Users();
            user.UserUsername = model.UserUsername;
            user.UserPassword = model.UserPassword; //attributes in table
            _db.Users.Add(user);
            _db.SaveChanges();

            return Ok(user);
        }

        [Route("UpdateUser")] //route
        [HttpPost]
        //Update Order Status
        public IActionResult UpdateUser(UserModel model)
        {
            var user = _db.Users.Find(model.UsersID);
            user.UserUsername = model.UserUsername;
            user.UserPassword = model.UserPassword;
            _db.Users.Attach(user); //Attach Record
            _db.SaveChanges();

            return Ok(user);
        }

        [Route("DeleteUser/{userid}")] //route
        [HttpDelete]
        //Delete Order Status
        public IActionResult DeleteUser(int userid)
        {
            var user = _db.Users.Find(userid);
            _db.Users.Remove(user); //Delete Record
            _db.SaveChanges();

            return Ok(user);
        }
    }
}