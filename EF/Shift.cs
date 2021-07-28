using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Shift
    {
        public Shift()
        {
            EmployeeShifts = new HashSet<EmployeeShift>();
        }

        public int ShiftId { get; set; }
        public int? DateId { get; set; }
        public int? TimeId { get; set; }

        public virtual Date Date { get; set; }
        public virtual Time Time { get; set; }
        public virtual ICollection<EmployeeShift> EmployeeShifts { get; set; }
    }
}
