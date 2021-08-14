using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class Supplier
    {
        public Supplier()
        {
            SupplierInvoices = new HashSet<SupplierInvoice>();
            SupplierOrders = new HashSet<SupplierOrder>();
            SupplierPayments = new HashSet<SupplierPayment>();
        }

        public int SupplierId { get; set; }
        public int? SupplierTypeId { get; set; }
        public string SupplierName { get; set; }
        public string SupplierNumber { get; set; }
        public string SupplierEmail { get; set; }
        public string SupplierAddressLine1 { get; set; }
        public string SupplierAddressLine2 { get; set; }
        public string SupplierAddressLine3 { get; set; }
        public string SupplierCityTown { get; set; }
        public int SupplierPostalCode { get; set; }
        public decimal? SupplierBalance { get; set; }

        public virtual SupplierType SupplierType { get; set; }
        public virtual ICollection<SupplierInvoice> SupplierInvoices { get; set; }
        public virtual ICollection<SupplierOrder> SupplierOrders { get; set; }
        public virtual ICollection<SupplierPayment> SupplierPayments { get; set; }
    }
}
