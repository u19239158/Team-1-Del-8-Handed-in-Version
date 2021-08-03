using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class DeliveryPriceModel
    {
        [JsonProperty("deliverypriceid")]
        public int DeliveryPriceID
        { get; set; }


        [JsonProperty("deliverydistance")]
        public int Delivery_Distance
        { get; set; }


        [JsonProperty("deliverydate")]
        public DateTime Delivery_Date
        { get; set; }


        [JsonProperty("deliveryprice")]
        public int Delivery_Price
        { get; set; }
    }
}
