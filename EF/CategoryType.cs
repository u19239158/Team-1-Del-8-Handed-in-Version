using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class CategoryType
    {
        public CategoryType()
        {
            ProductItems = new HashSet<ProductItem>();
        }

        public int CategoryTypeId { get; set; }
        public int? ProductCategoryId { get; set; }
        public string CategoryTypeDescription { get; set; }
        public string CategoryTypeImage { get; set; }
        public string ItemDescription { get; set; }

        public virtual ProductCategory ProductCategory { get; set; }
        public virtual ICollection<ProductItem> ProductItems { get; set; }
    }
}
