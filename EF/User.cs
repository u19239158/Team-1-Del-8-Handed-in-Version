using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class User
    {
        public User()
        {
            AuditTrails = new HashSet<AuditTrail>();
            PasswordHistories = new HashSet<PasswordHistory>();
        }

        public int UsersId { get; set; }
        public int? UserRoleId { get; set; }
        public string UserUsername { get; set; }
        public string UserPassword { get; set; }

        public virtual UserRole UserRole { get; set; }
        public virtual ICollection<AuditTrail> AuditTrails { get; set; }
        public virtual ICollection<PasswordHistory> PasswordHistories { get; set; }
    }
}
