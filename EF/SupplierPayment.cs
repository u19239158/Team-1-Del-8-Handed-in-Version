using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class SupplierPayment
    {
        public int SupplierPaymentId { get; set; }
        public int? SupplierId { get; set; }
        public decimal? SupplierAmount { get; set; }

        public virtual Supplier Supplier { get; set; }
    }
}
