using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class PasswordHistory
    {
        public int PasswordHistoryId { get; set; }
        public int? UserId { get; set; }
        public string PasswordHistoryText { get; set; }
        public DateTime PasswordHistoryDate { get; set; }

        public virtual User User { get; set; }
    }
}
