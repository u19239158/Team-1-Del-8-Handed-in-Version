using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class SupplierInvoiceLine
    {
        public int SupplierInvoiceLineId { get; set; }
        public int? SupplierInvoiceId { get; set; }
        public int? ProductItemId { get; set; }
        public string SupplierItemName { get; set; }
        public int QuantityReceived { get; set; }

        public virtual ProductItem ProductItem { get; set; }
        public virtual SupplierInvoice SupplierInvoice { get; set; }
    }
}
