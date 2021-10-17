use master
go

If exists (Select * from sys.databases where name = 'NKAP_BOLTING_DB_4')
Drop Database NKAP_BOLTING_DB_4
GO

create database NKAP_BOLTING_DB_4
go

use NKAP_BOLTING_DB_4
go

CREATE TABLE Title
(
Title_ID int identity (1,1) Primary Key Not Null,
Title_Description varchar (15) not null
)
GO

CREATE TABLE UserRole
(
UserRole_ID int identity (1,1) Primary Key Not Null,
UserRole_Description varchar (150) not null,
UserRole_Name varchar (15) not null
)
GO


CREATE TABLE Users
(
Users_ID int identity (1,1) Primary Key Not Null,
UserRole_ID int references UserRole (UserRole_ID), --FK--
User_Username varchar (50) not null,
User_Password varchar(70)
)
GO

CREATE TABLE Admin
(
Admin_ID int identity (1,1) Primary Key Not Null,
Users_ID int references Users (Users_ID),
Title_ID int references Title (Title_ID), --FK--
Admin_Name varchar (30) not null,
Admin_Surname varchar (30) not null,
Admin_CellphoneNumber varchar (10) not null,
Admin_EmailAddress varchar (50) not null
)
GO


CREATE TABLE AuditTrail
(
AuditTrail_ID int identity (1,1) Primary Key Not Null,
Users_ID int references Users (Users_ID), --FK--
AuditTrail_Description varchar (150) not null,
AuditTrail_Date Date not null,
AuditTrail_Time Time not null
)
GO



CREATE TABLE PasswordHistory
(
PasswordHistory_ID int identity (1,1) Primary Key Not Null,
Users_ID int references Users (Users_ID), --FK--
PasswordHistory_Text varchar (70) not null,
PasswordHistory_Date Date not null,
)
GO

CREATE TABLE Customer
(
Customer_ID int identity (1,1) Primary Key Not Null,
Users_ID int references Users (Users_ID),
Title_ID int references Title (Title_ID), --FK--
Customer_Name varchar (30) not null,
Customer_Surname varchar (30) not null,
Customer_CellphoneNumber  varchar (10) not null,
Customer_EmailAddress varchar (100) not null,
Customer_BusinessName varchar (50),
Customer_VATReg varchar (50) 
)
GO


CREATE TABLE Province
(
Province_ID int identity (1,1) Primary Key Not Null,
Province_Description varchar (50) not null
)
GO

--CREATE TABLE City
--(
--City_ID int identity (1,1) Primary Key Not Null,
--Province_ID int references Province (Province_ID), --FK--
--City_Description varchar (50) not null
--)
--GO


CREATE TABLE Address
(
Address_ID int identity (1,1) Primary Key Not Null,
Customer_ID int references Customer (Customer_ID), --FK--
Province_ID int references Province (Province_ID), --FK--
Address_Line1 varchar (100) not null,
Address_Line2 varchar (100),
Address_PostalCode int not null
)
GO


CREATE TABLE CourierType
(
CourierType_ID int identity (1,1) Primary Key Not Null,
CourierType_Description varchar (50) not null
)
GO

CREATE TABLE Courier
(
Courier_ID int identity (1,1) Primary Key Not Null,
CourierType_ID int references CourierType (CourierType_ID), --FK--
Courier_Name varchar (50) not null,
Courier_Number varchar (10) not null,
Courier_Email varchar (30) not null,
)
GO

CREATE TABLE PaymentType
(
PaymentType_ID int identity (1,1) Primary Key Not Null,
PaymentType_Description varchar (50) not null
)
GO

CREATE TABLE OrderStatus
(
OrderStatus_ID int identity (1,1) Primary Key Not Null,
OrderStatus_Description varchar (30) not null
)
GO

CREATE TABLE Employee
(
Employee_ID int identity (1,1) Primary Key Not Null,
Users_ID int references Users (Users_ID),
Employee_Name varchar (40) not null,
Employee_Surname varchar (40) not null,
Employee_CellphoneNumber varchar (10) not null,
Employee_AddressLine1 varchar (150) not null,
Employee_AddressLine2 varchar (150),
Employee_DOB date not null,
Employee_IDNumber varchar(13) not null
)
GO

CREATE TABLE Sale
(
Sale_ID int identity (1,1) Primary Key Not Null,
Customer_ID int references Customer (Customer_ID), --FK--
PaymentType_ID int references PaymentType (PaymentType_ID), --FK--
OrderStatus_ID int references OrderStatus (OrderStatus_ID), --FK--
Employee_ID int references Employee (Employee_ID), --FK--
SaleOrder_Description varchar (max) not null,
SaleOrder_Date date not null,
SaleOrder_Assign Bit ,
SaleOrder_RecieveType Bit not null,
Payment_Amount money not null,
Payment_Date date not null,
)
GO


CREATE TABLE Date
(
Date_ID int identity (1,1) Primary Key Not Null,
DayOfTheWeek date not null
)
Go

CREATE TABLE Time
(
Time_ID int identity (1,1) Primary Key Not Null,
StartTime time not null,
EndTime time not null
)
Go


CREATE TABLE Shift
(
Shift_ID int identity (1,1) Primary Key Not Null,
Date_ID int references Date (Date_ID), --FK--
Time_ID int references Time (Time_ID) --FK--
)
GO

CREATE TABLE EmployeeShift
(
EmployeeShift_ID int identity (1,1) Primary Key Not Null,
Employee_ID int references Employee (Employee_ID), --FK--
Shift_ID int references Shift (Shift_ID), --FK--
No_of_Deliveries integer ,
Shift_Full Bit not null
)
GO

CREATE TABLE Delivery
(
Delivery_ID int identity (1,1) Primary Key Not Null,
Courier_ID int references Courier (Courier_ID), --FK--
Address_ID int references Address (Address_ID), --FK--
Sale_ID int references Sale (Sale_ID), --FK--
EmployeeShift_ID int references EmployeeShift (EmployeeShift_ID),--FK--
Delivery_Date date ,
Courier_TrackingNumber varchar (30) ,
Delivery_Distance varchar (max) 
)
GO




CREATE TABLE ProductCategory
(
ProductCategory_ID int identity (1,1) Primary Key Not Null,
ProductCategory_Description varchar (50) not null,
ProductCategory_Image varchar(max)
)
GO


CREATE TABLE CategoryType
(
CategoryType_ID int identity (1,1) Primary Key Not Null,
ProductCategory_ID int references ProductCategory (ProductCategory_ID), --FK--
CategoryType_Description varchar (50) not null,
CategoryType_Image varchar(max),
Item_Description varchar (150)
)
GO


CREATE TABLE ProductItem
(
ProductItem_ID int identity (1,1) Primary Key Not Null,
CategoryType_ID int references CategoryType (CategoryType_ID), --FK--
ProductItem_Name varchar (50) not null,
ProductItem_Cost money not null,
Quantity_On_Hand int 
)
GO




CREATE TABLE SaleLine
(
SaleLine_ID int identity (1,1) Primary Key Not Null,
Sale_ID int references Sale (Sale_ID), --FK--
ProductItem_ID int references ProductItem (ProductItem_ID), --FK--
SaleLine_Quantity int 
)
GO

CREATE TABLE Cart
(
Cart_ID int identity (1,1) Primary Key Not Null
)

CREATE TABLE CartLine
(
CartLine_ID int identity (1,1) Primary Key Not Null,
Cart_ID int references Cart (Cart_ID), --FK--
ProductItem_ID int references ProductItem (ProductItem_ID), --FK--
CartLine_Quantity int not null
)
GO

CREATE TABLE StockTake
(
StockTake_ID int identity (1,1) Primary Key Not Null,
StockTake_Date date not null
)
GO

CREATE TABLE ProductItem_StockTake
(
ProductItem_StockTake_ID int identity (1,1) Primary Key Not Null,
StockTake_ID int references StockTake (StockTake_ID), --FK--
ProductItem_ID int references ProductItem (ProductItem_ID), --FK--
StockTake_Quantity int not null
)
GO

CREATE TABLE Price
(
Price_ID int identity (1,1) Primary Key Not Null,
ProductItem_ID int references ProductItem (ProductItem_ID), --FK--
Price_Description money  Not Null,
Price_Date date not null
)
GO



CREATE TABLE Supplier
(
Supplier_ID int identity (1,1) Primary Key Not Null,
Supplier_Name varchar (150) not null,
Supplier_Number  varchar (10) not null,
Supplier_Email varchar (100) not null,
SupplierAddress_Line1 varchar (100) not null,
SupplierAddress_Line2 varchar (100),
SupplierAddress_Line3 varchar (100),
Supplier_City_Town varchar (100) not null,
Supplier_PostalCode integer not null,
Supplier_Balance money
)
GO


CREATE TABLE SupplierPayment
(
SupplierPayment_ID int identity (1,1) Primary Key Not Null,
Supplier_ID int references Supplier (Supplier_ID), --FK--
SupplierAmount money,
SupplierPaymentDate Date 
)
GO


CREATE TABLE SupplierOrderStatus
(
SupplierOrderStatus_ID int identity (1,1) Primary Key Not Null,
SupplierOrderStatus_Desc varchar (50) not null
)
GO

CREATE TABLE SupplierOrder
(
SupplierOrder_ID int identity (1,1) Primary Key Not Null,
SupplierOrderStatus_ID int references SupplierOrderStatus (SupplierOrderStatus_ID), --FK--
Supplier_ID int references Supplier (Supplier_ID), --FK--
Order_Date_Placed date not null,
Order_Date_Received date,
SupplierOrderTotal money,
)
GO


CREATE TABLE SupplierOrderLine
(
SupplierOrderLine_ID int identity (1,1) Primary Key Not Null,
SupplierOrder_ID int references SupplierOrder (SupplierOrder_ID), --FK--
ProductItem_ID int references ProductItem (ProductItem_ID), --FK--
Supplier_Products varchar (40) not null,
SupplierQuantity_Ordered integer not null,

)
GO

CREATE TABLE Special
(
Special_ID int identity (1,1) Primary Key Not Null,
Special_StartDate date not null,
Special_EndDate date not null,
Special_Description varchar (100) not null,
)
GO

CREATE TABLE Product_Special
(
Product_Special_ID int identity (1,1) Primary Key Not Null,
Special_ID int references Special (Special_ID), --FK--
ProductItem_ID int references ProductItem (ProductItem_ID), --FK--
Special_Price money
)
GO

CREATE TABLE SupplierInvoice
(
SupplierInvoice_ID int identity (1,1) Primary Key Not Null,
Supplier_ID int references Supplier (Supplier_ID), --FK--
SupplierInvoice_Date date not null,
SupplierInvoice_Total money,
SupplierInvoicePDF varchar(max)
)
GO

CREATE TABLE Supplier_InvoiceLine
(
Supplier_InvoiceLine_ID int identity (1,1) Primary Key Not Null,
SupplierInvoice_ID int references SupplierInvoice (SupplierInvoice_ID), --FK--
ProductItem_ID int references ProductItem (ProductItem_ID), --FK--
SupplierItem_Name varchar (100) not null,
Quantity_Received integer not null,
)
GO

CREATE TABLE WrittenOffStock
(
WrittenOffStock_ID int identity (1,1) Primary Key Not Null,
WrittenOffStock_Date date not null
)
GO

CREATE TABLE ProductItem_WrittenOffStock
(
ProductItem_WrittenOffStock_ID int identity (1,1) Primary Key Not Null,
WrittenOffStock_ID int references WrittenOffStock(WrittenOffStock_ID), --FK--
ProductItem_ID int references ProductItem (ProductItem_ID), --FK--
WriteOff_Reason varchar (100) not null,
WriteOff_Quantity integer not null
)
GO

CREATE TABLE Discount
(
Discount_ID int identity (1,1) Primary Key Not Null,
Discount_Percentage decimal (10,2)
)
GO



CREATE TABLE Markup
(
Markup_ID int identity (1,1) Primary Key Not Null,
Markup_Percentage decimal (10,2)
)
GO



CREATE TABLE VAT
(
VAT_ID int identity (1,1) Primary Key Not Null,
VAT_Percentage decimal (10,2)
)
GO



CREATE TABLE DeliveryPrice
(
DeliveryPrice_ID int identity (1,1) Primary Key Not Null,
Delivery_Distance integer not null,
Delivery_Price money,
Delivery_Date date not null
)
GO

CREATE TABLE MaxDeliveries
(
MaxID int identity (1,1) Primary Key Not Null,
MaxNumber int
)
GO

CREATE TABLE Verification
(
Verification_ID int identity (1,1) Primary Key Not Null,
Users_ID int references Users (Users_ID), 
Code integer not null,
PhoneNumber varchar (10) not null,
CodeDate date not null
)
GO





---------------------------------------------Dummy Data--------------------------------------------------------------

--Title--
insert into Title values('Mr.')
insert into Title values('Mrs.')
insert into Title  values('Ms.')
insert into Title values('Dr.')
insert into Title values('Prof.')

--Admin--
--insert into Admin values(3,'Divya','Bagratee','0833680971','divya@gmail.com')
--insert into Admin values (1, 'Jerome', 'Amenigy','0975462318','Jerome@yahoo.com')
--insert into Admin values(3,'Sonali','Badrinath','0889680971','Sonali@gmail.com')
--insert into Admin values (3,'Snethemba','Xulu','0833686781','XuluS@yahoo.com')
--insert into Admin values(3,'Charde','Vries','0835670971','CVries@gmail.com')
--insert into Admin values(3,'Test','Today','0835670971','CVries@gmail.com')

--UserRole--
insert into UserRole values('Adminstrator on the system enabled to access backend functions','Admin')
insert into UserRole values('Customer enabled to purchase items and view profile details','Customer')
insert into UserRole values('Employee on the system enabled to access certain backend functions','Employee')

--Users--
--insert into Users values(1,'divya@gmail.com','divya123')
--insert into Users values(1,'Jerome@yahoo.com','Jerome123')
--insert into Users values(1,'Sonali@gmail.com','Sonali123')
--insert into Users values(1,'XuluS@yahoo.com','Snethemba123')
--insert into Users values(1,'CVries@gmail.com','Charde123')

--AuditTrail-
--insert into AuditTrail values(1,'Login','2021/04/03','15:21')
--insert into AuditTrail values(2,'login', '2021/08/09','12:21')
--insert into AuditTrail values (3,'Logout','2021/08/12','14:57')
--insert into AuditTrail values (4,'Login','2021/07/12','12:37')
--insert into AuditTrail values (5,'Logout','2021/07/6','10:18')

--Password History--
--insert into PasswordHistory values(1,'Divya123','2021/06/12')
--insert into PasswordHistory values(2,'Jerome123','2021/06/12')
--insert into PasswordHistory values(3,'Sonali123','2021/06/12')
--insert into PasswordHistory values(4,'Snethemba123','2021/06/12')
--insert into PasswordHistory values(5,'Charde123','2021/06/12')

--Customer--
--insert into Customer values(1,'Barry','Benson','0754312347','BarryB@gmail.com','BarryBolts','P568Z7109')
--insert into Customer values(2,'Jane','Doe','0754346747','Jane@gmail.com','JaneHardware','P56U19109')
--insert into Customer values(3,'Carly','White','0754313147','WhiteC@gmail.com','','')
--insert into Customer values(1,'John','Doe','0754315461','Johnny@gmail.com','JohnsPlumbing','P568D8NB1')
--insert into Customer values(1,'Sam','Green','0752782347','SamGreen@gmail.com','','')

--Province--
insert into Province values('Eastern Cape')
insert into Province Values('Free State')
insert into Province Values('Gauteng')
insert into Province values('KwaZulu-Natal')
insert into Province values('Limpopo')
insert into Province values('Mpumalanga')
insert into Province values('Northern Cape')
insert into Province values('North West') 
insert into Province values('Western Cape')

--City--
--insert into City values (3,'Pretoria')
--insert into City values (3,'Johannesburg')
--insert into City values (3,'Vereeniging')
--insert into City values (3,'Randburg')
--insert into City values (3,'Benoni')
--insert into City values (4,'Durban')
--insert into City values (4,'Ladysmith')
--insert into City values (4,'New Castle')
--insert into City values (4,'Pietermaritzberg')

--CourierType--
insert into CourierType values ('Local')
insert into CourierType values ('Provincial')

--Courier--
insert into Courier values(1,'CourierA','0895672314','courierA@gmail.com')
insert into Courier values(2,'CourierB','0752314576','courierB@gmail.com')
insert into Courier values(2,'CourierC','0965412399','courierC@yahoo.com')

--PaymentType--
insert into PaymentType values('EFT')

--OrderStatus--
insert into OrderStatus values('Needs Packing')
insert into OrderStatus values('Ready for Collection')
insert into OrderStatus values('Ready for Delivery')
insert into OrderStatus values('Pending')
insert into OrderStatus values('On the Way')
insert into OrderStatus values('Collected')
insert into OrderStatus values('Delivered')

--Employee--
--insert into Employee values('Jack','Smith', '0117684591' ,'3 Jackson Boulevard','Green Street','1997-08-12', '1997081267675')
--insert into Employee values('Meredith','Black','0245684591','12 Lion Road','Pickford Avenue','1998-10-12', '1998101267231')
--insert into Employee values('Sam','Hurly','0117684082','9 Crescent Street','Riverclub','1994-05-19','1994051967234')
--insert into Employee values('Max','Hurly','0117768034','9 Crescent Street','Riverclub','1994-05-19','1994051967234')

--Sale--
--insert into Sale values(1,1,3,1,'3x Bolts','2021-08-19',0,1,'35.50','2021-08-19')
--insert into Sale values(2,1,3,2,'6x Knuts','2021-10-11',0,1,'50.50','2021-10-11')
--insert into Sale values(3,1,3,3,'12x Washers','2021-07-21',0,1,'91.89','2021-07-21')
--insert into Sale values(4,1,3,4,'55x Chipboard Screws,12x Washers','2021-08-16',0,1,'121.30','2021-08-16')
--insert into Sale values(5,1,1,3,'35x Coach Screws,12x Washers,6x Knuts','2021-08-19',0,1,'154.87','2021-08-19')
--insert into Sale values(1,1,1,4,'25x Machine Screws,12x Washers','2021-08-19',0,1,'187.96','2021-08-19')
--insert into Sale values(2,1,1,2,'35x Dry Wall Screws,6x Knuts','2021-08-23',0,1,'196.30','2021-08-23')
--insert into Sale values(3,1,1,1,'15x Chipboard Screws,15x Chipboard Screws','2021-08-24',0,1,'87.30','2021-08-24')
--insert into Sale values(4,1,1,3,'35x Machine Screws, 12x Self Tapping Screws','2021-08-24',0,1,'78.30','2021-08-24')
--insert into Sale values(5,1,1,3,'16x Chemical Anchors','2021-08-24',0,1,'190.30','2021-08-24')
--insert into Sale values(1,1,1,4,'8x Wing Nuts,15x Chipboard Screws ','2021-08-26',0,1,'120.00','2021-08-26')
--insert into Sale values(2,1,1,4,'30x Dry Wall Screws','2021-08-24',0,1,'161.98','2021-08-24')
--insert into Sale values(3,1,1,3,'35x Wing Nuts','2021-08-27',0,1,'134.89','2021-08-27')
--insert into Sale values(4,1,1,2,'8x Chemical Anchors,15x Chipboard Screws ','2021-08-28',0,1,'98.43','2021-08-28')
--insert into Sale values(5,1,1,1,'35x Machine Screws, 8x Chemical Anchors','2021-08-28',0,1,'171.80','2021-08-28')

--Address--
--insert into Address values (1,4,'3 Waterfall Road','Durban',null,4141)
--insert into Address values (2,3,'150 Zigzag Road','Johannesburg',null,2185)
--insert into Address values (3,4,'66 Baker Street','Pietermaritzberg',null,1848)
--insert into Address values (4,3,'7 Hurlingham Road','Balito',null,4141)

--Delivery--
--insert into Delivery values(1,2,1,'2021/08/31','459078621','1000km')
--insert into Delivery values(2,3,1,'2021/08/31','3560721621','200km')
--insert into Delivery values(3,4,1,'2021/08/31','23207821','70km')

--Product Category--
insert into ProductCategory values('Screws',null)
insert into ProductCategory values('Nuts',null)
insert into ProductCategory values('Bolts',null)
insert into ProductCategory values('Washers',null)
insert into ProductCategory values('Thread Rods',null)
insert into ProductCategory values('Wall Fixers',null)
insert into ProductCategory values('Rivets',null)

--Category Type--
insert into CategoryType values(1,'Chipboard Screws',null,'Self-tapping screws most commonly designed with a single thread that runs all the way from the base of the head to the tip')
insert into CategoryType values(1,'Coach Screws',null,'Used in heavy duty applications connecting objects to wood and concrete.')
insert into CategoryType values(1,'Dry Wall Screws',null,'Designed to secure wall sheets or plasterboard to wood or metal studs.')
insert into CategoryType values(1,'Hex Set Screws',null, 'Used to fasten objects together by inserting the screw from the one end and securing it with the nut on the other end.')
insert into CategoryType values(1,'Machine Screws',null, 'Screwed into holes that already have a thread in them. Used in objects from car engines to watches. ')
insert into CategoryType values(1,'Self Driven Screws',null, ' Do not require a pilot hole, which accelerates installation time and lowers the cost and need of additional drill bits.')
insert into CategoryType values(1,'Self Tapping Screws',null, 'Have the ability to tap threads into the material and are used for all sorts of materials.')
insert into CategoryType values(2,'Sump Nut',null, 'The Sump Nut is a bolt at the base of the sump pan that is unscrewed to allow oil to be drained.')
insert into CategoryType values(2,'Wing Nut',null, ' A Nut with wings that provide a grip for the thumb and finger')
insert into CategoryType values(3,'Anchor Bolt',null, 'These are designed to secure objects to concrete and are used in heavy duty applications.')
insert into CategoryType values(3,'Carriage Bolt',null, 'Has a square section and a smooth, rounded head The function of the square section is to prevent turning.')
insert into CategoryType values(3,'Hangar Bolt',null, ' A rod that has a screw thread and a bolt thread on either end and is used to fasten objects to wood.')
insert into CategoryType values(3,'Hex Bolt',null, 'Has a threaded body and hexagonal head and is used widely from general to specialized applications.')
insert into CategoryType values(4,'Flat Washers',null, 'Most common type of washer used widely in general manufacturing, maintenance, and repair.')
insert into CategoryType values(4,'Square Washers',null, 'Mostly used in concrete floor and timber building applications.')
insert into CategoryType values(5,'Threaded Rods',null, 'They are designed to be used in tension. Threaded rod in bar stock form is often called all-thread.')
insert into CategoryType values(6,'Cavity Wall Fixer',null, 'Designed to anchor a screw that needs to be driven into a hollow walls or soft surfaces.')
insert into CategoryType values(6,'Chemical Anchor',null, 'Ideal for high strength, permanent applications. Widely used for heavy-duty applications in masonry and concrete')
insert into CategoryType values(6,'Expansion Bolt',null, 'Widely used for heavy-weight applications in brick, mortar and concrete. Also known as wedge anchors.')
insert into CategoryType values(7,'Pop Rivet',null, 'Pop rivets are very versatile, fast to install, and used in the electronics, aerospace, and shipbuilding industries.')



--ProductItem--
insert into ProductItem values (1,'2mm Chipboard Screw','2.95',100)
insert into ProductItem values (1,'4mm Chipboard Screw','3.00',100)
insert into ProductItem values (1,'6mm Chipboard Screw','3.10',100)
insert into ProductItem values (2,'2mm Coach Screw','2.95',100)
insert into ProductItem values (2,'4mm Coach Screw','3.00',100)
insert into ProductItem values (2,'6mm Coach Screw','3.10',100)
insert into ProductItem values (3,'2mm Dry Wall Screw','2.95',100)
insert into ProductItem values (3,'4mm Dry Wall Screw','3.00',100)
insert into ProductItem values (3,'6mm Dry Wall Screw','3.10',100)
insert into ProductItem values (4,'2mm Hex Set Screw','2.95',100)
insert into ProductItem values (4,'4mm Hex Set Screw','3.00',100)
insert into ProductItem values (4,'6mm Hex Set Screw','3.10',100)
insert into ProductItem values (5,'2mm Machine Screw','2.95',100)
insert into ProductItem values (5,'4mm Machine Screw','3.00',100)
insert into ProductItem values (5,'6mm Machine Screw','3.10',100)
insert into ProductItem values (6,'2mm Self Driven Screw','2.95',100)
insert into ProductItem values (6,'4mm Self Driven Screw','3.00',100)
insert into ProductItem values (6,'6mm Self Driven Screw','3.10',100)
insert into ProductItem values (7,'2mm Self Tapping Screw','2.95',100)
insert into ProductItem values (7,'4mm Self Tapping Screw','3.00',100)
insert into ProductItem values (7,'6mm Self Tapping Screw','3.10',100)
insert into ProductItem values (8,'4mm Sump Nut','3.45',100)
insert into ProductItem values (8,'6mm Sump Nut','3.60',100)
insert into ProductItem values (9,'4mm Wing Nut','3.45',100)
insert into ProductItem values (9,'6mm Wing Nut','3.60',100)
insert into ProductItem values (10,'4mm Anchor Bolt','3.45',100)
insert into ProductItem values (10,'6mm Anchor Bolt','3.60',100)
insert into ProductItem values (11,'4mm Carriage Bolt','3.45',100)
insert into ProductItem values (11,'6mm Carriage Bolt','3.60',100)
insert into ProductItem values (12,'4mm Hangar Bolt','3.45',100)
insert into ProductItem values (12,'6mm Hangar Bolt','3.60',100)
insert into ProductItem values (13,'4mm Hex Bolt','3.45',100)
insert into ProductItem values (13,'6mm Hex Bolt','3.60',100)
insert into ProductItem values (14,'4mm Flat Washer','4.45',100)
insert into ProductItem values (14,'6mm Flat Washer','4.95',100)
insert into ProductItem values (15,'4mm Square Washer','4.45',100)
insert into ProductItem values (15,'6mm Square Washer','4.60',100)
insert into ProductItem values (16,'10mm Thread Rod','5.00',100)
insert into ProductItem values (16,'12mm Thread Rod','5.50',100)
insert into ProductItem values (17,'6mm Cavity Wall Fixer','4.60',100)
insert into ProductItem values (17,'8mm Cavity Wall Fixer','5.00',100)
insert into ProductItem values (17,'10mm Cavity Wall Fixer','5.50',100)
insert into ProductItem values (18,'6mm Chemical Anchor','4.60',100)
insert into ProductItem values (18,'8mm Chemcical Anchor','5.00',100)
insert into ProductItem values (18,'10mm Chemical Anchor','5.50',100)
insert into ProductItem values (19,'8mm Expansion Bolt','5.00',100)
insert into ProductItem values (19,'10mm Expansion Bolt','5.50',100)
insert into ProductItem values (20,'4mm Pop Rivet','3.80',100)
insert into ProductItem values (20,'6mm Pop Rivet','4.10',100)



--SaleLine--
--insert into SaleLine values 

--Cart--

--CartLine--
--insert into CartLine values(1,1,'10')

--StockTake--
--insert into StockTake values('2021/07/09')
--insert into StockTake values('2021/08/09')

--ProductItem_StockTake--

--Price--
insert into Price values (1,'3.39','2021-09-16')
insert into Price values (2,'3.45','2021-09-16')
insert into Price values (3,'3.57','2021-09-16')
insert into Price values (4,'3.39','2021-09-16')
insert into Price values (5,'3.45','2021-09-16')
insert into Price values (6,'3.57','2021-09-16')
insert into Price values (7,'3.39','2021-09-16')
insert into Price values (8,'3.45','2021-09-16')
insert into Price values (9,'3.57','2021-09-16')
insert into Price values (10,'3.39','2021-09-16')
insert into Price values (11,'3.45','2021-09-16')
insert into Price values (12,'3.57','2021-09-16')
insert into Price values (13,'3.39','2021-09-16')
insert into Price values (14,'3.45','2021-09-16')
insert into Price values (15,'3.57','2021-09-16')
insert into Price values (16,'3.39','2021-09-16')
insert into Price values (17,'3.45','2021-09-16')
insert into Price values (18,'3.57','2021-09-16')
insert into Price values (19,'3.39','2021-09-16')
insert into Price values (20,'3.45','2021-09-16')
insert into Price values (21,'3.57','2021-09-16')
insert into Price values (22,'3.97','2021-09-16')
insert into Price values (23,'4.14','2021-09-16')
insert into Price values (24,'3.97','2021-09-16')
insert into Price values (25,'4.14','2021-09-16')
insert into Price values (26,'3.97','2021-09-16')
insert into Price values (27,'4.14','2021-09-16')
insert into Price values (28,'3.97','2021-09-16')
insert into Price values (29,'4.14','2021-09-16')
insert into Price values (30,'3.97','2021-09-16')
insert into Price values (31,'4.14','2021-09-16')
insert into Price values (32,'3.97','2021-09-16')
insert into Price values (33,'4.14','2021-09-16')
insert into Price values (34,'5.12','2021-09-16')
insert into Price values (35,'5.69','2021-09-16')
insert into Price values (36,'5.12','2021-09-16')
insert into Price values (37,'5.29','2021-09-16')
insert into Price values (38,'5.75','2021-09-16')
insert into Price values (39,'6.33','2021-09-16')
insert into Price values (40,'5.29','2021-09-16')
insert into Price values (41,'5.75','2021-09-16')
insert into Price values (42,'6.33','2021-09-16')
insert into Price values (43,'5.29','2021-09-16')
insert into Price values (44,'5.75','2021-09-16')
insert into Price values (45,'6.33','2021-09-16')
insert into Price values (46,'5.75','2021-09-16')
insert into Price values (47,'6.33','2021-09-16')
insert into Price values (48,'4.37','2021-09-16')
insert into Price values (49,'4.72','2021-09-16')

--SupplierType--

--Supplier--
insert into Supplier values('Bobs Bolts','0112347891','BobsBolts@gmail.com','3 Morning Road','Address Line 2',Null,'Durban','3241','4501.10')
insert into Supplier values('Screws Supplier','0112345601','CassidyPScrews@gmail.com','534 Union Lane','Address Line 2',Null,'Durban','6861','571.10')
insert into Supplier values('Hardware Galore Suppliers','0112347761','HardwareGalore@gmail.com','482 Rus St','Address Line 2',Null,'Durban','9110','3816.10')

--Supplier Payment--
--insert into SupplierPayment values (1,'5610.10')
--insert into SupplierPayment values (2,'4851.10')
--insert into SupplierPayment values (3,'4851.10')

--Supplier Order Status--
insert into SupplierOrderStatus values ('Ordered')
insert into SupplierOrderStatus values ('Recieved')

--Supplier Order--
--insert into SupplierOrder values(1,1,'2021-08-15','2021-08-20','6861.20','5832.02','1029.18')
--insert into SupplierOrder values(2,3,'2021-08-23','2021-08-28','3732.52','3073.84','658.68')
--insert into SupplierOrder values(1,1,'2021-09-01',null,'1086.20','923.27','162.93')

--Supplier OrderLine--

--Special--
--insert into Special values('2021-08-15','2021-08-18','Buy 1 get 1 free!','Image')
--insert into Special values('2021-08-21','2021-08-22','10% Off Weekend Special!','Image')
--insert into Special values('2021-08-28','2021-08-31','Month End Combo Deal!','Image')
--insert into Special values('2021-08-28','2021-08-31','Month End Combo Deal!','C:\Users\divya\OneDrive\Documents\Third Year\INF 370 DEL 5,6,7\NKAP Bolting Database\Test Image.jpg')

--Product Special--

--Supplier Invoice--
--insert into SupplierInvoice values(1,'2021-08-20','6861.20')
--insert into SupplierInvoice values(2,'2021-08-28','3732.52')

--Supplier InvoiceLine--

--WrittenOffStock--
--insert into WrittenOffStock values ('2019-12-30')
--insert into WrittenOffStock values ('2020-03-13')
--insert into WrittenOffStock values ('2021-01-06')
--insert into WrittenOffStock values ('2021-04-22')
--insert into WrittenOffStock values ('2021-07-09')

--ProductItem_WrittenOffStock--
--insert into ProductItem_WrittenOffStock values ()

--Discount--
insert into Discount values(0.04)
insert into Discount values(0.05)
insert into Discount values(0.08)
insert into Discount values(0.10)
insert into Discount values(0.15)
insert into Discount values(0.20)
insert into Discount values(0.50)

--Markup--
insert into Markup values (0.06)
insert into Markup values (0.09)
insert into Markup values (0.15)
insert into Markup values (0.18)
insert into Markup values (0.20)

--VAT--
insert into VAT values (0.14)
insert into VAT values (0.15)
insert into VAT values (0.16)
insert into VAT values (0.00)
insert into VAT values (0.28)

--DeliveryPrice--
insert into DeliveryPrice values (2,0,'2021-07-09')
insert into DeliveryPrice values (5,100,'2021-07-10')
insert into DeliveryPrice values (8,100,'2021-06-11')
insert into DeliveryPrice values (10,100,'2020-09-30')
insert into DeliveryPrice values (25,200,'2021-07-18')

--Date--
insert into [Date] values('2021-08-01')
insert into [Date] values('2021-08-02')
insert into [Date] values('2021-08-03')
insert into [Date] values('2021-08-04')
insert into [Date] values('2021-08-05')

--Time--
insert into [Time] values ('08:00', '09:00')
insert into [Time] values ('09:00', '10:00')
insert into [Time] values ('10:00', '11:00')
insert into [Time] values ('11:00', '12:00')
insert into [Time] values ('12:00', '13:00')
insert into [Time] values ('13:00', '14:00')
insert into [Time] values ('14:00', '15:00')
insert into [Time] values ('15:00', '16:00')

--Shift--
--insert into [Shift] values ( 1,1)
--insert into [Shift] values ( 1,2)
--insert into [Shift] values ( 2,1)
--insert into [Shift] values ( 1,2)

----EmployeeShift--
--insert into EmployeeShift values (1,1,1,4,1)
--insert into EmployeeShift values (2,1,3,3,0)
--insert into EmployeeShift values (3,1,2,2,0)
--insert into EmployeeShift values (4,1,4,4,1)

--Product Special--
--insert into Product_Special values(1,1,2)

--MaxDeliveries--
insert into MaxDeliveries values(4)

-- Category Type Images --

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Screws%2FChipboard.jpg?alt=media&token=38d308e6-349c-4ab6-9554-f28a0e1ef6e3' 
WHERE CategoryType_ID = 1;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Screws%2FCoach.jpg?alt=media&token=96b84bf9-46b9-4296-81f0-925b605a66f7' 
WHERE CategoryType_ID = 2;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Screws%2FDrywall%20Screw.jpg?alt=media&token=ee0f8455-eda5-4e33-95c6-6cd510b81e83' 
WHERE CategoryType_ID = 3;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Screws%2FHex%20Set.jpg?alt=media&token=54d88270-d5dd-470b-a1cd-5793b6532a13' 
WHERE CategoryType_ID = 4;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Screws%2FMachine%20Screw.jpg?alt=media&token=e7e0aa59-60aa-4845-a13e-37310e89caa6' 
WHERE CategoryType_ID = 5;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Screws%2FSelf%20Drilling.jpg?alt=media&token=2b3e45d4-7781-4352-b2eb-f792502cf410' 
WHERE CategoryType_ID = 6;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Screws%2FSelf%20Tapping.jpg?alt=media&token=99cb6d2b-6e77-401f-a0f3-a574b70cb506' 
WHERE CategoryType_ID = 7;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Nuts%2FSump.jpg?alt=media&token=9da4a95a-aed6-44e7-9bec-e3d60e2f4881' 
WHERE CategoryType_ID = 8;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Nuts%2Fwing.jpg?alt=media&token=a48420e4-d530-4c27-b412-a4589ad582ed' 
WHERE CategoryType_ID = 9;


UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Bolts%2FAnchor.jpg?alt=media&token=91a2a56a-fcdb-46b1-81f3-cb90daa31211' 
WHERE CategoryType_ID = 10;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Bolts%2FCarriage.png?alt=media&token=c8273620-8558-422c-8421-06666f5c6c3e' 
WHERE CategoryType_ID = 11;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Bolts%2FHangar.jpg?alt=media&token=02eebf21-bb81-4943-9beb-cfd944e11203' 
WHERE CategoryType_ID = 12;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Bolts%2FHex.jpg?alt=media&token=cab984d5-9d00-43cb-aecf-4e54c3c99a8f' 
WHERE CategoryType_ID = 13;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Washers%2FFlat.jpg?alt=media&token=3f5b9f9c-c374-4cbb-977f-9089e8ded309' 
WHERE CategoryType_ID = 14;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Washers%2FSquare.jpg?alt=media&token=0bc5d367-38b2-4e0b-959a-2be1ea0eedab' 
WHERE CategoryType_ID = 15;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Thread%20Rods%2FThreaded%20Rods.jpg?alt=media&token=fa494777-49ce-44a5-8e6f-fb318582345a' 
WHERE CategoryType_ID = 16;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Wall%20Fixers%2FCavity%20Wall%20Fixer.jpg?alt=media&token=7d5714a5-a648-4096-9eab-ac29609c3d12' 
WHERE CategoryType_ID = 17;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Wall%20Fixers%2FChemical%20wall%20fixer.jpg?alt=media&token=89c57dbf-c814-4b7a-854d-7a92aeb86895' 
WHERE CategoryType_ID = 18;

UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Wall%20Fixers%2FExpansion.png?alt=media&token=c9834787-c127-46ee-92af-37c57c4bbb9a' 
WHERE CategoryType_ID = 19;


UPDATE CategoryType
SET  CategoryType_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Rivets%2FPop%20Rivet.jpg?alt=media&token=5440d659-f56d-458c-9e9b-da5f7c0ee74c' 
WHERE CategoryType_ID = 20;







--Product Category Images--


UPDATE ProductCategory
SET ProductCategory_Description = 'Screws' , ProductCategory_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/screws.jpg?alt=media&token=6ea7451a-5f99-4ebe-aa94-98f6143a7851' 
WHERE ProductCategory_ID = 1;

UPDATE ProductCategory
SET ProductCategory_Description = 'Nuts' , ProductCategory_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Nuts.jpg?alt=media&token=eaa5677d-3450-4942-8641-55d25e0a5739' 
WHERE ProductCategory_ID = 2;

UPDATE ProductCategory
SET ProductCategory_Description = 'Bolts' , ProductCategory_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Bolts.jfif?alt=media&token=82e5ae7a-a959-4d46-b832-5c8b709040f0' 
WHERE ProductCategory_ID = 3;

UPDATE ProductCategory
SET ProductCategory_Description = 'Washers' , ProductCategory_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/washers.jpg?alt=media&token=69e88014-b44e-4d0b-8c7b-4edc7c47575c' 
WHERE ProductCategory_ID = 4;

UPDATE ProductCategory
SET ProductCategory_Description = 'Thread Rods' , ProductCategory_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/thread%20rods.jpg?alt=media&token=e53ff8fa-a73b-4027-96d8-94c3165eb340' 
WHERE ProductCategory_ID = 5;

UPDATE ProductCategory
SET ProductCategory_Description = 'Wall Fixers' , ProductCategory_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Wall%20Fixers.jpg?alt=media&token=e2c5afb0-fa27-406d-9488-1fadf87d4ffc' 
WHERE ProductCategory_ID = 6;

UPDATE ProductCategory
SET ProductCategory_Description = 'Rivets' , ProductCategory_Image = 'https://firebasestorage.googleapis.com/v0/b/nkap-storage.appspot.com/o/Rivets.jpg?alt=media&token=d2f4ad55-a378-463b-8ed4-4eaf1efeb548' 
WHERE ProductCategory_ID = 7;

