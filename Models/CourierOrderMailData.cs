using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class CourierOrderMailData
    {
        public string RecipientBusinessName
        { get; set; }

        public string RecipientName
        { get; set; }

        public string RecipientContactNumber
        { get; set; }

        public string RecipientEmailAddress
        { get; set; }

        public string RecipientAddress
        { get; set; }

        public int RecipientPostalCode
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

        [JsonProperty("customerid")]
        public int CustomerID
        { get; set; }

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

        [JsonProperty("courieremail")]
        public string CourierEmail
        { get; set; }

    }

}
