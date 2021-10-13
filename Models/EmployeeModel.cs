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

        [JsonProperty("employeeaddressline1")]
        public string EmployeeAddressLine1
        { get; set; }

        [JsonProperty("employeeaddressline2")]
        public string EmployeeAddressLine2
        { get; set; }

        [JsonProperty("employeedob")]
        public DateTime EmployeeDOB
        { get; set; }

        [JsonProperty("employeeidnumber")]
        public string EmployeeIDNumber
        { get; set; }

        [JsonProperty("usersid")]
        public int UsersID
        { get; set; }

        [JsonProperty("userusername")]
        public string UserUsername
        { get; set; }

        [JsonProperty("userpassword")]
        public string UserPassword
        { get; set; }

        [JsonProperty("userroleid")]
        public int UserRoleID
        { get; set; }

        [JsonProperty("adminid")]
        public int AdminID
        { get; set; }
    }
}
