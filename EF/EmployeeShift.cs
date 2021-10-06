using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class EmployeeShift
    {
        public EmployeeShift()
        {
            Deliveries = new HashSet<Delivery>();
        }

        public int EmployeeShiftId { get; set; }
        public int? EmployeeId { get; set; }
        public int? ShiftId { get; set; }
        public int? NoOfDeliveries { get; set; }
        public bool ShiftFull { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Shift Shift { get; set; }
        public virtual ICollection<Delivery> Deliveries { get; set; }
    }
}
