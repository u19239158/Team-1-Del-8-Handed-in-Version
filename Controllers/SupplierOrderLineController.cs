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
    public class SupplierOrderLineController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public SupplierOrderLineController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetSupplierOrderLine")] //route
        [HttpGet]
        //get Supplier OrderLine (Read)
        public IActionResult get()
        {
            var SupplierOrderLines = _db.SupplierOrderLines.Join(_db.SupplierOrders,
                 su => su.SupplierOrderId,
                 so => so.SupplierOrderId,

                 (su, so) => new
                 {
                     SupplierOrderId = su.SupplierOrderId,
                     SupplierOrderLineID = su.SupplierOrderLineId,
                     SupplierProducts = su.SupplierProducts,
                     SupplierQuantityOrdered = su.SupplierQuantityOrdered,
                     SupplierOrderLineCost = su.SupplierOrderLineCost,
              
                     ProductItemID = su.ProductItemId

                     //attributes in table
                 }).Join(_db.ProductItems,
                 sor => sor.ProductItemID,
                 sd => sd.ProductItemId,
                 (sor, sd) => new
                 {
                     SupplierOrderID = sor.SupplierOrderId,
                     SupplierOrderLineID = sor.SupplierOrderLineID,
                     SupplierProducts = sor.SupplierProducts,
                     SupplierQuantityOrdered = sor.SupplierQuantityOrdered,
                     SupplierOrderLineCost = sor.SupplierOrderLineCost,
                     ProductItemID = sor.ProductItemID,


                     ProductItemName = sd.ProductItemName

                 });

            return Ok(SupplierOrderLines);

        }

        [Route("GetSupplierOrderLineByOrderID/{supplierorderid}")] //route
        [HttpGet]
        //get Supplier OrderLine (Read)
        public IActionResult get(int supplierorderid)
        {
            var SupplierOrderLines = _db.SupplierOrderLines.Join(_db.SupplierOrders,
                 su => su.SupplierOrderId,
                 so => so.SupplierOrderId,

                 (su, so) => new
                 {
                     SupplierOrderId = su.SupplierOrderId,
                     SupplierOrderLineID = su.SupplierOrderLineId,
                     SupplierProducts = su.SupplierProducts,
                     SupplierQuantityOrdered = su.SupplierQuantityOrdered,
                     SupplierOrderLineCost = su.SupplierOrderLineCost,

                     ProductItemID = su.ProductItemId

                     //attributes in table
                 }).Join(_db.ProductItems,
                 sor => sor.ProductItemID,
                 sd => sd.ProductItemId,
                 (sor, sd) => new
                 {
                     SupplierOrderID = sor.SupplierOrderId,
                     SupplierOrderLineID = sor.SupplierOrderLineID,
                     SupplierProducts = sor.SupplierProducts,
                     SupplierQuantityOrdered = sor.SupplierQuantityOrdered,
                     SupplierOrderLineCost = sor.SupplierOrderLineCost,
                     ProductItemID = sor.ProductItemID,

                     ProductItemName = sd.ProductItemName

                 }).Where(ss => ss.SupplierOrderID == supplierorderid);

            return Ok(SupplierOrderLines);

        }

        [Route("CreateSupplierOrderLine")] //route
        [HttpPost]
        //Add SupplierOrderLine
        //Create a Model for table
        public IActionResult CreateSupplierOrderLine(SupplierOrderLineModel model) //reference the model
        {
            SupplierOrderLine orderline = new SupplierOrderLine();
            orderline.SupplierProducts = model.SupplierProducts;
            orderline.SupplierQuantityOrdered = model.SupplierQuantityOrdered;
            orderline.SupplierOrderLineCost = model.SupplierOrderLineCost;  //attributes in table
            orderline.SupplierOrderId = model.SupplierOrderId;
            orderline.ProductItemId = model.ProductItemId;
            _db.SupplierOrderLines.Add(orderline);
            _db.SaveChanges();

            return Ok(orderline);
        }
    }
}