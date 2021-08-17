using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class ReportModel
    {
        [JsonProperty("saleid")]
        public int SaleID
        { get; set; }

        [JsonProperty("SaleOrderdescription")]
        public string SaleOrderDescription
        { get; set; }

        [JsonProperty("SaleOrderdate")]
        public DateTime SaleOrderDate
        { get; set; }

        [JsonProperty("SaleOrderassign")]
        public bool SaleOrderAssign
        { get; set; }

        [JsonProperty("SaleOrderRecievetype")]
        public bool SaleOrderRecieveType
        { get; set; }

        [JsonProperty("Paymentdate")]
        public DateTime PaymentDate
        { get; set; }

        [JsonProperty("orderstatusid")]
        public int OrderStatusId
        { get; set; }

        [JsonProperty("orderstatusdescription")]
        public string OrderStatusDescription
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

        [JsonProperty("provinceid")]
        public int ProvinceID
        { get; set; }

        [JsonProperty("cityid")]
        public int CityID
        { get; set; }

        [JsonProperty("citydescription")]
        public int CityDescription
        { get; set; }

        [JsonProperty("provincedescription")]
        public int ProvinceDescription
        { get; set; }
    }
}
