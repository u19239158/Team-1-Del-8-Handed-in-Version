using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class SupplierOrderStatus
    {
        public SupplierOrderStatus()
        {
            SupplierOrders = new HashSet<SupplierOrder>();
        }

        public int SupplierOrderStatusId { get; set; }
        public string SupplierOrderStatusDesc { get; set; }

        public virtual ICollection<SupplierOrder> SupplierOrders { get; set; }
    }
}
