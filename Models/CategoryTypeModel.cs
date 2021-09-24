using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class CategoryTypeModel
    {
        [JsonProperty("categorytypeid")]
        public int CategoryTypeID
        { get; set; }

        [JsonProperty("categorytypedescription")]
        public string CategoryTypeDescription
        { get; set; }

        [JsonProperty("productcategoryid")]
        public int ProductCategoryID
        { get; set; }

        [JsonProperty("categorytypeimage")]
        public string CategoryTypeImage
        { get; set; }

        [JsonProperty("itemdescription")]
        public string ItemDescription
        { get; set; }

        [JsonProperty("userusername")]
        public string UserUsername
        { get; set; }

        [JsonProperty("usersid")]
        public int UsersID
        { get; set; }
    }
}
