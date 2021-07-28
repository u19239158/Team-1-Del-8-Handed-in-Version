using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class ProductItemWrittenOffStock
    {
        public int ProductItemWrittenOffStockId { get; set; }
        public int? WrittenOffStockId { get; set; }
        public int? ProductItemId { get; set; }
        public string WriteOffReason { get; set; }
        public int WriteOffQuantity { get; set; }

        public virtual ProductItem ProductItem { get; set; }
        public virtual WrittenOffStock WrittenOffStock { get; set; }
    }
}
