using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class MarkupModel
    {
        [JsonProperty("markupid")]
        public int Markup_ID
        { get; set; }

        [JsonProperty("markuppercentage")]
        public int Markup_Percentage
        { get; set; }
    }
}
