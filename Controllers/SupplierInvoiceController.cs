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

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSupplierInvoice")] //route
        [HttpGet]
        //get Supplier Invoice (Read)
        public IActionResult get()
        {
            //var SupplierInvoices = _db.SupplierInvoices.ToList();
            var SupplierInvoice = _db.SupplierInvoices.Join(_db.Suppliers,
               a => a.SupplierId,
               t => t.SupplierId,
               (a, t) => new
               {
                   SupplierID = a.SupplierId,
                   SupplierName = t.SupplierName,
                   SupplierInvoiceTotal = a.SupplierInvoiceTotal,
                   SupplierInvoiceDate = a.SupplierInvoiceDate,
                   SupplierInvoiceID = a.SupplierInvoiceId

               });
            return Ok(SupplierInvoice);

        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("GetSupplierInvoiceByID/{supplierinvoiceid}")] //route
        [HttpGet]
        //get SupplierInvoice by ID (Read)
        public IActionResult get(int supplierinvoiceid)
        {
            //var SupplierInvoices = _db.SupplierInvoices.Find(supplierinvoiceid);
            var SupplierInvoice = _db.SupplierInvoices.Join(_db.Suppliers,
              a => a.SupplierId,
              t => t.SupplierId,
              (a, t) => new
              {
                  SupplierID = a.SupplierId,
                  SupplierName = t.SupplierName,
                  SupplierInvoiceTotal = a.SupplierInvoiceTotal,
                  SupplierInvoiceDate = a.SupplierInvoiceDate,
                  SupplierInvoiceID = a.SupplierInvoiceId

              }).First(sa => sa.SupplierInvoiceID == supplierinvoiceid);

            return Ok(SupplierInvoice);
        }

        [Authorize(AuthenticationSchemes = "JwtBearer", Roles = "Admin")]
        [Route("CreateSupplierInvoice")] //route
        [HttpPost]
        //Add SupplierInvoice
        //Create a Model for table
        public IActionResult CreateSupplierInvoice(SupplierInvoiceModel model) //reference the model
        {
            SupplierInvoice invoice = new SupplierInvoice();
            invoice.SupplierInvoiceDate = model.SupplierInvoiceDate; //attributes in table
            invoice.SupplierInvoiceTotal = model.SupplierInvoiceTotal;
            invoice.SupplierId = model.SupplierId;
            _db.SupplierInvoices.Add(invoice);
            _db.SaveChanges();

            return Ok(invoice);
        }
    }
}