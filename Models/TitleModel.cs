using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class TitleModel
    {
        [JsonProperty("titleid")]
        public int TitleID
        { get; set; }

        [JsonProperty("titledescription")]
        public string TitleDescription
        { get; set; }
    }
}
