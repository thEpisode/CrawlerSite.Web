using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using CrawlerSite.Models.Entities;
using CrawlerSite.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrawlerSite.Services
{
    public class FeedbackService
    {
        private ConnectionService _connection;

        public FeedbackService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> CreateFeedback(Feedback feedback, string Token)
        {
           string jsonResult = await _connection.PostData("FrontEndReview/Create", Token, feedback);
            return JObject.Parse(jsonResult);
        }

    }
}