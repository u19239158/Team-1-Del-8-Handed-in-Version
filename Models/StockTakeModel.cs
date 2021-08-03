using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class StockTakeModel
    {
        [JsonProperty("stocktakeid")]
        public int StockTakeID
        { get; set; }

        [JsonProperty("stocktakedate")]
        public DateTime StockTakeDate
        { get; set; }
    }

}
