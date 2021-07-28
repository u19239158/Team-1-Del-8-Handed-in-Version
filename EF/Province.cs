﻿using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Province
    {
        public Province()
        {
            Addresses = new HashSet<Address>();
            Cities = new HashSet<City>();
        }

        public int ProvinceId { get; set; }
        public string ProvinceDescription { get; set; }

        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<City> Cities { get; set; }
    }
}
