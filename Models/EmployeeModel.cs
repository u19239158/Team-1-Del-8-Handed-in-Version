using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class EmployeeModel
    {
        [JsonProperty("employeeid")]
        public int Employee_ID
        { get; set; }

        [JsonProperty("employeename")]
        public string EmployeeName
        { get; set; }

        [JsonProperty("employeesurname")]
        public string EmployeeSurName
        { get; set; }

        [JsonProperty("employeecellphonenumber")]
        public string EmployeeCellphoneNumber
        { get; set; }

        [JsonProperty("employeaddressline1")]
        public string EmployeeAddressLine1
        { get; set; }

        [JsonProperty("employeaddressline2")]
        public string EmployeeAddressLine2
        { get; set; }

        [JsonProperty("employeedob")]
        public DateTime EmployeeDOB
        { get; set; }

        [JsonProperty("employeeidnumber")]
        public string EmployeeIDNumber
        { get; set; }
    }
}
