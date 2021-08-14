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
    public class AdminController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public AdminController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetAdmin")] //route
        [HttpGet]
        //get Admin (Read)
        public IActionResult get()
        {
            //var Admins = _db.Admins.ToList();
           
            var Admins = _db.Admins.Join(_db.Titles,
                a => a.TitleId,
                t => t.TitleId,
                (a, t) => new
                {
                    TitleID = a.TitleId,
                    TitleDesc = t.TitleDescription,
                    AdminId = a.AdminId,
                    AdminName = a.AdminName,
                    AdminSurname = a.AdminSurname,
                    AdminCellphoneNumber = a.AdminCellphoneNumber,
                    AdminEmailAddress = a.AdminEmailAddress,

                });

            return Ok(Admins);

        }

        [Route("GetAdminByID/{adminid}")] //route
        [HttpGet]
        //get Admin by ID (Read)
        public IActionResult get(int adminid)
        {
            // var Admins = _db.Admins.Find(adminid);
            var Admins = _db.Admins.Join(_db.Titles,
                 a => a.TitleId,
                 t => t.TitleId,
                 (a, t) => new
                 {
                     TitleID = a.TitleId,
                     TitleDesc = t.TitleDescription,
                     AdminId = a.AdminId,
                     AdminName = a.AdminName,
                     AdminSurname = a.AdminSurname,
                     AdminCellphoneNumber = a.AdminCellphoneNumber,
                     AdminEmailAddress = a.AdminEmailAddress,

                 }).First(an => an.AdminId == adminid);

            return Ok(Admins);
        }

        [Route("GetAdminByName/{adminname}")] //route
        [HttpGet]
        //get Admin by Name (Read)
        public IActionResult get(string adminname)
        {
            //var Admins = _db.Admins.FirstOrDefault(ae => ae.AdminName == adminname);
            var Admins = _db.Admins.Join(_db.Titles,
               a => a.TitleId,
               t => t.TitleId,
               (a, t) => new
               {
                   TitleID = a.TitleId,
                   TitleDesc = t.TitleDescription,
                   AdminId = a.AdminId,
                   AdminName = a.AdminName,
                   AdminSurname = a.AdminSurname,
                   AdminCellphoneNumber = a.AdminCellphoneNumber,
                   AdminEmailAddress = a.AdminEmailAddress,

               }).Where(an => an.AdminName == adminname);

            return Ok(Admins);
        }

        [Route("getadminbysurname/{adminsurname}")] //route
        [HttpGet]
        //get admin by surname (read)
        public IActionResult Get(string adminsurname)
        {
            //var admins = _db.Admins.FirstOrDefault(ae => ae.AdminSurname == adminsurname);
            var Admins = _db.Admins.Join(_db.Titles,
                a => a.TitleId,
                t => t.TitleId,
                (a, t) => new
                {
                    TitleID = a.TitleId,
                    TitleDesc = t.TitleDescription,
                    AdminName = a.AdminName,
                    AdminId = a.AdminId,
                    AdminSurname = a.AdminSurname,
                    AdminCellphoneNumber = a.AdminCellphoneNumber,
                    AdminEmailAddress = a.AdminEmailAddress,

                }).Where(an => an.AdminSurname == adminsurname);

            return Ok(Admins);
        }


        [Route("CreateAdmin")] //route
        [HttpPost]
        //Add Admin
        //Create a Model for table
        public IActionResult CreateAdmin(AdminModel model) //reference the model
        {
            Admin admin = new Admin();
            admin.AdminName = model.AdminName; //attributes in table
            admin.AdminSurname = model.AdminSurName;
            admin.AdminEmailAddress = model.AdminEmailAddress;
            admin.AdminCellphoneNumber = model.AdminCellPhoneNumber;
            admin.TitleId = model.TitleID;
            _db.Admins.Add(admin);
            _db.SaveChanges();

            return Ok(admin);
        }

        [Route("UpdateAdmin")] //route
        [HttpPut]
        //Update Admin
        public IActionResult UpdateAdmin(AdminModel model)
        {
            var admin = _db.Admins.Find(model.AdminID);
            admin.AdminName = model.AdminName; //attributes in table
            admin.AdminSurname = model.AdminSurName;
            admin.AdminEmailAddress = model.AdminEmailAddress;
            admin.AdminCellphoneNumber = model.AdminCellPhoneNumber;
            admin.TitleId = model.TitleID;
            _db.Admins.Attach(admin); //Attach Record
            _db.SaveChanges();

            return Ok(admin);
        }

        [Route("DeleteAdmin/{adminid}")] //route
        [HttpDelete]
        //Delete Admin
        public IActionResult DeleteAdmin(int adminid)
        {
            var admin = _db.Admins.Find(adminid);
            _db.Admins.Remove(admin); //Delete Record
            _db.SaveChanges();

            return Ok(admin);
        }

    }
}