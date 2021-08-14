using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SupplierModel
    {
        [JsonProperty("supplierid")]
        public int SupplierID
        { get; set; }

        [JsonProperty("suppliername")]
        public string SupplierName
        { get; set; }

        [JsonProperty("suppliernumber")]
        public string SupplierNumber
        { get; set; }

        [JsonProperty("supplieremail")]
        public string SupplierEmail
        { get; set; }

        [JsonProperty("supplierlocation")]
        public string SupplierLocation
        { get; set; }

        [JsonProperty("supplieraddressline1")]
        public string SupplierAddressLine1
        { get; set; }

        [JsonProperty("supplieraddressline2")]
        public string SupplierAddressLine2
        { get; set; }

        [JsonProperty("supplieraddressline3")]
        public string SupplierAddressLine3
        { get; set; }

        [JsonProperty("suppliercitytown")]
        public string SupplierCityTown
        { get; set; }

        [JsonProperty("supplierpostalcode")]
        public int SupplierPostalCode
        { get; set; }

        [JsonProperty("supplierbalance")]
        public decimal SupplierBalance
        { get; set; }

        [JsonProperty("suppliertypeid")]
        public int SupplierTypeID
        { get; set; }


    }
}
