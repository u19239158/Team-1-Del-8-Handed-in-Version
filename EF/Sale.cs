using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Sale
    {
        public Sale()
        {
            Deliveries = new HashSet<Delivery>();
            SaleLines = new HashSet<SaleLine>();
        }

        public int SaleId { get; set; }
        public int? CustomerId { get; set; }
        public int? PaymentTypeId { get; set; }
        public int? OrderStatusId { get; set; }
        public int? EmployeeId { get; set; }
        public string SaleOrderDescription { get; set; }
        public DateTime SaleOrderDate { get; set; }
        public bool SaleOrderAssign { get; set; }
        public bool SaleOrderRecieveType { get; set; }
        public decimal PaymentAmount { get; set; }
        public DateTime PaymentDate { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual OrderStatus OrderStatus { get; set; }
        public virtual PaymentType PaymentType { get; set; }
        public virtual ICollection<Delivery> Deliveries { get; set; }
        public virtual ICollection<SaleLine> SaleLines { get; set; }
    }
}
