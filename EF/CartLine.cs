using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class CartLine
    {
        public int CartLineId { get; set; }
        public int? CartId { get; set; }
        public int? ProductItemId { get; set; }
        public int CartLineQuantity { get; set; }

        public virtual Cart Cart { get; set; }
        public virtual ProductItem ProductItem { get; set; }
    }
}
