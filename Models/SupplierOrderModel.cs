using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NKAP_API_2.Models
{
    public class SupplierOrderModel
    {
        [JsonProperty("supplierorderid")]
        public int SupplierOrderID
        { get; set; }

        [JsonProperty("orderdateplaced")]
        public DateTime OrderDatePlaced
        { get; set; }

        [JsonProperty("orderdaterecieved")]
        public DateTime OrderDateRecieved
        { get; set; }

        [JsonProperty("supplierordertotal")]
        public decimal SupplierOrderTotal
        { get; set; }

        [JsonProperty("supplierordersubtotal")]
        public decimal SupplierOrderSubTotal
        { get; set; }

        [JsonProperty("supplierorderVat")]
        public decimal SupplierOrderVat
        { get; set; }

        [JsonProperty("supplierorderstatusid")]
        public int SupplierOrderStatusId
        { get; set; }

        [JsonProperty("supplierid")]
        public int SupplierID
        { get; set; }

        [JsonProperty("supplierinvoiceid")]
        public int SupplierInvoiceID
        { get; set; }

        [JsonProperty("supplierinvoicedate")]
        public DateTime SupplierInvoiceDate
        { get; set; }

        [JsonProperty("supplierinvoicetotal")]
        public decimal SupplierInvoiceTotal
        { get; set; }

        [JsonProperty("productitemid")]
        public int ProductItemId
        { get; set; }

        [JsonProperty("supplierproducts")]
        public string SupplierProducts
        { get; set; }

        [JsonProperty("supplierquantityordered")]
        public int SupplierQuantityOrdered
        { get; set; }
    }
}
