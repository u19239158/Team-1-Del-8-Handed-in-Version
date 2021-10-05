using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class SupplierOrderLine
    {
        public int SupplierOrderLineId { get; set; }
        public int? SupplierOrderId { get; set; }
        public int? ProductItemId { get; set; }
        public string SupplierProducts { get; set; }
        public int SupplierQuantityOrdered { get; set; }

        public virtual ProductItem ProductItem { get; set; }
        public virtual SupplierOrder SupplierOrder { get; set; }
    }
}
