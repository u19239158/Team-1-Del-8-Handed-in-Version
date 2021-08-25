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


        //create click event in angular for whe the email link is clicked

        [Route("NotifyCourier/{emailAddress}")] //route
        [HttpGet]
        public async Task<IActionResult> GetAsync(string emailAddress)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage();
            msg.SetFrom(new EmailAddress("ds3solutions370@outlook.com", "Example User"));
            msg.AddTo(new EmailAddress("nikitabadrinath@gmail.com", "Example User"));
            msg.SetTemplateId("d-25e2e27e38ef405382724a74ca22d398");

            var dynamicTemplateData = new Models.CourierOrderMailData
            {
                Subject = "Hi!",
                Name = "Example User"
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