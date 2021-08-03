using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SupplierOrderModel
    {
        [JsonProperty("supplierorderid")]
        public int SupplierOrderID
        { get; set; }

        [JsonProperty("orderdateplaced")]
        public DateTime OrderDatePlaced
        { get; set; }

        [JsonProperty("orderdaterecieved")]
        public DateTime OrderDateRecieved
        { get; set; }

        [JsonProperty("supplierordertotal")]
        public decimal SupplierOrderTotal
        { get; set; }

        [JsonProperty("supplierordersubtotal")]
        public decimal SupplierOrderSubTotal
        { get; set; }

        [JsonProperty("supplierorderVat")]
        public decimal SupplierOrderVat
        { get; set; }
    }
}
