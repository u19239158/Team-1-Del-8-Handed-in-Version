using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace NKAP_API_2.EF
{
    public partial class NKAP_BOLTING_DB_4Context : DbContext
    {
        public NKAP_BOLTING_DB_4Context()
        {
        }

        public NKAP_BOLTING_DB_4Context(DbContextOptions<NKAP_BOLTING_DB_4Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<AuditTrail> AuditTrails { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<CartLine> CartLines { get; set; }
        public virtual DbSet<CategoryType> CategoryTypes { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Courier> Couriers { get; set; }
        public virtual DbSet<CourierType> CourierTypes { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Date> Dates { get; set; }
        public virtual DbSet<Delivery> Deliveries { get; set; }
        public virtual DbSet<DeliveryPrice> DeliveryPrices { get; set; }
        public virtual DbSet<Discount> Discounts { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<EmployeeShift> EmployeeShifts { get; set; }
        public virtual DbSet<Markup> Markups { get; set; }
        public virtual DbSet<OrderStatus> OrderStatuses { get; set; }
        public virtual DbSet<PasswordHistory> PasswordHistories { get; set; }
        public virtual DbSet<PaymentType> PaymentTypes { get; set; }
        public virtual DbSet<Price> Prices { get; set; }
        public virtual DbSet<ProductCategory> ProductCategories { get; set; }
        public virtual DbSet<ProductItem> ProductItems { get; set; }
        public virtual DbSet<ProductItemStockTake> ProductItemStockTakes { get; set; }
        public virtual DbSet<ProductItemWrittenOffStock> ProductItemWrittenOffStocks { get; set; }
        public virtual DbSet<ProductSpecial> ProductSpecials { get; set; }
        public virtual DbSet<Province> Provinces { get; set; }
        public virtual DbSet<Sale> Sales { get; set; }
        public virtual DbSet<SaleLine> SaleLines { get; set; }
        public virtual DbSet<Shift> Shifts { get; set; }
        public virtual DbSet<Special> Specials { get; set; }
        public virtual DbSet<StockTake> StockTakes { get; set; }
        public virtual DbSet<Supplier> Suppliers { get; set; }
        public virtual DbSet<SupplierInvoice> SupplierInvoices { get; set; }
        public virtual DbSet<SupplierInvoiceLine> SupplierInvoiceLines { get; set; }
        public virtual DbSet<SupplierOrder> SupplierOrders { get; set; }
        public virtual DbSet<SupplierOrderLine> SupplierOrderLines { get; set; }
        public virtual DbSet<SupplierOrderStatus> SupplierOrderStatuses { get; set; }
        public virtual DbSet<SupplierPayment> SupplierPayments { get; set; }
        public virtual DbSet<Time> Times { get; set; }
        public virtual DbSet<Title> Titles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<Vat> Vats { get; set; }
        public virtual DbSet<WrittenOffStock> WrittenOffStocks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=NKAP_DB");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("Address");

                entity.Property(e => e.AddressId).HasColumnName("Address_ID");

                entity.Property(e => e.AddressLine1)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Address_Line1");

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Address_Line2");

                entity.Property(e => e.AddressLine3)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Address_Line3");

                entity.Property(e => e.AddressPostalCode).HasColumnName("Address_PostalCode");

                entity.Property(e => e.CustomerId).HasColumnName("Customer_ID");

                entity.Property(e => e.ProvinceId).HasColumnName("Province_ID");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Address__Custome__3B75D760");

                entity.HasOne(d => d.Province)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.ProvinceId)
                    .HasConstraintName("FK__Address__Provinc__3C69FB99");
            });

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("Admin");

                entity.Property(e => e.AdminId).HasColumnName("Admin_ID");

                entity.Property(e => e.AdminCellphoneNumber)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("Admin_CellphoneNumber");

                entity.Property(e => e.AdminEmailAddress)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Admin_EmailAddress");

                entity.Property(e => e.AdminName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Admin_Name");

                entity.Property(e => e.AdminSurname)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Admin_Surname");

                entity.Property(e => e.TitleId).HasColumnName("Title_ID");

                entity.HasOne(d => d.Title)
                    .WithMany(p => p.Admins)
                    .HasForeignKey(d => d.TitleId)
                    .HasConstraintName("FK__Admin__Title_ID__267ABA7A");
            });

            modelBuilder.Entity<AuditTrail>(entity =>
            {
                entity.ToTable("AuditTrail");

                entity.Property(e => e.AuditTrailId).HasColumnName("AuditTrail_ID");

                entity.Property(e => e.AuditTrailDate)
                    .HasColumnType("date")
                    .HasColumnName("AuditTrail_Date");

                entity.Property(e => e.AuditTrailDescription)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("AuditTrail_Description");

                entity.Property(e => e.AuditTrailTime).HasColumnName("AuditTrail_Time");

                entity.Property(e => e.UsersId).HasColumnName("Users_ID");

                entity.HasOne(d => d.Users)
                    .WithMany(p => p.AuditTrails)
                    .HasForeignKey(d => d.UsersId)
                    .HasConstraintName("FK__AuditTrai__Users__2E1BDC42");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart");

                entity.Property(e => e.CartId).HasColumnName("Cart_ID");
            });

            modelBuilder.Entity<CartLine>(entity =>
            {
                entity.ToTable("CartLine");

                entity.Property(e => e.CartLineId).HasColumnName("CartLine_ID");

                entity.Property(e => e.CartId).HasColumnName("Cart_ID");

                entity.Property(e => e.CartLineQuantity).HasColumnName("CartLine_Quantity");

                entity.Property(e => e.ProductItemId).HasColumnName("ProductItem_ID");

                entity.HasOne(d => d.Cart)
                    .WithMany(p => p.CartLines)
                    .HasForeignKey(d => d.CartId)
                    .HasConstraintName("FK__CartLine__Cart_I__60A75C0F");

                entity.HasOne(d => d.ProductItem)
                    .WithMany(p => p.CartLines)
                    .HasForeignKey(d => d.ProductItemId)
                    .HasConstraintName("FK__CartLine__Produc__619B8048");
            });

            modelBuilder.Entity<CategoryType>(entity =>
            {
                entity.ToTable("CategoryType");

                entity.Property(e => e.CategoryTypeId).HasColumnName("CategoryType_ID");

                entity.Property(e => e.CategoryTypeDescription)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("CategoryType_Description");

                entity.Property(e => e.CategoryTypeImage)
                    .IsUnicode(false)
                    .HasColumnName("CategoryType_Image");

                entity.Property(e => e.ItemDescription)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("Item_Description");

                entity.Property(e => e.ProductCategoryId).HasColumnName("ProductCategory_ID");

                entity.HasOne(d => d.ProductCategory)
                    .WithMany(p => p.CategoryTypes)
                    .HasForeignKey(d => d.ProductCategoryId)
                    .HasConstraintName("FK__CategoryT__Produ__5535A963");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("City");

                entity.Property(e => e.CityId).HasColumnName("City_ID");

                entity.Property(e => e.CityDescription)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("City_Description");

                entity.Property(e => e.ProvinceId).HasColumnName("Province_ID");

                entity.HasOne(d => d.Province)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.ProvinceId)
                    .HasConstraintName("FK__City__Province_I__38996AB5");
            });

            modelBuilder.Entity<Courier>(entity =>
            {
                entity.ToTable("Courier");

                entity.Property(e => e.CourierId).HasColumnName("Courier_ID");

                entity.Property(e => e.CourierEmail)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Courier_Email");

                entity.Property(e => e.CourierName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Courier_Name");

                entity.Property(e => e.CourierNumber)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("Courier_Number");

                entity.Property(e => e.CourierTypeId).HasColumnName("CourierType_ID");

                entity.HasOne(d => d.CourierType)
                    .WithMany(p => p.Couriers)
                    .HasForeignKey(d => d.CourierTypeId)
                    .HasConstraintName("FK__Courier__Courier__412EB0B6");
            });

            modelBuilder.Entity<CourierType>(entity =>
            {
                entity.ToTable("CourierType");

                entity.Property(e => e.CourierTypeId).HasColumnName("CourierType_ID");

                entity.Property(e => e.CourierTypeDescription)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("CourierType_Description");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");

                entity.Property(e => e.CustomerId).HasColumnName("Customer_ID");

                entity.Property(e => e.CustomerBusinessName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Customer_BusinessName");

                entity.Property(e => e.CustomerCellphoneNumber)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("Customer_CellphoneNumber");

                entity.Property(e => e.CustomerEmailAddress)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Customer_EmailAddress");

                entity.Property(e => e.CustomerName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Customer_Name");

                entity.Property(e => e.CustomerSurname)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Customer_Surname");

                entity.Property(e => e.CustomerVatreg)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Customer_VATReg");

                entity.Property(e => e.TitleId).HasColumnName("Title_ID");

                entity.HasOne(d => d.Title)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.TitleId)
                    .HasConstraintName("FK__Customer__Title___33D4B598");
            });

            modelBuilder.Entity<Date>(entity =>
            {
                entity.ToTable("Date");

                entity.Property(e => e.DateId).HasColumnName("Date_ID");

                entity.Property(e => e.DayOfTheWeek).HasColumnType("date");
            });

            modelBuilder.Entity<Delivery>(entity =>
            {
                entity.ToTable("Delivery");

                entity.Property(e => e.DeliveryId).HasColumnName("Delivery_ID");

                entity.Property(e => e.AddressId).HasColumnName("Address_ID");

                entity.Property(e => e.CourierId).HasColumnName("Courier_ID");

                entity.Property(e => e.CourierTrackingNumber)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("Courier_TrackingNumber");

                entity.Property(e => e.DeliveryDate)
                    .HasColumnType("date")
                    .HasColumnName("Delivery_Date");

                entity.Property(e => e.DeliveryDistance)
                    .IsRequired()
                    .HasMaxLength(1024)
                    .IsUnicode(false)
                    .HasColumnName("Delivery_Distance");

                entity.Property(e => e.SaleId).HasColumnName("Sale_ID");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Deliveries)
                    .HasForeignKey(d => d.AddressId)
                    .HasConstraintName("FK__Delivery__Addres__4F7CD00D");

                entity.HasOne(d => d.Courier)
                    .WithMany(p => p.Deliveries)
                    .HasForeignKey(d => d.CourierId)
                    .HasConstraintName("FK__Delivery__Courie__4E88ABD4");

                entity.HasOne(d => d.Sale)
                    .WithMany(p => p.Deliveries)
                    .HasForeignKey(d => d.SaleId)
                    .HasConstraintName("FK__Delivery__Sale_I__5070F446");
            });

            modelBuilder.Entity<DeliveryPrice>(entity =>
            {
                entity.ToTable("DeliveryPrice");

                entity.Property(e => e.DeliveryPriceId).HasColumnName("DeliveryPrice_ID");

                entity.Property(e => e.DeliveryDate)
                    .HasColumnType("date")
                    .HasColumnName("Delivery_Date");

                entity.Property(e => e.DeliveryDistance).HasColumnName("Delivery_Distance");

                entity.Property(e => e.DeliveryPrice1)
                    .HasColumnType("money")
                    .HasColumnName("Delivery_Price");
            });

            modelBuilder.Entity<Discount>(entity =>
            {
                entity.ToTable("Discount");

                entity.Property(e => e.DiscountId).HasColumnName("Discount_ID");

                entity.Property(e => e.DiscountPercentage)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("Discount_Percentage");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");

                entity.Property(e => e.EmployeeId).HasColumnName("Employee_ID");

                entity.Property(e => e.EmployeeAddressLine1)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("Employee_AddressLine1");

                entity.Property(e => e.EmployeeAddressLine2)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("Employee_AddressLine2");

                entity.Property(e => e.EmployeePhoneNumber)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("Employee_CellphoneNumber");

                entity.Property(e => e.EmployeeDob)
                    .HasColumnType("date")
                    .HasColumnName("Employee_DOB");

                entity.Property(e => e.EmployeeIdnumber)
                    .IsRequired()
                    .HasMaxLength(13)
                    .IsUnicode(false)
                    .HasColumnName("Employee_IDNumber");

                entity.Property(e => e.EmployeeName)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("Employee_Name");

                entity.Property(e => e.EmployeeSurname)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("Employee_Surname");
            });

            modelBuilder.Entity<EmployeeShift>(entity =>
            {
                entity.ToTable("EmployeeShift");

                entity.Property(e => e.EmployeeShiftId).HasColumnName("EmployeeShift_ID");

                entity.Property(e => e.DeliveryId).HasColumnName("Delivery_ID");

                entity.Property(e => e.EmployeeId).HasColumnName("Employee_ID");

                entity.Property(e => e.NoOfDeliveries)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .HasColumnName("No_of_Deliveries");

                entity.Property(e => e.ShiftFull).HasColumnName("Shift_Full");

                entity.Property(e => e.ShiftId).HasColumnName("Shift_ID");

                entity.HasOne(d => d.Delivery)
                    .WithMany(p => p.EmployeeShifts)
                    .HasForeignKey(d => d.DeliveryId)
                    .HasConstraintName("FK__EmployeeS__Deliv__208CD6FA");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.EmployeeShifts)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__EmployeeS__Emplo__1F98B2C1");

                entity.HasOne(d => d.Shift)
                    .WithMany(p => p.EmployeeShifts)
                    .HasForeignKey(d => d.ShiftId)
                    .HasConstraintName("FK__EmployeeS__Shift__2180FB33");
            });

            modelBuilder.Entity<Markup>(entity =>
            {
                entity.ToTable("Markup");

                entity.Property(e => e.MarkupId).HasColumnName("Markup_ID");

                entity.Property(e => e.MarkupPercentage)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("Markup_Percentage");
            });

            modelBuilder.Entity<OrderStatus>(entity =>
            {
                entity.ToTable("OrderStatus");

                entity.Property(e => e.OrderStatusId).HasColumnName("OrderStatus_ID");

                entity.Property(e => e.OrderStatusDescription)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("OrderStatus_Description");
            });

            modelBuilder.Entity<PasswordHistory>(entity =>
            {
                entity.ToTable("PasswordHistory");

                entity.Property(e => e.PasswordHistoryId).HasColumnName("PasswordHistory_ID");

                entity.Property(e => e.PasswordHistoryDate)
                    .HasColumnType("date")
                    .HasColumnName("PasswordHistory_Date");

                entity.Property(e => e.PasswordHistoryText)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("PasswordHistory_Text");

                entity.Property(e => e.UsersId).HasColumnName("Users_ID");

                entity.HasOne(d => d.Users)
                    .WithMany(p => p.PasswordHistories)
                    .HasForeignKey(d => d.UsersId)
                    .HasConstraintName("FK__PasswordH__Users__30F848ED");
            });

            modelBuilder.Entity<PaymentType>(entity =>
            {
                entity.ToTable("PaymentType");

                entity.Property(e => e.PaymentTypeId).HasColumnName("PaymentType_ID");

                entity.Property(e => e.PaymentTypeDescription)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("PaymentType_Description");
            });

            modelBuilder.Entity<Price>(entity =>
            {
                entity.ToTable("Price");

                entity.Property(e => e.PriceId).HasColumnName("Price_ID");

                entity.Property(e => e.PriceDate)
                    .HasColumnType("date")
                    .HasColumnName("Price_Date");

                entity.Property(e => e.PriceDescription)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Price_Description");

                entity.Property(e => e.ProductItemId).HasColumnName("ProductItem_ID");

                entity.HasOne(d => d.ProductItem)
                    .WithMany(p => p.Prices)
                    .HasForeignKey(d => d.ProductItemId)
                    .HasConstraintName("FK__Price__ProductIt__6A30C649");
            });

            modelBuilder.Entity<ProductCategory>(entity =>
            {
                entity.ToTable("ProductCategory");

                entity.Property(e => e.ProductCategoryId).HasColumnName("ProductCategory_ID");

                entity.Property(e => e.ProductCategoryDescription)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ProductCategory_Description");

                entity.Property(e => e.ProductCategoryImage)
                    .IsUnicode(false)
                    .HasColumnName("ProductCategory_Image");
            });

            modelBuilder.Entity<ProductItem>(entity =>
            {
                entity.ToTable("ProductItem");

                entity.Property(e => e.ProductItemId).HasColumnName("ProductItem_ID");

                entity.Property(e => e.CategoryTypeId).HasColumnName("CategoryType_ID");

                entity.Property(e => e.ProductItemCost)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("ProductItem_Cost");

                entity.Property(e => e.ProductItemName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ProductItem_Name");

                entity.Property(e => e.QuantityOnHand).HasColumnName("Quantity_On_Hand");

                entity.HasOne(d => d.CategoryType)
                    .WithMany(p => p.ProductItems)
                    .HasForeignKey(d => d.CategoryTypeId)
                    .HasConstraintName("FK__ProductIt__Categ__5812160E");
            });

            modelBuilder.Entity<ProductItemStockTake>(entity =>
            {
                entity.ToTable("ProductItem_StockTake");

                entity.Property(e => e.ProductItemStockTakeId).HasColumnName("ProductItem_StockTake_ID");

                entity.Property(e => e.ProductItemId).HasColumnName("ProductItem_ID");

                entity.Property(e => e.StockTakeId).HasColumnName("StockTake_ID");

                entity.Property(e => e.StockTakeQuantity).HasColumnName("StockTake_Quantity");

                entity.HasOne(d => d.ProductItem)
                    .WithMany(p => p.ProductItemStockTakes)
                    .HasForeignKey(d => d.ProductItemId)
                    .HasConstraintName("FK__ProductIt__Produ__6754599E");

                entity.HasOne(d => d.StockTake)
                    .WithMany(p => p.ProductItemStockTakes)
                    .HasForeignKey(d => d.StockTakeId)
                    .HasConstraintName("FK__ProductIt__Stock__66603565");
            });

            modelBuilder.Entity<ProductItemWrittenOffStock>(entity =>
            {
                entity.ToTable("ProductItem_WrittenOffStock");

                entity.Property(e => e.ProductItemWrittenOffStockId).HasColumnName("ProductItem_WrittenOffStock_ID");

                entity.Property(e => e.ProductItemId).HasColumnName("ProductItem_ID");

                entity.Property(e => e.WriteOffQuantity).HasColumnName("WriteOff_Quantity");

                entity.Property(e => e.WriteOffReason)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("WriteOff_Reason");

                entity.Property(e => e.WrittenOffStockId).HasColumnName("WrittenOffStock_ID");

                entity.HasOne(d => d.ProductItem)
                    .WithMany(p => p.ProductItemWrittenOffStocks)
                    .HasForeignKey(d => d.ProductItemId)
                    .HasConstraintName("FK__ProductIt__Produ__0D7A0286");

                entity.HasOne(d => d.WrittenOffStock)
                    .WithMany(p => p.ProductItemWrittenOffStocks)
                    .HasForeignKey(d => d.WrittenOffStockId)
                    .HasConstraintName("FK__ProductIt__Writt__0C85DE4D");
            });

            modelBuilder.Entity<ProductSpecial>(entity =>
            {
                entity.ToTable("Product_Special");

                entity.Property(e => e.ProductSpecialId).HasColumnName("Product_Special_ID");

                entity.Property(e => e.ProductItemId).HasColumnName("ProductItem_ID");

                entity.Property(e => e.SpecialId).HasColumnName("Special_ID");

                entity.Property(e => e.SpecialPrice)
                    .HasColumnType("money")
                    .HasColumnName("Special_Price");

                entity.HasOne(d => d.ProductItem)
                    .WithMany(p => p.ProductSpecials)
                    .HasForeignKey(d => d.ProductItemId)
                    .HasConstraintName("FK__Product_S__Produ__01142BA1");

                entity.HasOne(d => d.Special)
                    .WithMany(p => p.ProductSpecials)
                    .HasForeignKey(d => d.SpecialId)
                    .HasConstraintName("FK__Product_S__Speci__00200768");
            });

            modelBuilder.Entity<Province>(entity =>
            {
                entity.ToTable("Province");

                entity.Property(e => e.ProvinceId).HasColumnName("Province_ID");

                entity.Property(e => e.ProvinceDescription)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Province_Description");
            });

            modelBuilder.Entity<Sale>(entity =>
            {
                entity.ToTable("Sale");

                entity.Property(e => e.SaleId).HasColumnName("Sale_ID");

                entity.Property(e => e.EmployeeId).HasColumnName("Employee_ID");

                entity.Property(e => e.OrderStatusId).HasColumnName("OrderStatus_ID");

                entity.Property(e => e.PaymentAmount)
                    .HasColumnType("money")
                    .HasColumnName("Payment_Amount");

                entity.Property(e => e.PaymentDate)
                    .HasColumnType("date")
                    .HasColumnName("Payment_Date");

                entity.Property(e => e.PaymentTypeId).HasColumnName("PaymentType_ID");

                entity.Property(e => e.SaleOrderAssign).HasColumnName("SaleOrder_Assign");

                entity.Property(e => e.SaleOrderDate)
                    .HasColumnType("date")
                    .HasColumnName("SaleOrder_Date");

                entity.Property(e => e.SaleOrderDescription)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("SaleOrder_Description");

                entity.Property(e => e.SaleOrderRecieveType).HasColumnName("SaleOrder_RecieveType");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.EmployeeId)
                    .HasConstraintName("FK__Sale__Employee_I__4BAC3F29");

                entity.HasOne(d => d.OrderStatus)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.OrderStatusId)
                    .HasConstraintName("FK__Sale__OrderStatu__4AB81AF0");

                entity.HasOne(d => d.PaymentType)
                    .WithMany(p => p.Sales)
                    .HasForeignKey(d => d.PaymentTypeId)
                    .HasConstraintName("FK__Sale__PaymentTyp__49C3F6B7");
            });

            modelBuilder.Entity<SaleLine>(entity =>
            {
                entity.ToTable("SaleLine");

                entity.Property(e => e.SaleLineId).HasColumnName("SaleLine_ID");

                entity.Property(e => e.ProductItemId).HasColumnName("ProductItem_ID");

                entity.Property(e => e.SaleId).HasColumnName("Sale_ID");

                entity.Property(e => e.SaleLineQuantity).HasColumnName("SaleLine_Quantity");

                entity.HasOne(d => d.ProductItem)
                    .WithMany(p => p.SaleLines)
                    .HasForeignKey(d => d.ProductItemId)
                    .HasConstraintName("FK__SaleLine__Produc__5BE2A6F2");

                entity.HasOne(d => d.Sale)
                    .WithMany(p => p.SaleLines)
                    .HasForeignKey(d => d.SaleId)
                    .HasConstraintName("FK__SaleLine__Sale_I__5AEE82B9");
            });

            modelBuilder.Entity<Shift>(entity =>
            {
                entity.ToTable("Shift");

                entity.Property(e => e.ShiftId).HasColumnName("Shift_ID");

                entity.Property(e => e.DateId).HasColumnName("Date_ID");

                entity.Property(e => e.TimeId).HasColumnName("Time_ID");

                entity.HasOne(d => d.Date)
                    .WithMany(p => p.Shifts)
                    .HasForeignKey(d => d.DateId)
                    .HasConstraintName("FK__Shift__Date_ID__1BC821DD");

                entity.HasOne(d => d.Time)
                    .WithMany(p => p.Shifts)
                    .HasForeignKey(d => d.TimeId)
                    .HasConstraintName("FK__Shift__Time_ID__1CBC4616");
            });

            modelBuilder.Entity<Special>(entity =>
            {
                entity.ToTable("Special");

                entity.Property(e => e.SpecialId).HasColumnName("Special_ID");

                entity.Property(e => e.SpecialDescription)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Special_Description");

                entity.Property(e => e.SpecialEndDate)
                    .HasColumnType("date")
                    .HasColumnName("Special_EndDate");

                entity.Property(e => e.SpecialImage)
                    .IsRequired()
                    .HasColumnType("image")
                    .HasColumnName("Special_Image");

                entity.Property(e => e.SpecialStartDate)
                    .HasColumnType("date")
                    .HasColumnName("Special_StartDate");
            });

            modelBuilder.Entity<StockTake>(entity =>
            {
                entity.ToTable("StockTake");

                entity.Property(e => e.StockTakeId).HasColumnName("StockTake_ID");

                entity.Property(e => e.StockTakeDate)
                    .HasColumnType("date")
                    .HasColumnName("StockTake_Date");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.ToTable("Supplier");

                entity.Property(e => e.SupplierId).HasColumnName("Supplier_ID");

                entity.Property(e => e.SupplierAddressLine1)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("SupplierAddress_Line1");

                entity.Property(e => e.SupplierAddressLine2)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("SupplierAddress_Line2");

                entity.Property(e => e.SupplierAddressLine3)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("SupplierAddress_Line3");

                entity.Property(e => e.SupplierBalance)
                    .HasColumnType("money")
                    .HasColumnName("Supplier_Balance");

                entity.Property(e => e.SupplierCityTown)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Supplier_City_Town");

                entity.Property(e => e.SupplierEmail)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("Supplier_Email");

                entity.Property(e => e.SupplierName)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("Supplier_Name");

                entity.Property(e => e.SupplierNumber)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("Supplier_Number");

                entity.Property(e => e.SupplierPostalCode).HasColumnName("Supplier_PostalCode");
            });

            modelBuilder.Entity<SupplierInvoice>(entity =>
            {
                entity.ToTable("SupplierInvoice");

                entity.Property(e => e.SupplierInvoiceId).HasColumnName("SupplierInvoice_ID");

                entity.Property(e => e.SupplierId).HasColumnName("Supplier_ID");

                entity.Property(e => e.SupplierInvoiceDate)
                    .HasColumnType("date")
                    .HasColumnName("SupplierInvoice_Date");

                entity.Property(e => e.SupplierInvoiceTotal)
                    .HasColumnType("money")
                    .HasColumnName("SupplierInvoice_Total");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.SupplierInvoices)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("FK__SupplierI__Suppl__03F0984C");
            });

            modelBuilder.Entity<SupplierInvoiceLine>(entity =>
            {
                entity.ToTable("Supplier_InvoiceLine");

                entity.Property(e => e.SupplierInvoiceLineId).HasColumnName("Supplier_InvoiceLine_ID");

                entity.Property(e => e.LineItemCost)
                    .HasColumnType("money")
                    .HasColumnName("LineItem_Cost");

                entity.Property(e => e.ProductItemId).HasColumnName("ProductItem_ID");

                entity.Property(e => e.QuantityReceived).HasColumnName("Quantity_Received");

                entity.Property(e => e.SupplierInvoiceId).HasColumnName("SupplierInvoice_ID");

                entity.Property(e => e.SupplierItemName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("SupplierItem_Name");

                entity.HasOne(d => d.ProductItem)
                    .WithMany(p => p.SupplierInvoiceLines)
                    .HasForeignKey(d => d.ProductItemId)
                    .HasConstraintName("FK__Supplier___Produ__07C12930");

                entity.HasOne(d => d.SupplierInvoice)
                    .WithMany(p => p.SupplierInvoiceLines)
                    .HasForeignKey(d => d.SupplierInvoiceId)
                    .HasConstraintName("FK__Supplier___Suppl__06CD04F7");
            });

            modelBuilder.Entity<SupplierOrder>(entity =>
            {
                entity.ToTable("SupplierOrder");

                entity.Property(e => e.SupplierOrderId).HasColumnName("SupplierOrder_ID");

                entity.Property(e => e.OrderDatePlaced)
                    .HasColumnType("date")
                    .HasColumnName("Order_Date_Placed");

                entity.Property(e => e.OrderDateReceived)
                    .HasColumnType("date")
                    .HasColumnName("Order_Date_Received");

                entity.Property(e => e.SupplierId).HasColumnName("Supplier_ID");

                entity.Property(e => e.SupplierOrderStatusId).HasColumnName("SupplierOrderStatus_ID");

                entity.Property(e => e.SupplierOrderSubTotal)
                    .HasColumnType("money")
                    .HasColumnName("SupplierOrder_SubTotal");

                entity.Property(e => e.SupplierOrderTotal)
                    .HasColumnType("money")
                    .HasColumnName("SupplierOrder_Total");

                entity.Property(e => e.SupplierOrderVat)
                    .HasColumnType("money")
                    .HasColumnName("SupplierOrder_VAT");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.SupplierOrders)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("FK__SupplierO__Suppl__778AC167");

                entity.HasOne(d => d.SupplierOrderStatus)
                    .WithMany(p => p.SupplierOrders)
                    .HasForeignKey(d => d.SupplierOrderStatusId)
                    .HasConstraintName("FK__SupplierO__Suppl__76969D2E");
            });

            modelBuilder.Entity<SupplierOrderLine>(entity =>
            {
                entity.ToTable("SupplierOrderLine");

                entity.Property(e => e.SupplierOrderLineId).HasColumnName("SupplierOrderLine_ID");

                entity.Property(e => e.ProductItemId).HasColumnName("ProductItem_ID");

                entity.Property(e => e.SupplierOrderId).HasColumnName("SupplierOrder_ID");

                entity.Property(e => e.SupplierOrderLineCost)
                    .HasColumnType("money")
                    .HasColumnName("SupplierOrderLine_Cost");

                entity.Property(e => e.SupplierProducts)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false)
                    .HasColumnName("Supplier_Products");

                entity.Property(e => e.SupplierQuantityOrdered).HasColumnName("SupplierQuantity_Ordered");

                entity.HasOne(d => d.ProductItem)
                    .WithMany(p => p.SupplierOrderLines)
                    .HasForeignKey(d => d.ProductItemId)
                    .HasConstraintName("FK__SupplierO__Produ__7B5B524B");

                entity.HasOne(d => d.SupplierOrder)
                    .WithMany(p => p.SupplierOrderLines)
                    .HasForeignKey(d => d.SupplierOrderId)
                    .HasConstraintName("FK__SupplierO__Suppl__7A672E12");
            });

            modelBuilder.Entity<SupplierOrderStatus>(entity =>
            {
                entity.ToTable("SupplierOrderStatus");

                entity.Property(e => e.SupplierOrderStatusId).HasColumnName("SupplierOrderStatus_ID");

                entity.Property(e => e.SupplierOrderStatusDesc)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("SupplierOrderStatus_Desc");
            });

            modelBuilder.Entity<SupplierPayment>(entity =>
            {
                entity.ToTable("SupplierPayment");

                entity.Property(e => e.SupplierPaymentId).HasColumnName("SupplierPayment_ID");

                entity.Property(e => e.SupplierAmount).HasColumnType("money");

                entity.Property(e => e.SupplierId).HasColumnName("Supplier_ID");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.SupplierPayments)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("FK__SupplierP__Suppl__71D1E811");
            });

            modelBuilder.Entity<Time>(entity =>
            {
                entity.ToTable("Time");

                entity.Property(e => e.TimeId).HasColumnName("Time_ID");

            });

            modelBuilder.Entity<Title>(entity =>
            {
                entity.ToTable("Title");

                entity.Property(e => e.TitleId).HasColumnName("Title_ID");

                entity.Property(e => e.TitleDescription)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("Title_Description");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UsersId)
                    .HasName("PK__Users__EB68290D8CDDD693");

                entity.Property(e => e.UsersId).HasColumnName("Users_ID");

                entity.Property(e => e.UserPassword)
                    .HasMaxLength(70)
                    .IsUnicode(false)
                    .HasColumnName("User_Password");

                entity.Property(e => e.UserRoleId).HasColumnName("UserRole_ID");

                entity.Property(e => e.UserUsername)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("User_Username");

                entity.HasOne(d => d.UserRole)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.UserRoleId)
                    .HasConstraintName("FK__Users__UserRole___2B3F6F97");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("UserRole");

                entity.Property(e => e.UserRoleId).HasColumnName("UserRole_ID");

                entity.Property(e => e.UserRoleDescription)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("UserRole_Description");

                entity.Property(e => e.UserRoleName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("UserRole_Name");
            });

            modelBuilder.Entity<Vat>(entity =>
            {
                entity.ToTable("VAT");

                entity.Property(e => e.VatId).HasColumnName("VAT_ID");

                entity.Property(e => e.VatPercentage)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("VAT_Percentage");
            });

            modelBuilder.Entity<WrittenOffStock>(entity =>
            {
                entity.ToTable("WrittenOffStock");

                entity.Property(e => e.WrittenOffStockId).HasColumnName("WrittenOffStock_ID");

                entity.Property(e => e.WrittenOffStockDate)
                    .HasColumnType("date")
                    .HasColumnName("WrittenOffStock_Date");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
