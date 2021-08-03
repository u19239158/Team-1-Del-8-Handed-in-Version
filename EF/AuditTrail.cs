using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class AuditTrail
    {
        public int AuditTrailId { get; set; }
        public int? UsersId { get; set; }
        public string AuditTrailDescription { get; set; }
        public DateTime AuditTrailDate { get; set; }
        public TimeSpan AuditTrailTime { get; set; }

        public virtual Users User { get; set; }
    }
}
