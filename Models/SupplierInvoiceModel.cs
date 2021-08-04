using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SupplierInvoiceModel
    {
        [JsonProperty("supplierinvoiceid")]
        public int SupplierInvoiceID
        { get; set; }

        [JsonProperty("supplierinvoicedate")]
        public DateTime SupplierInvoiceDate
        { get; set; }

        [JsonProperty("supplierinvoicetotal")]
        public decimal SupplierInvoiceTotal
        { get; set; }

        [JsonProperty("supplierid")]
        public int SupplierId
        { get; set; }
    }
}
