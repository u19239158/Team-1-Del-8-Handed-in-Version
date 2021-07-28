using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Employee
    {
        public Employee()
        {
            EmployeeShifts = new HashSet<EmployeeShift>();
            Sales = new HashSet<Sale>();
        }

        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeSurname { get; set; }
        public int EmployeeCellphoneNumber { get; set; }
        public string EmployeeAddressLine1 { get; set; }
        public string EmployeeAddressLine2 { get; set; }
        public DateTime EmployeeDob { get; set; }
        public int EmployeeIdnumber { get; set; }

        public virtual ICollection<EmployeeShift> EmployeeShifts { get; set; }
        public virtual ICollection<Sale> Sales { get; set; }
    }
}
