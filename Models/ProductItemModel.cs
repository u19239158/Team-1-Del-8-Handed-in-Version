using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class ProductItemModel
    {
        [JsonProperty("productitemid")]
        public int ProductItemId
        { get; set; }

        [JsonProperty("ProductItemname")]
        public string ProductItemName
        { get; set; }


        [JsonProperty("ProductItemcost")]
        public decimal ProductItemCost
        { get; set; }

        [JsonProperty("QuantityOnhand")]
        public int QuantityOnHand
        { get; set; }

        [JsonProperty ("categorytypeid")]
        public int CategoryTypeID
        { get; set; }

        [JsonProperty("markupID")]
        public int MarkupId
        { get; set; }

        [JsonProperty("priceID")]
        public int PriceId
        { get; set; }

        [JsonProperty("Specialprice")]
        public decimal SpecialPrice
        { get; set; }

        [JsonProperty("productspecialid")]
        public int ProductSpecialID
        { get; set; }

        [JsonProperty("categorytypedescription")]
        public string CategoryTypeDescription
        { get; set; }

        [JsonProperty("itemdescription")]
        public string ItemDescription
        { get; set; }

        [JsonProperty("pricedescription")]
        public decimal PriceDescription
        { get; set; }

        [JsonProperty("categorytypeimage")]
        public string CategoryTypeImage
        { get; set; }

        [JsonProperty("userusername")]
        public string UserUsername
        { get; set; }

        [JsonProperty("usersid")]
        public int UsersID
        { get; set; }

        [JsonProperty("VATInc")]
        public decimal VATInc
        { get; set; }

        [JsonProperty("VATAmount")]
        public decimal VATAmount
        { get; set; }
    }
}
