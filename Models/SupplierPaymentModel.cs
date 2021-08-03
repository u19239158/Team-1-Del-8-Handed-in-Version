using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SupplierPaymentModel
    {
        [JsonProperty("supplieramountid")]
        public int SupplierAmountID
        { get; set; }

        [JsonProperty("Supplieramount")]
        public decimal SupplierAmount
        { get; set; }
    }
}
