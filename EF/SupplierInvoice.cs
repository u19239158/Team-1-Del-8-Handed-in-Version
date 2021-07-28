using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class SupplierInvoice
    {
        public SupplierInvoice()
        {
            SupplierInvoiceLines = new HashSet<SupplierInvoiceLine>();
        }

        public int SupplierInvoiceId { get; set; }
        public int? SupplierId { get; set; }
        public DateTime SupplierInvoiceDate { get; set; }
        public decimal? SupplierInvoiceTotal { get; set; }

        public virtual Supplier Supplier { get; set; }
        public virtual ICollection<SupplierInvoiceLine> SupplierInvoiceLines { get; set; }
    }
}
