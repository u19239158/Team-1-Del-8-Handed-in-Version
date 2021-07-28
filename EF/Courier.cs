using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Courier
    {
        public Courier()
        {
            Deliveries = new HashSet<Delivery>();
        }

        public int CourierId { get; set; }
        public int? CourierTypeId { get; set; }
        public string CourierName { get; set; }
        public int CourierNumber { get; set; }
        public string CourierEmail { get; set; }

        public virtual CourierType CourierType { get; set; }
        public virtual ICollection<Delivery> Deliveries { get; set; }
    }
}
