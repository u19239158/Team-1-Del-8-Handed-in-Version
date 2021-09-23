using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SupplierPaymentModel
    {
        [JsonProperty("supplierpaymentid")]
        public int SupplierPaymentId
        { get; set; }

        [JsonProperty("Supplieramount")]
        public decimal SupplierAmount
        { get; set; }

        [JsonProperty("Supplierpaymentdate")]
        public DateTime SupplierPaymentDate
        { get; set; }

        [JsonProperty("supplierid")]
        public int SupplierId
        { get; set; }

        [JsonProperty("usersid")]
        public int UsersID
        { get; set; }
    }
}

