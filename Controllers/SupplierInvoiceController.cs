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
    public class SupplierInvoiceController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public SupplierInvoiceController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }
        [Route("GetSupplierInvoice")] //route
        [HttpGet]
        //get Supplier Invoice (Read)
        public IActionResult get()
        {
            var SupplierInvoices = _db.SupplierInvoices.ToList();
            return Ok(SupplierInvoices);

        }

        [Route("GetSupplierInvoiceByID/{supplierinvoiceid}")] //route
        [HttpGet]
        //get SupplierInvoice by ID (Read)
        public IActionResult get(int supplierinvoiceid)
        {
            var SupplierInvoices = _db.SupplierInvoices.Find(supplierinvoiceid);
            return Ok(SupplierInvoices);
        }

        [Route("CreateSupplierInvoice")] //route
        [HttpPost]
        //Add SupplierInvoice
        //Create a Model for table
        public IActionResult CreateSupplierInvoice(SupplierInvoiceModel model) //reference the model
        {
            SupplierInvoice invoice = new SupplierInvoice();
            invoice.SupplierInvoiceDate = model.SupplierInvoiceDate; //attributes in table
            invoice.SupplierInvoiceTotal = model.SupplierInvoiceTotal;
            _db.SupplierInvoices.Add(invoice);
            _db.SaveChanges();

            return Ok(invoice);
        }
    }
}