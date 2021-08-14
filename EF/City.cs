using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class City
    {
        public int CityId { get; set; }
        public int? ProvinceId { get; set; }
        public string CityDescription { get; set; }

        public virtual Province Province { get; set; }
    }
}
