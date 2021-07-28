using System;
using System.Collections.Generic;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class ProductItem
    {
        public ProductItem()
        {
            CartLines = new HashSet<CartLine>();
            Prices = new HashSet<Price>();
            ProductItemStockTakes = new HashSet<ProductItemStockTake>();
            ProductItemWrittenOffStocks = new HashSet<ProductItemWrittenOffStock>();
            ProductSpecials = new HashSet<ProductSpecial>();
            SaleLines = new HashSet<SaleLine>();
            SupplierInvoiceLines = new HashSet<SupplierInvoiceLine>();
            SupplierOrderLines = new HashSet<SupplierOrderLine>();
        }

        public int ProductItemId { get; set; }
        public int? CategoryTypeId { get; set; }
        public string ProductItemName { get; set; }
        public string ProductItemDescription { get; set; }
        public byte[] ProductItemImage { get; set; }
        public decimal ProductItemCost { get; set; }
        public int QuantityOnHand { get; set; }

        public virtual CategoryType CategoryType { get; set; }
        public virtual ICollection<CartLine> CartLines { get; set; }
        public virtual ICollection<Price> Prices { get; set; }
        public virtual ICollection<ProductItemStockTake> ProductItemStockTakes { get; set; }
        public virtual ICollection<ProductItemWrittenOffStock> ProductItemWrittenOffStocks { get; set; }
        public virtual ICollection<ProductSpecial> ProductSpecials { get; set; }
        public virtual ICollection<SaleLine> SaleLines { get; set; }
        public virtual ICollection<SupplierInvoiceLine> SupplierInvoiceLines { get; set; }
        public virtual ICollection<SupplierOrderLine> SupplierOrderLines { get; set; }
    }
}
