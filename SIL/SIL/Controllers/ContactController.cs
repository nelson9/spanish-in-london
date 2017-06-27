using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;
using SIL.Models;

namespace SIL.Controllers
{
    public class ContactController : ApiController
    {
        public IHttpActionResult Post(ContactForm contactForm)
        {
            if (contactForm == null)
            {
                return InternalServerError();
            }

            if (contactForm.Email == null)
            {
                return InternalServerError();
            }

            var mail = new MailMessage(contactForm.Email, "niall.ferguson@gmail.com");
            var client = new SmtpClient
            {
                Port = 25,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Host = "smtp.gmail.com",
                EnableSsl = true,
                Credentials = new NetworkCredential("niall.ferguson@gmail.com", "kissme91")
        };
            mail.Subject = "Spanish In London Contact Form: " + contactForm.Name;
            mail.Body = contactForm.Message;

            try
            {
                client.Send(mail);
            }
            catch (Exception e)
            {
                return InternalServerError();
            }
            return Ok(contactForm);
        }
    }
}
