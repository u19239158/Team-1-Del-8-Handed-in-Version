using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SupplierTypeModel
    {
        [JsonProperty("suppliertypeid")]
        public int SupplierType_ID
        { get; set; }

        [JsonProperty("suppliertypedescription")]
        public string SupplierType_Description
        { get; set; }
    }
}
