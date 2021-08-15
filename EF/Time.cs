using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Time
    {
        public Time()
        {
            Shifts = new HashSet<Shift>();
        }

        public int TimeId { get; set; }
        public Time StartTime { get; set; }
        public Time EndTime { get; set; }

        public virtual ICollection<Shift> Shifts { get; set; }
    }
}
