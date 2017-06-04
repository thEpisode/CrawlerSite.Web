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
    public class DashboadService
    {
        private ConnectionService _connection;

        public DashboadService()
        {
            _connection = new ConnectionService();
        }
        
        public async Task<dynamic> GetInsights(object userId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Insights/DashboardInsightsByUserId/" + userId, Token);
            return JObject.Parse(jsonResult);
        }

    }
}