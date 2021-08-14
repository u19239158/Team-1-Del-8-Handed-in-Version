using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Admin
    {
        public int AdminId { get; set; }
        public int? TitleId { get; set; }
        public string AdminName { get; set; }
        public string AdminSurname { get; set; }
        public string AdminCellphoneNumber { get; set; }
        public string AdminEmailAddress { get; set; }

        public virtual Title Title { get; set; }
    }
}
