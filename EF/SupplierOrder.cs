using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class SupplierOrder
    {
        public SupplierOrder()
        {
            SupplierOrderLines = new HashSet<SupplierOrderLine>();
        }

        public int SupplierOrderId { get; set; }
        public int? SupplierOrderStatusId { get; set; }
        public int? SupplierId { get; set; }
        public DateTime OrderDatePlaced { get; set; }
        public DateTime? OrderDateReceived { get; set; }
        public decimal? SupplierOrderTotal { get; set; }
        public string SupplierTotalPdf { get; set; }

        public virtual Supplier Supplier { get; set; }
        public virtual SupplierOrderStatus SupplierOrderStatus { get; set; }
        public virtual ICollection<SupplierOrderLine> SupplierOrderLines { get; set; }
    }
}
