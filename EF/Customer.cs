using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Customer
    {
        public Customer()
        {
            Addresses = new HashSet<Address>();
        }

        public int CustomerId { get; set; }
        public int? TitleId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerSurname { get; set; }
        public int CustomerCellphoneNumber { get; set; }
        public string CustomerEmailAddress { get; set; }
        public string CustomerBusinessName { get; set; }
        public string CustomerVatreg { get; set; }

        public virtual Title Title { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
    }
}
