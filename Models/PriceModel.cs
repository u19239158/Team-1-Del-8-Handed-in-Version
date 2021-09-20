using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class PriceModel
    {
        [JsonProperty("priceid")]
        public int Price_ID
        { get; set; }

        [JsonProperty("pricedescription")]
        public decimal PriceDescription
        { get; set; }

        [JsonProperty("pricedate")]
        public DateTime PriceDate
        { get; set; }
    }
}
