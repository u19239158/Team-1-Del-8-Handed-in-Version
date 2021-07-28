using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Discount
    {
        public int DiscountId { get; set; }
        public decimal? DiscountPercentage { get; set; }
    }
}
