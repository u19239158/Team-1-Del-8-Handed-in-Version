﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class ProductItemModel
    {
        [JsonProperty("productitemid")]
        public int ProductItemId
        { get; set; }

        [JsonProperty("ProductItemname")]
        public string ProductItemName
        { get; set; }


        [JsonProperty("ProductItemcost")]
        public decimal ProductItemCost
        { get; set; }

        [JsonProperty("QuantityOnhand")]
        public int QuantityOnHand
        { get; set; }

        [JsonProperty ("categorytypeid")]
        public int CategoryTypeID
        { get; set; }
    }
}