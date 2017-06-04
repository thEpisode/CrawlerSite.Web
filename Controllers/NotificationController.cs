using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CrawlerSite.Services;

namespace CrawlerSite.Controllers
{
    public class NotificationController : Controller
    {
        public NotificationService _notificationService { get; set; }

        public NotificationController()
        {
            _notificationService = new NotificationService();
        }

        public IActionResult Index() => View();

        public IActionResult Detail(string Id) => View();

        public IActionResult All()
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetNotificationsByUserId(string UserId)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _notificationService.GetNotificationsById(UserId, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetNotificationById(string Id)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _notificationService.GetNotificationById(Id, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }
    }
}