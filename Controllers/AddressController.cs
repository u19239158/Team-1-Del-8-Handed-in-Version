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
    public class AddressController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public AddressController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetAddress")] //route
        [HttpGet]
        //get Address (Read)
        public IActionResult get()
        {
            var Addresses = _db.Addresses.ToList();
            return Ok(Addresses);

        }

        [Route("GetAddressByID/{addressid}")] //route
        [HttpGet]
        //get Address by ID (Read)
        public IActionResult get(int addressid)
        {
            var Address = _db.Addresses.Find(addressid);
            return Ok(Address);
        }

        [Route("GetAddressByCustID/{CustomerId}")] //route
        [HttpGet]
        //get Address by ID (Read)
        public IActionResult GetAddressByCustID(int CustomerId)
        {
            var Address = _db.Addresses.Join(_db.Provinces,
                su => su.ProvinceId,
                so => so.ProvinceId,

                (su, so) => new
                {
                    AddressId = su.AddressId,
                    CustomerId = su.CustomerId,
                    AddressLine1 = su.AddressLine1,
                    AddressLine2 = su.AddressLine2,
                    AddressPostalCode = su.AddressPostalCode,
                    ProvinceDescription = so.ProvinceDescription,
                }).

                    FirstOrDefault(SS => SS.CustomerId == CustomerId);
            if (Address != null)
            {
           
                return Ok(Address);
            }
            else
            {
                return Ok("Address not found");
            }
           
        }

        [Route("CreateAddress")] //route
        [HttpPost]
        //Add Address
        //Create a Model for table
        public IActionResult CreateAddress(AddressModel model) //reference the model
        {
            Address address = new Address();
            address.AddressLine1 = model.AddressLine1; //attributes in table
            address.AddressLine2 = model.AddressLine2;
        
            address.AddressPostalCode = Convert.ToInt32(model.AddressPostalCode);
            _db.Addresses.Add(address);
            _db.SaveChanges();

            return Ok(address);
        }

        [Route("UpdateAddress")] //route
        [HttpPut]
        //Update Address
        public IActionResult UpdateAddress(AddressModel model)
        {
            var address = _db.Addresses.Find(model.AddressID);
            address.AddressLine1 = model.AddressLine1; //attributes in table
            address.AddressLine2 = model.AddressLine2;
            
            address.AddressPostalCode = Convert.ToInt32(model.AddressPostalCode);
            _db.Addresses.Attach(address); //Attach Record
            _db.SaveChanges();

            return Ok(address);
        }
        string response = "";
        [Route("DeleteAddress/{addressid}")] //route
        [HttpDelete]
        //Delete Address
        public IActionResult DeleteAddress(int addressid)
        {
            
            try
            {
                var address = _db.Addresses.Find(addressid);
                _db.Addresses.Remove(address); //Delete Record
                _db.SaveChanges();
                return Ok(address);
            }
            catch (Exception)
            {
                response = "Could not be deleted";
                return BadRequest(response);
                throw;
            }
           

            
        }

    }
}