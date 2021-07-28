using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class OrderStatus
    {
        public OrderStatus()
        {
            Sales = new HashSet<Sale>();
        }

        public int OrderStatusId { get; set; }
        public string OrderStatusDescription { get; set; }

        public virtual ICollection<Sale> Sales { get; set; }
    }
}
