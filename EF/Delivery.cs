using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Delivery
    {
        public int DeliveryId { get; set; }
        public int? CourierId { get; set; }
        public int? AddressId { get; set; }
        public int? SaleId { get; set; }
        public int? EmployeeShiftId { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public string CourierTrackingNumber { get; set; }
        public string DeliveryDistance { get; set; }

        public virtual Address Address { get; set; }
        public virtual Courier Courier { get; set; }
        public virtual EmployeeShift EmployeeShift { get; set; }
        public virtual Sale Sale { get; set; }
    }
}
