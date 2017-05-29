using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models.Entities;
using WebApplication.Services;

namespace WebApplication.Controllers
{
    public class VoteController : Controller
    {
        public VoteService _voteService { get; set; }
        public VoteController()
        {
            _voteService = new VoteService();
        }

        [HttpPost]
        public async Task<JsonResult> CreateVote(string Feature, string UserId)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _voteService.CreateVote(new
                {
                    Feature = Feature,
                    UserId = UserId
                }, token);
                return Json(result);
            }
            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }
    }
}