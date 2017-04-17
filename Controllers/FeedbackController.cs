using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models.Entities;
using WebApplication.Services;

namespace WebApplication.Controllers
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
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            var result = await _feedbackService.CreateFeedback(feedback, token);
            return Json(result);
        }
    }
}