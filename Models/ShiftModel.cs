using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class ShiftModel
    {
        [JsonProperty("shiftid")]
        public int ShiftId
        { get; set; }

        [JsonProperty("dateid")]
        public int DateId
        { get; set; }

        [JsonProperty("timeid")]
        public int TimeId
        { get; set; }
    }
}
