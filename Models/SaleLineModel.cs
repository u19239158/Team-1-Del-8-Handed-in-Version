using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SaleLineModel
    {
        [JsonProperty("salelineid")]
        public int SaleLineID
        { get; set; }

        [JsonProperty("SaleLinequantity")]
        public int SaleLineQuantity
        { get; set; }

        [JsonProperty("productitemid")]
        public int ProductItemID
        { get; set; }

        [JsonProperty("saleid")]
        public int SaleID
        { get; set; }
    }
}
