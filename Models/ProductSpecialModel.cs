using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class ProductSpecialModel
    {
        [JsonProperty("productspecialid")]
        public int ProductSpecialId
        { get; set; }

        [JsonProperty("Specialprice")]
        public decimal SpecialPrice
        { get; set; }

        [JsonProperty("specialid")]
        public int SpecialID
        { get; set; }
    }
}
