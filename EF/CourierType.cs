using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class CourierType
    {
        public CourierType()
        {
            Couriers = new HashSet<Courier>();
        }

        public int CourierTypeId { get; set; }
        public string CourierTypeDescription { get; set; }

        public virtual ICollection<Courier> Couriers { get; set; }
    }
}
