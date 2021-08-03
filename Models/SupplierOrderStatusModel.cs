using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SupplierOrderStatusModel
    {
        [JsonProperty("supplierorderstatusID")]
        public int SupplierOrderStatusID
        { get; set; }

        [JsonProperty("supplierorderstatusdesc")]
        public string SupplierOrderStatusDesc
        { get; set; }
    }
}
