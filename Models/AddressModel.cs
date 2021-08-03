using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class AddressModel
    {
        [JsonProperty("addressid")]
        public int AddressID
        { get; set; }

        [JsonProperty("addressline1")]
        public string AddressLine1
        { get; set; }

        [JsonProperty("addressline2")]
        public string AddressLine2
        { get; set; }

        [JsonProperty("addressline3")]
        public string AddressLine3
        { get; set; }

        [JsonProperty("addresspostalcode")]
        public int AddressPostalCode
        { get; set; }

    }
}
