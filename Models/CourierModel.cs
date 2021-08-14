using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class CourierModel
    {
        [JsonProperty("courierid")]
        public int CourierID
        { get; set; }

        [JsonProperty("couriername")]
        public string CourierName
        { get; set; }

        [JsonProperty("couriernumber")]
        public string CourierNumber
        { get; set; }

        [JsonProperty("courieremail")]
        public string CourierEmail
        { get; set; }

        [JsonProperty("couriertypeid")]
        public int CourierTypeID
        { get; set; }
    }
}
