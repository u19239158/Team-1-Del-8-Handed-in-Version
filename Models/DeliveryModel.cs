﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class DeliveryModel
    {
        [JsonProperty("deliveryid")]
        public int DeliveryId
        { get; set; }


        [JsonProperty("deliverydate")]
        public DateTime Delivery_Date
        { get; set; }


        [JsonProperty("couriertrackingnumber")]
        public string Courier_TrackingNumber
        { get; set; }


        [JsonProperty("deliverydistance")]
        public string Delivery_Distance
        { get; set; }

        [JsonProperty("addressid")]
        public int AddressId
        { get; set; }

        [JsonProperty("courierid")]
        public int CourierId
        { get; set; }

        [JsonProperty("saleid")]
        public int SaleId
        { get; set; }
    }
}
