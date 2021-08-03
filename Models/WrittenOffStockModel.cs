using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class WrittenOffStockModel
    {
        [JsonProperty("writtenoffstockid")]
        public int WrittenOffStock_ID
        { get; set; }

        [JsonProperty("writtenoffstockdate")]
        public DateTime WrittenOffStock_Date
        { get; set; }
    }
}
