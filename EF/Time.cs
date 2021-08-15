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
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public virtual ICollection<Shift> Shifts { get; set; }
    }
}
