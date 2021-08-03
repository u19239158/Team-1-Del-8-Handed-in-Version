using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class EmployeeShiftModel
    {
        [JsonProperty("employeeshiftid")]
        public int EmployeeShift_ID
        { get; set; }

        [JsonProperty("noofdeliveries")]
        public string No_Of_Deliveries
        { get; set; }

        [JsonProperty("shiftfull")]
        public bool Shift_Full
        { get; set; }
    }
}
