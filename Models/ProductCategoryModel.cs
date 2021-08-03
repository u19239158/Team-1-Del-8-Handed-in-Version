using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class ProductCategoryModel
    {
        [JsonProperty("productcategoryid")]
        public int ProductCategoryID
        { get; set; }

        [JsonProperty("ProductCategoryDescription")]
        public string ProductCategoryDesc
        { get; set; }
    }
}
