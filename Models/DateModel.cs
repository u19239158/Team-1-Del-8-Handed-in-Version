using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
namespace NKAP_API_2.Models
{
    public class DateModel
    {
        [JsonProperty("dateid")]
        public int DateID
        { get; set; }

        [JsonProperty("dayoftheweek")]
        public DateTime DayOfTheWeek
        { get; set; }
    }
}
