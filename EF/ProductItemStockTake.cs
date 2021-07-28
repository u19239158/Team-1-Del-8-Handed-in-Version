using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class ProductItemStockTake
    {
        public int ProductItemStockTakeId { get; set; }
        public int? StockTakeId { get; set; }
        public int? ProductItemId { get; set; }
        public int StockTakeQuantity { get; set; }

        public virtual ProductItem ProductItem { get; set; }
        public virtual StockTake StockTake { get; set; }
    }
}
