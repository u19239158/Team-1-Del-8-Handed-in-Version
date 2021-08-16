using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class ProductItemWrittenOffStockModel
    {
        [JsonProperty("productItemwrittenoffstockid")]
        public int ProductItemWrittenOffStockId
        { get; set; }

        [JsonProperty("WriteOffreason")]
        public string WriteOffReason
        { get; set; }

        [JsonProperty("WriteOffquantity")]
        public int WriteOffQuantity
        { get; set; }

        [JsonProperty("writtenoffstockdate")]
        public DateTime WrittenOffStock_Date
        { get; set; }

        [JsonProperty("productItemid")]
        public int ProductItemId
        { get; set; }

        [JsonProperty("writtenoffstockid")]
        public int WrittenOffStockId
        { get; set; }

       
    }
}
