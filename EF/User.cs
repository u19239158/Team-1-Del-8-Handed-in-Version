using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class User
    {
        public User()
        {
            Admins = new HashSet<Admin>();
            AuditTrails = new HashSet<AuditTrail>();
            Customers = new HashSet<Customer>();
            Employees = new HashSet<Employee>();
            PasswordHistories = new HashSet<PasswordHistory>();
            Verifications = new HashSet<Verification>();
        }

        public int UsersId { get; set; }
        public int? UserRoleId { get; set; }
        public string UserUsername { get; set; }
        public string UserPassword { get; set; }

        public virtual UserRole UserRole { get; set; }
        public virtual ICollection<Admin> Admins { get; set; }
        public virtual ICollection<AuditTrail> AuditTrails { get; set; }
        public virtual ICollection<Customer> Customers { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<PasswordHistory> PasswordHistories { get; set; }
        public virtual ICollection<Verification> Verifications { get; set; }
    }
}
