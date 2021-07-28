using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class SupplierType
    {
        public SupplierType()
        {
            Suppliers = new HashSet<Supplier>();
        }

        public int SupplierTypeId { get; set; }
        public string SupplierTypeDesc { get; set; }

        public virtual ICollection<Supplier> Suppliers { get; set; }
    }
}
