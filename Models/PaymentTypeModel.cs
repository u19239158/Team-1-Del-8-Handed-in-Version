using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class PaymentTypeModel
    {
        [JsonProperty("paymenttypeid")]
        public int PaymentType_ID
        { get; set; }

        [JsonProperty("pricedescription")]
        public string PriceDescription
        { get; set; }
    }
}
