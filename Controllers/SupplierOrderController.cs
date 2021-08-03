using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.VisualStudio.Web.CodeGeneration;
using NKAP_API_2.EF;
using NKAP_API_2.Models;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierOrderController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public SupplierOrderController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetSupplierOrder")] //route
        [HttpGet]
        //get Supplier Order (Read)
        public IActionResult get()
        {
            var SupplierOrders = _db.SupplierOrders.ToList();
            return Ok(SupplierOrders);

        }

        [Route("GetSupplierOrderByID/{supplierorderid}")] //route
        [HttpGet]
        //get SupplierOrder by ID (Read)
        public IActionResult get(int supplierorderid)
        {
            var SupplierOrders = _db.SupplierOrders.Find(supplierorderid);
            return Ok(SupplierOrders);
        }

        [Route("GetSupplierOrderByDatePlaced/{orderdateplaced}")] //route
        [HttpGet]
        //get SupplierOrder by Date Placed (Read)
        public IActionResult get(DateTime orderdateplaced)
        {
            var SupplierOrders = _db.SupplierOrders.FirstOrDefault(so => so.OrderDatePlaced ==orderdateplaced);
            return Ok(SupplierOrders);
        }

        [Route("CreateSupplierOrder")] //route
        [HttpPost]
        //Add SupplierOrder
        //Create a Model for table
        public IActionResult CreateSupplierOrder(SupplierOrderModel model) //reference the model
        {
            SupplierOrder supOrder = new SupplierOrder();
            supOrder.OrderDatePlaced = model.OrderDatePlaced; //attributes in table
            supOrder.OrderDateReceived = model.OrderDateRecieved;
            supOrder.SupplierOrderTotal = model.SupplierOrderTotal;
            supOrder.SupplierOrderSubTotal = model.SupplierOrderTotal;
            supOrder.SupplierOrderVat = model.SupplierOrderVat;
            _db.SupplierOrders.Add(supOrder);
            _db.SaveChanges();

            return Ok(supOrder);
        }

    }
}