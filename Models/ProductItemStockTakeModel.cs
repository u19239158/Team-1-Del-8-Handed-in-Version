using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class ProductItemStockTakeModel
    {
        [JsonProperty("productitemstocktakeid")]
        public int ProductItemStockTakeID
        { get; set; }

        [JsonProperty("StockTakequantity")]
        public int StockTakeQuantity
        { get; set; }
    }
}
