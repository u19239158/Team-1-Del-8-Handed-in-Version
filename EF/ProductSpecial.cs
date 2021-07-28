using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class ProductSpecial
    {
        public int ProductSpecialId { get; set; }
        public int? SpecialId { get; set; }
        public int? ProductItemId { get; set; }
        public decimal? SpecialPrice { get; set; }

        public virtual ProductItem ProductItem { get; set; }
        public virtual Special Special { get; set; }
    }
}
