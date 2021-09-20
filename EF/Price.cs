using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Price
    {
        public int PriceId { get; set; }
        public int? ProductItemId { get; set; }
        public decimal PriceDescription { get; set; }
        public DateTime PriceDate { get; set; }

        public virtual ProductItem ProductItem { get; set; }
    }
}
