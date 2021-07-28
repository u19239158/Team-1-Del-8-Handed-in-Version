using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class PaymentType
    {
        public PaymentType()
        {
            Sales = new HashSet<Sale>();
        }

        public int PaymentTypeId { get; set; }
        public string PaymentTypeDescription { get; set; }

        public virtual ICollection<Sale> Sales { get; set; }
    }
}
