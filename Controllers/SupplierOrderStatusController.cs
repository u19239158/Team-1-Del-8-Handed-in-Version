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
    public class SupplierOrderStatusController : ControllerBase
    {
            private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
            public SupplierOrderStatusController(NKAP_BOLTING_DB_4Context db)
            { _db = db; }
            [Route("GetSupplierOrderStatus")] //route
            [HttpGet]
            //get Supplier Order Statuses (Read)
            public IActionResult get()
            {
                var supplierOrderStatuses = _db.SupplierOrderStatuses.ToList();
                return Ok(supplierOrderStatuses);

            }

            [Route("GetSupplierOrderStatusByID/{supplierorderstatusID}")] //route
            [HttpGet]
            //get Supplier Order Statuses by ID (Read)
            public IActionResult get(int supplierorderstatusID)
            {
                var supplierOrderStatus = _db.SupplierOrderStatuses.Find(supplierorderstatusID);
                return Ok(supplierOrderStatus);
            }

            [Route("GetSupplierOrderStatusByDesc/{supplierorderstatusdesc}")] //route
            [HttpGet]
            //get Supplier Order Statuses by description (Read)
            public IActionResult get(string supplierorderstatusdesc)
            {
                var supplierOrderStatus = _db.SupplierOrderStatuses.FirstOrDefault(sd => sd.SupplierOrderStatusDesc == supplierorderstatusdesc);
                return Ok(supplierOrderStatus);
            }


            [Route("CreateSupplierOrderStatus")] //route
            [HttpPost]
            //Add Supplier Order Status
            //Create a Model for table
            public IActionResult CreateSupplierOrderStatus(SupplierOrderStatusModel model) //reference the model
            {
                SupplierOrderStatus supplierOrderStatus = new SupplierOrderStatus();
                supplierOrderStatus.SupplierOrderStatusDesc = model.SupplierOrderStatusDesc; //attributes in table
                _db.SupplierOrderStatuses.Add(supplierOrderStatus);
                _db.SaveChanges();

                return Ok(supplierOrderStatus);
            }

            [Route("DeleteSupplierOrderStatus/{supplierorderstatusID}")] //route
            [HttpDelete]
            //Delete Supplier Order Status
            public IActionResult DeleteSupplierOrderStatus(int supplierorderstatusID)
            {
                var supplierOrderStatus = _db.SupplierOrderStatuses.Find(supplierorderstatusID);
                _db.SupplierOrderStatuses.Remove(supplierOrderStatus); //Delete Record
                _db.SaveChanges();

                return Ok(supplierOrderStatus);
            }
    }
}