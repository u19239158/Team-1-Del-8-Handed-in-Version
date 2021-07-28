using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class SaleLine
    {
        public int SaleLineId { get; set; }
        public int? SaleId { get; set; }
        public int? ProductItemId { get; set; }
        public int SaleLineQuantity { get; set; }

        public virtual ProductItem ProductItem { get; set; }
        public virtual Sale Sale { get; set; }
    }
}
