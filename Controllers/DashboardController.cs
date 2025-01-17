using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CrawlerSite.Attributes;
using CrawlerSite.Services;

namespace CrawlerSite.Controllers
{
    [ServiceFilter(typeof(AuthenticateAttribute))]
    public class DashboardController : Controller
    {
        public DashboadService _dashboardService { get; set; }
        public DashboardController()
        {
            _dashboardService = new DashboadService();
        }

        public IActionResult Index(string AuthToken)
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetInsights(string UserId)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _dashboardService.GetInsights(UserId, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }
    }
}