using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CrawlerSite.Models.Entities;
using CrawlerSite.Services;

namespace CrawlerSite.Controllers
{
    public class SiteController : Controller
    {
        public SiteService _siteService { get; set; }
        public SiteController()
        {
            _siteService = new SiteService();
        }

        public IActionResult Index() => View();

        public IActionResult Add() => View();
        public IActionResult Edit() => View();
        public IActionResult Delete(string id) => View();
        public IActionResult Preview() => View();

        [HttpPost]
        public async Task<JsonResult> CreateSite(string UserId, string Name, string Url, string[] Tags, int State)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _siteService.CreateSite(new
                {
                    UserId = UserId,
                    Name = Name,
                    Url = Url,
                    Tags = Tags,
                    State = State
                }, token);
                return Json(result);
            }
            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetAllSitesByUserId(string UserId)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _siteService.GetAllSiteByUserId(UserId, token);
                return Json(result);
            }
            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetSiteById(string Id)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _siteService.GetSiteById(Id, token);
                return Json(result);
            }
            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetSiteByApiKey(string ApiKey)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _siteService.GetSiteByApiKey(ApiKey, token);
                return Json(result);
            }

            return Json(new {success = false, message = "Something went wrong when retrieving data, try again."});
        }

        [HttpPost]
        public async Task<JsonResult> EditSite(string _id, string Name, string Url, string Tags)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _siteService.EditSite(new Site()
                {
                    Name = Name,
                    Url = Url,
                    _id = _id,
                    Tags = Tags.Split(',')
                }, token);

                return Json(result);
            }
            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }

        [HttpPost]
        public async Task<JsonResult> DeleteSite(string _id)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _siteService.DeleteSite(_id, token);

                return Json(result);
            }
            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }

        [HttpPost]
        public async Task<JsonResult> EditBlockUserText(string Id, string Text)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _siteService.EditBlockUserText(Id, Text, token);

                return Json(result);
            }
            return Json(new{ succes=false, message = "Something went wrong when retrieving data, try again."});
        }
    }
}