using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class UserRole
    {
        public UserRole()
        {
            Users = new HashSet<User>();
        }

        public int UserRoleId { get; set; }
        public string UserRoleDescription { get; set; }
        public string UserRoleName { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
