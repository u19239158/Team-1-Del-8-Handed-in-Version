using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NKAP_API_2.Models
{
    public class OrderStatusModel
    {
        [JsonProperty("id")]
        public int ID
        { get; set; }

        [JsonProperty("orderstatus")]
        public string OrderStatus
        { get; set; }
    }
}
