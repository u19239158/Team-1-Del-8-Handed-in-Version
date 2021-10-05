using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Special
    {
        public Special()
        {
            ProductSpecials = new HashSet<ProductSpecial>();
        }

        public int SpecialId { get; set; }
        public DateTime SpecialStartDate { get; set; }
        public DateTime SpecialEndDate { get; set; }
        public string SpecialDescription { get; set; }

        public virtual ICollection<ProductSpecial> ProductSpecials { get; set; }
    }
}
