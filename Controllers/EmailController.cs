using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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
        [Route("NotifyCourier/{emailAddress}")] //route
        [HttpGet]
        public async Task<IActionResult> GetAsync(string toEmailAddress, string courierName, int deliveryId)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage();
            msg.SetSubject("Test");
            msg.SetFrom(new EmailAddress("ds3solutions370@outlook.com", "NKAP Bolting"));
            msg.AddTo(new EmailAddress(toEmailAddress, courierName));
            msg.SetTemplateId("d-25e2e27e38ef405382724a74ca22d398");



            var Deliveries = _db.Deliveries.Join(_db.Sales,
                sor => sor.SaleId,
                sd => sd.SaleId,
                (sor, sd) => new
                {
                    DeliveryId = sor.DeliveryId,
                    SaleId = sd.SaleId,
                    CustomerId = sd.CustomerId,
                    DeliveryDate = sor.DeliveryDate,
                    CourierTrackingNumber = sor.CourierTrackingNumber,
                    DeliveryDistance = sor.DeliveryDistance,
                    AddressId = sor.AddressId

                }).Join(_db.Customers,
                sor => sor.CustomerId,
                sd => sd.CustomerId,
                (jj, dd) => new
                {
                    DeliveryId = jj.DeliveryId,
                    SaleId = jj.SaleId,
                    CustomerName = dd.CustomerName,
                    CustomerSurname = dd.CustomerSurname,
                    CustomerBusinessName = dd.CustomerBusinessName,
                    CustomerCellphoneNumber = dd.CustomerCellphoneNumber,
                    CustomerEmailAddress = dd.CustomerEmailAddress,
                    AddressId = jj.AddressId,
                    CourierTrackingNumber = jj.CourierTrackingNumber,
                    DeliveryDistance = jj.DeliveryDistance,
                    DeliveryDate = jj.DeliveryDate

                }).Join(_db.Addresses,
                sor => sor.AddressId,
                sd => sd.AddressId,
                (jj, dd) => new
                {
                    DeliveryId = jj.DeliveryId,
                    SaleId = jj.SaleId,
                    CustomerName = jj.CustomerName,
                    CustomerSurname = jj.CustomerSurname,
                    CustomerBusinessName = jj.CustomerBusinessName,
                    CustomerCellphoneNumber = jj.CustomerCellphoneNumber,
                    CustomerEmailAddress = jj.CustomerEmailAddress,
                    AddressId = dd.AddressId,
                    AddressLine1 = dd.AddressLine1,
                    AddressLine2 = dd.AddressLine2,
                    AddressLine3 = dd.AddressLine3,
                    PostalCode = dd.AddressPostalCode,
                    CourierTrackingNumber = jj.CourierTrackingNumber,
                    DeliveryDistance = jj.DeliveryDistance,
                    DeliveryDate = jj.DeliveryDate

                }).First(zz => zz.DeliveryId == deliveryId);



            var dynamicTemplateData = new Models.CourierOrderMailData
            {
                RecipientBusinessName = Deliveries.CustomerBusinessName,
                RecipientName = Deliveries.CustomerName + Deliveries.CustomerSurname,
                RecipientContactNumber = Deliveries.CustomerCellphoneNumber,
                RecipientEmailAddress = Deliveries.CustomerEmailAddress,
                RecipientAddress = Deliveries.AddressLine1 + ", " + Deliveries.AddressLine2 + ", " + Deliveries.AddressLine3,
                RecipientPostalCode = Deliveries.PostalCode,

                //RecipientBusinessName = "Midas",
                //RecipientName = "John",
                //RecipientContactNumber = "+27 (0) 39 123 1234",
                //RecipientEmailAddress = "midas@midas.co.za",
                //RecipientAddress = "23 Watterson Street, Marburg, Port Shepstone",
                //RecipientPostalCode = 4240,

                //SenderName = "NKAP Bolting",
                //SenderEmailAddress = "info@nkap.co.za",
                //SenderContactNumber = "+27 (0) 39 685 5281",
                //SenderProvince = "Kwa-Zulu Natal",
                //SenderCityTown = "Marburg, Port Shepstone",
                //SenderStreetAddress ="13 Watterson Street",
                //SenderPostalCode = 4240,
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


    }
}