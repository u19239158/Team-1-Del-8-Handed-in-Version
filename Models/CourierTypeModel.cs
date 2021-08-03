using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class CourierTypeModel
    {
        [JsonProperty("couriertypeid")]
        public int CourierTypeID
        { get; set; }

        [JsonProperty("couriertypedescription")]
        public string CourierTypeDescription
        { get; set; }


    }
}
