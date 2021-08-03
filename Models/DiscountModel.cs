using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class DiscountModel
    {
        [JsonProperty("discountid")]
        public int Discount_ID
        { get; set; }


        [JsonProperty("discountpercentage")]
        public int Discount_Percentage
        { get; set; }
    }
}
