using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SupplierInvoiceLineModel
    {
        [JsonProperty("supplierinvoicelineid")]
        public int SupplierInvoiceLineID
        { get; set; }

        [JsonProperty("supplieritemname")]
        public string SupplierItemName
        { get; set; }

        [JsonProperty("quantityrecieved")]
        public int QuantityRecieved
        { get; set; }

        [JsonProperty("lineitemcost")]
        public decimal LineItemCost
        { get; set; }


        [JsonProperty("productitemid")]
        public int ProductItemId
        { get; set; }

        [JsonProperty("supplierinvoiceid")]
        public int SupplierInvoiceId
        { get; set; }
    }
}
