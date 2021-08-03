using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class CustomerModel
    {
      
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
        public int CustomerCellphoneNumber
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

    }

}
