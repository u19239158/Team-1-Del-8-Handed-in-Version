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
    public class SupplierInvoiceLineController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public SupplierInvoiceLineController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        [Route("GetSupplierInvoiceLine")] //route
        [HttpGet]
        //get Supplier Invoice (Read)
        public IActionResult get()
        {
            //var SupplierInvoiceLines = _db.SupplierInvoiceLines.ToList();
            var SupplierInvoiceLine = _db.SupplierInvoiceLines.Join(_db.ProductItems,
                su => su.ProductItemId,
                so => so.ProductItemId,

                (su, so) => new
                {
                    ProductItemID = su.ProductItemId,
                    SupplierItemName = su.SupplierItemName,
                    QuantityRecieved = su.QuantityReceived,
                    LineItemCost = su.LineItemCost,
                    SupplierInvoiceId = su.SupplierInvoiceId
                }).Join(_db.SupplierInvoices,
                sor => sor.SupplierInvoiceId,
                sd => sd.SupplierInvoiceId,
                (sor, sd) => new
                {
                    ProductItemID = sor.ProductItemID,
                    SupplierItemName = sor.SupplierItemName,
                    QuantityRecieved = sor.QuantityRecieved,
                    LineItemCost = sor.LineItemCost,
                    SupplierInvoiceID = sor.SupplierInvoiceId,

                });
            return Ok(SupplierInvoiceLine);

        }

        [Route("CreateSupplierInvoiceLine")] //route
        [HttpPost]
        //Add SupplierInvoiceLine
        //Create a Model for table
        public IActionResult CreateSupplierInvoiceLine(SupplierInvoiceLineModel model) //reference the model
        {
            SupplierInvoiceLine invoiceline = new SupplierInvoiceLine();
            invoiceline.SupplierItemName = model.SupplierItemName;  //attributes in table
            invoiceline.LineItemCost = model.LineItemCost;
            invoiceline.QuantityReceived = model.QuantityRecieved;
            invoiceline.ProductItemId = model.ProductItemId;
            invoiceline.SupplierInvoiceId = model.SupplierInvoiceId;
            _db.SupplierInvoiceLines.Add(invoiceline);
            _db.SaveChanges();

            return Ok(invoiceline);
        }
    }
}