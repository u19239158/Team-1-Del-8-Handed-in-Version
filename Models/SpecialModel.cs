using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SpecialModel
    {
        [JsonProperty("specialid")]
        public int SpecialID
        { get; set; }

        [JsonProperty("Specialdescription")]
        public string SpecialDescription
        { get; set; }

        [JsonProperty("Specialimage")]
        public byte SpecialImage
        { get; set; }

        [JsonProperty("SpecialStartdate")]
        public DateTime SpecialStartDate
        { get; set; }

        [JsonProperty("SpecialEnddate")]
        public DateTime SpecialEndDate
        { get; set; }

        [JsonProperty("productspecialid")]
        public int ProductSpecialID
        { get; set; }
    }

}
