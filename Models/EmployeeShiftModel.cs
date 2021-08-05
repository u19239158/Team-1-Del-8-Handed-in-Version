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
        public int EmployeeShiftId
        { get; set; }

        [JsonProperty("noofdeliveries")]
        public string NoOfDeliveries
        { get; set; }

        [JsonProperty("shiftfull")]
        public bool ShiftFull
        { get; set; }

        [JsonProperty("employeeid")]
        public int EmployeeId
        { get; set; }

        [JsonProperty("deliveryid")]
        public int DeliveryId
        { get; set; }

        [JsonProperty("shiftid")]
        public int ShiftId
        { get; set; }
    }
}
