using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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
                (sor, sd) => new
                {
                    SupplierOrderID = sor.SupplierOrderID,
                    SupplierOrderStatusDesc = sd.SupplierOrderStatusDesc,
                    SupplierName = sor.SupplierName,
                    SupplierOrderStatusId = sor.SupplierOrderStatusId,
                    SupplierID = sor.SupplierID,
                    OrderDatePlaced = sor.OrderDatePlaced,
                    OrderDateReceived = sor.OrderDateReceived,
                    SupplierOrderTotal = sor.SupplierOrderTotal,
                    SupplierOrderSubTotal = sor.SupplierOrderTotal,
                    SupplierOrderVat = sor.SupplierOrderVat

                });
                //.Join(_db.SupplierOrderLines,
                //sor => sor.SupplierOrderID,
                //sd => sd.SupplierOrderId,
                //(sor, sd) => new
                //{
                //    SupplierOrderID = sor.SupplierOrderID,
                //    SupplierOrderStatusDesc = sor.SupplierOrderStatusDesc,
                //    SupplierName = sor.SupplierName,
                //    SupplierOrderStatusId = sor.SupplierOrderStatusId,
                //    SupplierID = sor.SupplierID,
                //    OrderDatePlaced = sor.OrderDatePlaced,
                //    OrderDateReceived = sor.OrderDateReceived,
                //    SupplierOrderTotal = sor.SupplierOrderTotal,
                //    SupplierOrderSubTotal = sor.SupplierOrderSubTotal,
                //    SupplierOrderVat = sor.SupplierOrderVat,
                //    SupplierProducts = sd.SupplierProducts,
                //    SupplierQuantityOrdered = sd.SupplierQuantityOrdered,
                //    SupplierOrderLineCost = sd.SupplierOrderLineCost,
                //    ProductItemId = sd.ProductItemId

                //});

            return Ok(SupplierOrders);


        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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
                sor => sor.SupplierOrderStatusId,
                sd => sd.SupplierOrderStatusId,
                (sor, sd) => new
                {
                    SupplierOrderID = sor.SupplierOrderID,
                    SupplierOrderStatusDesc = sd.SupplierOrderStatusDesc,
                    SupplierName = sor.SupplierName,
                    SupplierOrderStatusId = sor.SupplierOrderStatusId,
                    SupplierID = sor.SupplierID,
                    OrderDatePlaced = sor.OrderDatePlaced,
                    OrderDateReceived = sor.OrderDateReceived,
                    SupplierOrderTotal = sor.SupplierOrderTotal,
                    SupplierOrderSubTotal = sor.SupplierOrderSubTotal,
                    SupplierOrderVat = sor.SupplierOrderVat

                }).Join(_db.SupplierOrderLines,
                sor => sor.SupplierOrderID,
                sd => sd.SupplierOrderId,
                (sor, sd) => new
                {
                    SupplierOrderID = sor.SupplierOrderID,
                    SupplierOrderStatusDesc = sor.SupplierOrderStatusDesc,
                    SupplierName = sor.SupplierName,
                    SupplierOrderStatusId = sor.SupplierOrderStatusId,
                    SupplierID = sor.SupplierID,
                    OrderDatePlaced = sor.OrderDatePlaced,
                    OrderDateReceived = sor.OrderDateReceived,
                    SupplierOrderTotal = sor.SupplierOrderTotal,
                    SupplierOrderSubTotal = sor.SupplierOrderSubTotal,
                    SupplierOrderVat = sor.SupplierOrderVat,
                    SupplierProducts = sd.SupplierProducts,
                    SupplierQuantityOrdered = sd.SupplierQuantityOrdered,
                    SupplierOrderLineCost = sd.SupplierOrderLineCost,
                    ProductItemId = sd.ProductItemId

                }).Where(aa => aa.SupplierOrderID == supplierorderid);

            return Ok(SupplierOrders);
        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("ReceiveInvoice")] //route
        [HttpPost]
        //Create a Model for table
        public IActionResult RecieveInvoice(SupplierOrderModel model) //reference the model
        {

            SupplierOrder suppOrder = _db.SupplierOrders.Find(model.SupplierOrderID);
            {
              suppOrder.OrderDateReceived = System.DateTime.Now;
                suppOrder.SupplierOrderTotal = model.SupplierInvoiceTotal;
                suppOrder.SupplierOrderStatusId = 2;
            };

            _db.SupplierOrders.Attach(suppOrder);
            _db.SaveChanges();

            SupplierInvoice supInvoice = new SupplierInvoice
            {
                //attributes in table 
                SupplierInvoiceDate = System.DateTime.Now,
                SupplierInvoiceTotal = model.SupplierInvoiceTotal,
                //SupplierInvoicePDF = model.SupplierInvoicePDF,
                SupplierId = model.SupplierID,
            
            };
            _db.SupplierInvoices.Add(supInvoice);
            _db.SaveChanges();

            foreach (var item in model.InvoiceLineList)
            {
                SupplierInvoiceLine SIline = new SupplierInvoiceLine();
                SIline.SupplierInvoiceId = supInvoice.SupplierInvoiceId;
                SIline.SupplierItemName = item.name;
                SIline.QuantityReceived = item.quantity;
                SIline.ProductItemId = item.id;

                _db.SupplierInvoiceLines.Add(SIline);
                _db.SaveChanges();

                var NewPQuantity = _db.ProductItems.Find(item.id);
                NewPQuantity.QuantityOnHand = NewPQuantity.QuantityOnHand + item.quantity;
                _db.ProductItems.Attach(NewPQuantity);
                //Attach Record
                _db.SaveChanges();

            }


            return Ok();
        }


      
        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("PlaceSupplierOrder")] //route
        [HttpPost]
        //Add SupplierOrder
        //Create a Model for table
        public IActionResult PlaceSupplierOrder(SupplierOrderModel model) //reference the model
        {
            SupplierOrder supOrder = new SupplierOrder();
            {
                supOrder.OrderDatePlaced = System.DateTime.Now; //attributes in table
                supOrder.SupplierOrderStatusId = 1;
                supOrder.SupplierId = model.SupplierID;
                _db.SupplierOrders.Add(supOrder);
                _db.SaveChanges();
            }
            foreach(var item in model.itemsOrdered)
            {
                SupplierOrderLine supline = new SupplierOrderLine();

                {
                    supline.ProductItemId = item.id;
                    supline.SupplierOrderId = supOrder.SupplierOrderId;
                    supline.SupplierProducts = item.name;
                    supline.SupplierQuantityOrdered = item.quantity;
                    _db.SupplierOrderLines.Add(supline);
                    _db.SaveChanges();
                }
            }

          

            return Ok(supOrder);
        }

        //[Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
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