using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Date
    {
        public Date()
        {
            Shifts = new HashSet<Shift>();
        }

        public int DateId { get; set; }
        public DateTime DayOfTheWeek { get; set; }

        public virtual ICollection<Shift> Shifts { get; set; }
    }
}
