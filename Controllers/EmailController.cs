
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NKAP_API_2.EF;
using NKAP_API_2.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace NKAP_API_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private NKAP_BOLTING_DB_4Context _db; //dependency injection for db
        public EmailController(NKAP_BOLTING_DB_4Context db)
        { _db = db; }

        //emailAddress is being parsed as a parameter
        //emailAddress can also be parsed as the body


        //create click event in angular for when the email link is clicked

        //[Route("NotifyCourier/{emailAddress}, {}")]
        [Route("NotifyCourier/{courierEmail}")] //route
        [HttpPost]
        public async Task<IActionResult> GetAsync(CourierOrderMailData model, string courierEmail)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage();
            msg.SetSubject("Test");
            msg.SetFrom(new EmailAddress("ds3solutions370@outlook.com", "NKAP Bolting"));
            msg.AddTo(new EmailAddress(courierEmail));
            msg.SetTemplateId("d-25e2e27e38ef405382724a74ca22d398");



            //var Deliveries = _db.Deliveries.Join(_db.Sales,
            //    sor => sor.SaleId,
            //    sd => sd.SaleId,
            //    (sor, sd) => new
            //    {
            //        DeliveryId = sor.DeliveryId,
            //        SaleId = sd.SaleId,
            //        CustomerId = sd.CustomerId,
            //        DeliveryDate = sor.DeliveryDate,
            //        CourierTrackingNumber = sor.CourierTrackingNumber,
            //        DeliveryDistance = sor.DeliveryDistance,
            //        AddressId = sor.AddressId

            //    }).Join(_db.Customers,
            //    sor => sor.CustomerId,
            //    sd => sd.CustomerId,
            //    (jj, dd) => new
            //    {
            //        DeliveryId = jj.DeliveryId,
            //        SaleId = jj.SaleId,
            //        CustomerName = dd.CustomerName,
            //        CustomerSurname = dd.CustomerSurname,
            //        CustomerBusinessName = dd.CustomerBusinessName,
            //        CustomerCellphoneNumber = dd.CustomerCellphoneNumber,
            //        CustomerEmailAddress = dd.CustomerEmailAddress,
            //        AddressId = jj.AddressId,
            //        CourierTrackingNumber = jj.CourierTrackingNumber,
            //        DeliveryDistance = jj.DeliveryDistance,
            //        DeliveryDate = jj.DeliveryDate

            //    }).Join(_db.Addresses,
            //    sor => sor.AddressId,
            //    sd => sd.AddressId,
            //    (jj, dd) => new
            //    {
            //        DeliveryId = jj.DeliveryId,
            //        SaleId = jj.SaleId,
            //        CustomerName = jj.CustomerName,
            //        CustomerSurname = jj.CustomerSurname,
            //        CustomerBusinessName = jj.CustomerBusinessName,
            //        CustomerCellphoneNumber = jj.CustomerCellphoneNumber,
            //        CustomerEmailAddress = jj.CustomerEmailAddress,
            //        AddressId = dd.AddressId,
            //        AddressLine1 = dd.AddressLine1,
            //        AddressLine2 = dd.AddressLine2,
            //        AddressLine3 = dd.AddressLine3,
            //        PostalCode = dd.AddressPostalCode,
            //        CourierTrackingNumber = jj.CourierTrackingNumber,
            //        DeliveryDistance = jj.DeliveryDistance,
            //        DeliveryDate = jj.DeliveryDate

            //    }).First(zz => zz.DeliveryId == deliveryId);



            var dynamicTemplateData = new Models.CourierOrderMailData
            {
               
                RecipientName = model.CustomerName +" "+ model.CustomerSurname ,
                RecipientContactNumber = model.CustomerCellphoneNumber,
                RecipientEmailAddress = model.CustomerEmailAddress,
                RecipientAddress = model.AddressLine1 + ", " + model.AddressLine2 + ", " + model.AddressLine3,
                RecipientPostalCode = model.AddressPostalCode,
                RecipientBusinessName = model.CustomerBusinessName + " ",
                //RecipientBusinessName = "Midas",
                //RecipientName = "John",
                //RecipientContactNumber = "+27 (0) 39 123 1234",
                //RecipientEmailAddress = "midas@midas.co.za",
                //RecipientAddress = "23 Watterson Street, Marburg, Port Shepstone",
                //RecipientPostalCode = 4240,


            };



            msg.SetTemplateData(dynamicTemplateData);

            var response = await client.SendEmailAsync(msg);


            //var emailResult = new EmailResult();
            //emailResult.message="Email sent.";
            //await CourierOrderMail.Execute(emailAddress);
            return Ok(response);



            //var CouriersTypes = _db.CourierTypes.ToList();
            //return Ok(CouriersTypes);
        }


        [Route("GetFullSaleByID/{saleid}")] //route
        [HttpGet]
        //get Sales by ID (Read)
        public IActionResult GetComplexSale(int saleid)
        {
            var Sale = _db.Sales.Join(_db.Deliveries,
                su => su.SaleId,
                so => so.SaleId,

                (su, so) => new
                {
                    SaleID = su.SaleId,
                    SaleDescription = su.SaleOrderDescription,
                    SaleDate = su.SaleOrderDate,
                    SaleAssign = su.SaleOrderAssign,
                    SaleReceiveType = su.SaleOrderRecieveType,
                    SalePaymentDate = su.PaymentDate,
                    SalePaymentAmount = su.PaymentAmount,
                    DeliveryId = so.DeliveryId,
                    PaymentTypeID = su.PaymentTypeId,
                    CustomerId = su.CustomerId,
                    CourierId = so.CourierId


                    //attributes in table
                }).Join(_db.Couriers,
                sor => sor.CourierId,
                sd => sd.CourierId,
                (sor, sd) => new
                {

                    CustomerId = sor.CustomerId,
                    CourierEmail = sd.CourierEmail,
                    CourierName = sd.CourierName,
                    CourierNumber = sd.CourierNumber,
                    SaleID = sor.SaleID

                }).Join(_db.Customers,
                sor => sor.CustomerId,
                sd => sd.CustomerId,
                (sor, sd) => new
                {
                    CourierEmail = sor.CourierEmail,
                    CourierName = sor.CourierName,
                    CourierNumber = sor.CourierNumber,
                    CustomerId = sor.CustomerId,
                    CustomerName = sd.CustomerName,
                    CustomerSurname = sd.CustomerSurname,
                    CustomerBusinessName = sd.CustomerBusinessName,
                    CustomerCellphoneNumber = sd.CustomerCellphoneNumber,
                    CustomerEmailAddress = sd.CustomerEmailAddress,
                    SaleID = sor.SaleID

                }).Join(_db.Addresses,
                sor => sor.CustomerId,
                sd => sd.CustomerId,
                (sor, sd) => new
                {
                    CourierEmail = sor.CourierEmail,
                    CourierName = sor.CourierName,
                    CourierNumber = sor.CourierNumber,
                    SaleID = sor.SaleID,
                    CustomerId = sor.CustomerId,
                    CustomerName = sor.CustomerName,
                    CustomerSurname = sor.CustomerSurname,
                    CustomerBusinessName = sor.CustomerBusinessName,
                    CustomerCellphoneNumber = sor.CustomerCellphoneNumber,
                    CustomerEmailAddress = sor.CustomerEmailAddress,
                    AddressLine1 = sd.AddressLine1,
                    AddressLine2 = sd.AddressLine2,
                    AddressLine3 = sd.AddressLine3,
                    AddressPostalCode = sd.AddressPostalCode

                }).First(ss => ss.SaleID == saleid);

            return Ok(Sale);
        }

        //[Route("ReadyForCollection/{customerEmail}, {}")]
        [Route("ReadyForCollection/{customerEmail}")] //route
        [HttpPost]
        public async Task<IActionResult> GetAsync(string customerEmail)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage();
            msg.SetSubject("Ready for Collection");
            msg.SetFrom(new EmailAddress("ds3solutions370@outlook.com", "NKAP Bolting"));
            msg.AddTo(new EmailAddress(customerEmail));
            msg.SetTemplateId("d-ded3de28bc274242abcfc20e95e85450");



            //var dynamicTemplateData = new Models.CourierOrderMailData
            //{
            //    //Subject = "Hi!",
            //    //Name = "Example User"
            //};

            //msg.SetTemplateData(dynamicTemplateData);

            var response = await client.SendEmailAsync(msg);


            //var emailResult = new EmailResult();
            //emailResult.message="Email sent.";
            //await CourierOrderMail.Execute(emailAddress);
            return Ok(response);

        }

        ////[Route("PromoteSpecials/{customerEmail}, {}")]
        //[Route("PromoteSpecials/{customerEmail}")] //route
        //[HttpGet]
        //public async Task<IActionResult> GetAsync(string customerEmail)
        //{
        //    var apiKey = "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";
        //    var client = new SendGridClient(apiKey);
        //    var msg = new SendGridMessage();
        //    msg.SetSubject("Promote Specials");
        //    msg.SetFrom(new EmailAddress("ds3solutions370@outlook.com", "NKAP Bolting"));
        //    msg.AddTo(new EmailAddress(customerEmail));
        //    msg.SetTemplateId("________");



        //    //var dynamicTemplateData = new Models.CourierOrderMailData
        //    //{
        //    //    //Subject = "Hi!",
        //    //    //Name = "Example User"
        //    //};

        //    //msg.SetTemplateData(dynamicTemplateData);

        //    var response = await client.SendEmailAsync(msg);

        //    return Ok(response);

        //}


    }

}

