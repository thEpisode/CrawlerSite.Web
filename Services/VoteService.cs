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
    public class VoteService
    {
        private ConnectionService _connection;

        public VoteService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> CreateVote(object vote, string Token)
        {
            string jsonResult = await _connection.PostData("Vote/Up", Token, vote);
            return JObject.Parse(jsonResult);
        }
    }
}