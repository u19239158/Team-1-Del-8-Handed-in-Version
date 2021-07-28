using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Address
    {
        public Address()
        {
            Deliveries = new HashSet<Delivery>();
        }

        public int AddressId { get; set; }
        public int? CustomerId { get; set; }
        public int? ProvinceId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string AddressLine3 { get; set; }
        public int AddressPostalCode { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Province Province { get; set; }
        public virtual ICollection<Delivery> Deliveries { get; set; }
    }
}
