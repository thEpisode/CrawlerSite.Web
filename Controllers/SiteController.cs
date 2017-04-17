using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models.Entities;
using WebApplication.Services;

namespace WebApplication.Controllers
{
    public class SiteController : Controller
    {
        public SiteService _siteService { get; set; }
        public SiteController()
        {
            _siteService = new SiteService();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Add()
        {
            return View();
        }

        public IActionResult Edit(string id)
        {
            return View();
        }

        public IActionResult Delete(string id)
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> CreateSite(string[] UsersId, string Name, string Url, string[] Tags, int State)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            dynamic result = await _siteService.CreateSite(new Site(){
                UsersId = UsersId,
                Name = Name,
                Url = Url,
                Tags = Tags,
                State = State
            }, token);
            return Json(result);
        }

        [HttpGet]
        public async Task<JsonResult> GetAllSitesByUserId(string UserId)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            dynamic result = await _siteService.GetAllSiteByUserId(UserId, token);
            return Json(result);
        }

        [HttpGet]
        public async Task<JsonResult> GetSiteById(string Id)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            dynamic result = await _siteService.GetSiteById(Id, token);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> EditSite(string _id, string Name, string Url, string Tags)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            dynamic result = await _siteService.EditSite(new Site(){
                Name = Name,
                Url = Url,
                _id = _id,
                Tags = Tags.Split(',')
            }, token);

            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> DeleteSite(string _id)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            dynamic result = await _siteService.DeleteSite(_id, token);

            return Json(result);
        }
    }
}