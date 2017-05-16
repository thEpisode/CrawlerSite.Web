using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using WebApplication.Models.Entities;
using WebApplication.Services;

namespace WebApplication.Controllers
{
    public class InsightsController : Controller
    {
        public InsightsService _insightsService { get; set; }
        public InsightsController()
        {
            _insightsService = new InsightsService();
        }

        public IActionResult Index(string Id)
        {
            ViewBag.Id = Id;
            return View();
        }

        public IActionResult Treemap(string Id)
        {
            return View();
        }

        public IActionResult Heatmap(string Id)
        {
            return View();
        }

        public IActionResult RAT(string Id)
        {
            return View();
        }

        public IActionResult FormAnalysis(string Id)
        {
            return View();
        }

        public IActionResult Recordings(string Id)
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetSocketUrl()
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                string result = _insightsService.GetSocketUrl(token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public JsonResult GetSiteScreenshotUrl(string Id)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                string result = _insightsService.GetSiteScreenshotUrl(Id, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetSiteHeatmapData(string ApiKey, int MinWidth, int MaxWidth, string Type, int MaxTime, bool? Flash, string Browser, string OperatingSystem, bool? Cookies, string Location, string Endpoint)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _insightsService.GetSiteHeatmapData(ApiKey, MinWidth, MaxWidth, Type, MaxTime, Flash, Browser, OperatingSystem, Cookies, Location, Endpoint, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }
        
    }
}
