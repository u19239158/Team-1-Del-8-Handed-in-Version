using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Suburb
    {
        public int SuburbId { get; set; }
        public int? CityId { get; set; }
        public string SuburbDescription { get; set; }

        public virtual City City { get; set; }
    }
}
