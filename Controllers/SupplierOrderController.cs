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
            var SupplierOrders = _db.SupplierOrders.Join(_db.Suppliers, 
                su => su.SupplierId,
                so => so.SupplierId,
            
                (su, so) => new
                {
                    SupplierOrderID = su.SupplierOrderId,
                    SupplierID = su.SupplierId,
                    SupplierName = so.SupplierName,
                    OrderDatePlaced = su.OrderDatePlaced, //attributes in table
                    OrderDateReceived = su.OrderDateReceived,
                    SupplierOrderTotal = su.SupplierOrderTotal,
                    SupplierOrderSubTotal = su.SupplierOrderTotal,
                    SupplierOrderVat = su.SupplierOrderVat,
                    SupplierOrderStatusId = su.SupplierOrderStatusId

                }).Join(_db.SupplierOrderStatuses,
                sor => sor.SupplierOrderStatusId, sd => sd.SupplierOrderStatusId,
                (sor,sd) => new
                {
                    SupplierOrderID = sor.SupplierOrderID,
                    Order_Status = sd.SupplierOrderStatusDesc,
                    SupplierName = sor.SupplierName,
                    OrderStatusID = sor.SupplierOrderStatusId,
                    SupplierID = sor.SupplierID,
                    OrderDatePlaced = sor.OrderDatePlaced,
                    OrderDateReceived = sor.OrderDateReceived,
                    SupplierOrderTotal = sor.SupplierOrderTotal,
                    SupplierOrderSubTotal = sor.SupplierOrderTotal,
                    SupplierOrderVat = sor.SupplierOrderVat

                });

            return Ok(SupplierOrders);


        }

        [Route("GetSupplierOrderByID/{supplierorderid}")] //route
        [HttpGet]
        //get SupplierOrder by ID (Read)
        public IActionResult get(int supplierorderid)
        {
            var SupplierOrders  = _db.SupplierOrders.Join(_db.Suppliers,
                su => su.SupplierId,
                so => so.SupplierId,

                (su, so) => new
                {
                    SupplierOrderID = su.SupplierOrderId,
                    SupplierID = su.SupplierId,
                    SupplierName = so.SupplierName,
                    OrderDatePlaced = su.OrderDatePlaced, //attributes in table
                    OrderDateReceived = su.OrderDateReceived,
                    SupplierOrderTotal = su.SupplierOrderTotal,
                    SupplierOrderSubTotal = su.SupplierOrderTotal,
                    SupplierOrderVat = su.SupplierOrderVat,
                    SupplierOrderStatusId = su.SupplierOrderStatusId

                }).Join(_db.SupplierOrderStatuses,
                sor => sor.SupplierOrderStatusId, sd => sd.SupplierOrderStatusId,
                (sor, sd) => new
                {
                    SupplierOrderID = sor.SupplierOrderID,
                    Order_Status = sd.SupplierOrderStatusDesc,
                    SupplierName = sor.SupplierName,
                    OrderStatusID = sor.SupplierOrderStatusId,
                    SupplierID = sor.SupplierID,
                    OrderDatePlaced = sor.OrderDatePlaced,
                    OrderDateReceived = sor.OrderDateReceived,
                    SupplierOrderTotal = sor.SupplierOrderTotal,
                    SupplierOrderSubTotal = sor.SupplierOrderTotal,
                    SupplierOrderVat = sor.SupplierOrderVat

                }).First(aa => aa.SupplierOrderID == supplierorderid);

            return Ok(SupplierOrders);
        }

        [Route("GetSupplierOrderByDatePlaced/{orderdateplaced}")] //route
        [HttpGet]
        //get SupplierOrder by Date Placed (Read)
        public IActionResult get(DateTime orderdateplaced)
        {
            var SupplierOrders = _db.SupplierOrders.Join(_db.Suppliers,
                su => su.SupplierId,
                so => so.SupplierId,

                (su, so) => new
                {
                    SupplierOrderID = su.SupplierOrderId,
                    SupplierID = su.SupplierId,
                    SupplierName = so.SupplierName,
                    OrderDatePlaced = su.OrderDatePlaced, //attributes in table
                    OrderDateReceived = su.OrderDateReceived,
                    SupplierOrderTotal = su.SupplierOrderTotal,
                    SupplierOrderSubTotal = su.SupplierOrderTotal,
                    SupplierOrderVat = su.SupplierOrderVat,
                    SupplierOrderStatusId = su.SupplierOrderStatusId

                }).Join(_db.SupplierOrderStatuses,
                sor => sor.SupplierOrderStatusId, sd => sd.SupplierOrderStatusId,
                (sor, sd) => new
                {
                    SupplierOrderID = sor.SupplierOrderID,
                    Order_Status = sd.SupplierOrderStatusDesc,
                    SupplierName = sor.SupplierName,
                    OrderStatusID = sor.SupplierOrderStatusId,
                    SupplierID = sor.SupplierID,
                    OrderDatePlaced = sor.OrderDatePlaced,
                    OrderDateReceived = sor.OrderDateReceived,
                    SupplierOrderTotal = sor.SupplierOrderTotal,
                    SupplierOrderSubTotal = sor.SupplierOrderTotal,
                    SupplierOrderVat = sor.SupplierOrderVat

                }).Where(aa => aa.OrderDatePlaced == orderdateplaced);

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
            supOrder.SupplierOrderStatusId = model.SupplierOrderStatusId;
            supOrder.SupplierId = model.SupplierID;
            _db.SupplierOrders.Add(supOrder);
            _db.SaveChanges();

            return Ok(supOrder);
        }

        [Route("DisplaySupplierOrder")] //route
        [HttpGet]
        //get Supplier Order (Read)
        public IActionResult Get()
        {
            var SupplierOrders = _db.SupplierOrders.Join(_db.SupplierOrderLines,
                su => su.SupplierOrderId,
                so => so.SupplierOrderId,

                (su, so) => new
                {

                    SupplierOrderId = su.SupplierOrderId,               
                    OrderDatePlaced = su.OrderDatePlaced, //attributes in table
                    SupplierOrderLineId = so.SupplierOrderLineId,
                    SupplierProducts = so.SupplierProducts

                });

            return Ok(SupplierOrders);
        }


        [Route("ReceiveInvoice")] //route
        [HttpPost]
        //Create a Model for table
        public IActionResult RecieveInvoice(SupplierOrderModel model) //reference the model
        {
            SupplierOrder suppOrder = _db.SupplierOrders.Find(model.SupplierOrderID);
            {
                model.OrderDateRecieved = (DateTime)suppOrder.OrderDateReceived;
              
            };

            _db.SupplierOrders.Attach(suppOrder);
            _db.SaveChanges();

            SupplierInvoice supInvoice = new SupplierInvoice
            {
                //attributes in table 
                SupplierInvoiceId = model.SupplierInvoiceID,
                SupplierInvoiceDate = model.SupplierInvoiceDate,
                SupplierInvoiceTotal = model.SupplierInvoiceTotal
            
            };
            _db.SupplierInvoices.Add(supInvoice);
            _db.SaveChanges();



            return Ok();
        }

        [Route("AddInvoiceLine")] //route
        [HttpPost]
        //Add Sales
        //Create a Model for table
        public IActionResult AddInvoiceLine(SupplierInvoiceLineModel model) //reference the model
        {

            SupplierInvoiceLine SIline = new SupplierInvoiceLine();
            SIline.SupplierInvoiceId = model.SupplierInvoiceId;
            SIline.SupplierItemName = model.SupplierItemName;
            SIline.QuantityReceived = model.QuantityRecieved;
            SIline.ProductItemId = model.ProductItemId;

            _db.SupplierInvoiceLines.Add(SIline);
            _db.SaveChanges();

            var NewPQuantity = _db.ProductItems.Find(model.ProductItemId);
            NewPQuantity.QuantityOnHand = NewPQuantity.QuantityOnHand + model.QuantityRecieved;
            _db.ProductItems.Attach(NewPQuantity);
            //Attach Record
            _db.SaveChanges();

            return Ok();
        }

        [Route("PlaceSupplierOrder")] //route
        [HttpPost]
        //Add SupplierOrder
        //Create a Model for table
        public IActionResult PlaceSupplierOrder(SupplierOrderModel model) //reference the model
        {
            SupplierOrder supOrder = new SupplierOrder();
            supOrder.OrderDatePlaced = model.OrderDatePlaced; //attributes in table
            //supOrder.OrderDateReceived = model.OrderDateRecieved;
            //supOrder.SupplierOrderTotal = model.SupplierOrderTotal;
            //supOrder.SupplierOrderSubTotal = model.SupplierOrderTotal;
            //supOrder.SupplierOrderVat = model.SupplierOrderVat;
            supOrder.SupplierOrderStatusId = 1;
            supOrder.SupplierId = model.SupplierID;
            _db.SupplierOrders.Add(supOrder);
            _db.SaveChanges();

            return Ok(supOrder);
        }


        [Route("SupplierOrderLine")] //route
        [HttpPost]
        //Add SupplierOrder
        //Create a Model for table
        public IActionResult SupplierOrderLine(SupplierOrderLineModel model) //reference the model
        {
            SupplierOrderLine Sline = new SupplierOrderLine();
            Sline.ProductItemId = model.ProductItemId;
            Sline.SupplierQuantityOrdered = model.SupplierQuantityOrdered;
            Sline.SupplierOrderId = model.SupplierOrderId;
            Sline.SupplierProducts = model.SupplierProducts;
            _db.SupplierOrderLines.Add(Sline);
            _db.SaveChanges();

            return Ok(Sline);
        }


    }
}