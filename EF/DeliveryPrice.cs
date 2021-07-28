using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class DeliveryPrice
    {
        public int DeliveryPriceId { get; set; }
        public int DeliveryDistance { get; set; }
        public decimal? DeliveryPrice1 { get; set; }
        public DateTime DeliveryDate { get; set; }
    }
}
