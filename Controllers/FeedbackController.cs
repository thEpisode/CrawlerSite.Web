using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CrawlerSite.Models.Entities;
using CrawlerSite.Services;

namespace CrawlerSite.Controllers
{
    public class FeedbackController : Controller
    {
         public FeedbackService _feedbackService { get; set; }

        public FeedbackController()
        {
            _feedbackService = new FeedbackService();
        }
        [HttpGet]
        public async Task<JsonResult> Send(Feedback feedback)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                var result = await _feedbackService.CreateFeedback(feedback, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }
    }
}