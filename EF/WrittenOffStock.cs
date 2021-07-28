using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class WrittenOffStock
    {
        public WrittenOffStock()
        {
            ProductItemWrittenOffStocks = new HashSet<ProductItemWrittenOffStock>();
        }

        public int WrittenOffStockId { get; set; }
        public DateTime WrittenOffStockDate { get; set; }

        public virtual ICollection<ProductItemWrittenOffStock> ProductItemWrittenOffStocks { get; set; }
    }
}
