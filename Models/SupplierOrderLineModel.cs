using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SupplierOrderLineModel
    {
        [JsonProperty("supplierorderlineid")]
        public int SupplierOrderLineID
        { get; set; }

        [JsonProperty("supplierproducts")]
        public string SupplierProducts
        { get; set; }

        [JsonProperty("supplierquantityordered")]
        public int SupplierQuantityOrdered
        { get; set; }

        [JsonProperty("supplierorderlinecost")]
        public decimal SupplierOrderLineCost
        { get; set; }

        [JsonProperty("productitemid")]
        public int ProductItemId
        { get; set; }


        [JsonProperty("supplierorderid")]
        public int SupplierOrderId
        { get; set; }

    }
}
