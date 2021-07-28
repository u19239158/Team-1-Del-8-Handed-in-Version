using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class StockTake
    {
        public StockTake()
        {
            ProductItemStockTakes = new HashSet<ProductItemStockTake>();
        }

        public int StockTakeId { get; set; }
        public DateTime StockTakeDate { get; set; }

        public virtual ICollection<ProductItemStockTake> ProductItemStockTakes { get; set; }
    }
}
