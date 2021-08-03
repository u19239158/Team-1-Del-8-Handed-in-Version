using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NKAP_API_2.Models
{
    public class OrderStatusModel
    {
        [JsonProperty("orderstatusid")]
        public int OrderStatusID
        { get; set; }

        [JsonProperty("orderstatusdescription")]
        public string OrderStatusDescription
        { get; set; }
    }
}
