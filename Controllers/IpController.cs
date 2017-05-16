using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Services;
using WebApplication.Models.Entities;

namespace WebApplication.Controllers
{
    public class IpController : Controller
    {
        public IpService _ipService { get; set; }

        public IpController()
        {
            _ipService = new IpService();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Add()
        {
            return View();
        }

        public IActionResult Edit(string Id)
        {
            return View();
        }

        public IActionResult Delete(string Id)
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> CreateIp(string ApiKey, string Name, string ip, int State)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _ipService.CreateIp(new Ip(){
                    ApiKey= ApiKey,
                    IP = ip,
                    Name= Name,
                    State= State
                }, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetAllIp(string UserId)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _ipService.GetAllIp(token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetIpById(string Id)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _ipService.GetIpById(Id, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetIpByApiKey(string ApiKey)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _ipService.GetIpByApiKey(ApiKey, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }

        [HttpPost]
        public async Task<JsonResult> EditIp(string Id, string Name, string IP)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _ipService.EditIp(new Ip(){
                    _id = Id,
                    IP = IP,
                    Name = Name,
                }, token);

                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }

        [HttpPost]
        public async Task<JsonResult> DeleteIp(string Id)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _ipService.DeleteIp(Id, token);

                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }
    }
}