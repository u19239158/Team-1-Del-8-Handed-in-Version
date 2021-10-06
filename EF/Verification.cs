using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Verification
    {
        public int VerificationId { get; set; }
        public int? UsersId { get; set; }
        public int Code { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CodeDate { get; set; }

        public virtual User Users { get; set; }
    }
}
