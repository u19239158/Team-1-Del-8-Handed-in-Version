using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SaleModel
    {
        [JsonProperty("saleid")]
        public int SaleID
        { get; set; }

        [JsonProperty("SaleOrderdescription")]
        public string SaleOrderDescription
        { get; set; }

        [JsonProperty("SaleOrderdate")]
        public DateTime SaleOrderDate
        { get; set; }

        [JsonProperty("SaleOrderassign")]
        public bool SaleOrderAssign
        { get; set; }

        [JsonProperty("SaleOrderRecievetype")]
        public bool SaleOrderRecieveType
        { get; set; }

        [JsonProperty("Paymentamount")]
        public decimal PaymentAmount
        { get; set; }

        [JsonProperty("Paymentdate")]
        public DateTime PaymentDate
        { get; set; }

    }
}
