using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CrawlerSite.Models.Entities;
using CrawlerSite.Services;

namespace CrawlerSite.Controllers
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
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

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