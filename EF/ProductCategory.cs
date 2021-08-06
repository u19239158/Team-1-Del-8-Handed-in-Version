using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class ProductCategory
    {
        public ProductCategory()
        {
            CategoryTypes = new HashSet<CategoryType>();
        }

        public int ProductCategoryId { get; set; }
        public string ProductCategoryDescription { get; set; }
        public string ProductCategoryImage { get; set; }

        public virtual ICollection<CategoryType> CategoryTypes { get; set; }
    }
}
