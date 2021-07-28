using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Title
    {
        public Title()
        {
            Admins = new HashSet<Admin>();
            Customers = new HashSet<Customer>();
        }

        public int TitleId { get; set; }
        public string TitleDescription { get; set; }

        public virtual ICollection<Admin> Admins { get; set; }
        public virtual ICollection<Customer> Customers { get; set; }
    }
}
