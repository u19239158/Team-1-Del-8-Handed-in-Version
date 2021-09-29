using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class RegisterModel
    {
        [JsonProperty("usersid")]
        public int UsersID
        { get; set; }

        [JsonProperty("userusername")]
        public string UserUsername
        { get; set; }

        [JsonProperty("userpassword")]
        public string UserPassword
        { get; set; }

        [JsonProperty("customerid")]
        public int CustomerID
        { get; set; }

        [JsonProperty("customername")]
        public string CustomerName
        { get; set; }

        [JsonProperty("customersurname")]
        public string CustomerSurname
        { get; set; }

        [JsonProperty("customercellphonenumber")]
        public string CustomerCellphoneNumber
        { get; set; }

        [JsonProperty("customeremailaddress")]
        public string CustomerEmailAddress
        { get; set; }

        [JsonProperty("customerbusinessname")]
        public string CustomerBusinessName
        { get; set; }

        [JsonProperty("customervatreg")]
        public string CustomerVatReg
        { get; set; }

        [JsonProperty("titleid")]
        public int TitleID
        { get; set; }

        [JsonProperty("userroleid")]
        public int UserRoleID
        { get; set; }

        [JsonProperty("userroledescription")]
        public string UserRoleDescription
        { get; set; }

        [JsonProperty("userrolename")]
        public string UserRoleName
        { get; set; }

        [JsonProperty("audittrailid")]
        public int AuditTrailId
        { get; set; }

        [JsonProperty("passwordhistoryid")]
        public int PasswordHistoryId
        { get; set; }

        [JsonProperty("passwordhistorytext")]
        public string PasswordHistoryText
        { get; set; }

        [JsonProperty("passwordhistorydate")]
        public DateTime PasswordHistoryDate
        { get; set; }

        [JsonProperty("token")]
        public string token
        { get; set; }

        [JsonProperty("otp")]
        public int otp
        { get; set; }
    }
}
