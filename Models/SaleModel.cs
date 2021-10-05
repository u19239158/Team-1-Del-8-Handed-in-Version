using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NKAP_API_2.EF;

namespace NKAP_API_2.Models
{
    public class SaleModel
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

        [JsonProperty("Paymentamount")]
        public decimal PaymentAmount
        { get; set; }

        [JsonProperty("Paymentdate")]
        public DateTime PaymentDate
        { get; set; }

        [JsonProperty("orderstatusid")]
        public int OrderStatusId
        { get; set; }

        [JsonProperty("paymenttypeid")]
        public int PaymentTypeId
        { get; set; }

        [JsonProperty("startdate")]
        public DateTime StartDate
        { get; set; }

        [JsonProperty("enddate")]
        public DateTime EndDate
        { get; set; }

        [JsonProperty("orderstatusdescription")]
        public string OrderStatusDescription
        { get; set; }


        [JsonProperty("customerid")]
        public int CustomerID
        { get; set; }

        [JsonProperty("productitemid")]
        public int ProductItemId
        { get; set; }

        [JsonProperty("ProductItemname")]
        public string ProductItemName
        { get; set; }

        [JsonProperty("salelineid")]
        public int SaleLineID
        { get; set; }

        [JsonProperty("SaleLinequantity")]
        public int SaleLineQuantity
        { get; set; }

        [JsonProperty("deliverydistance")]
        public string DeliveryDistance
        { get; set; }

        [JsonProperty("addressid")]
        public int AddressId
        { get; set; }

        [JsonProperty("userusername")]
        public string UserUsername
        { get; set; }

        [JsonProperty("usersid")]
        public int UsersID
        { get; set; }

        [JsonProperty("saleLists")]
        public List<SaleList> saleLists = new List<SaleList>();
       
    }
}
