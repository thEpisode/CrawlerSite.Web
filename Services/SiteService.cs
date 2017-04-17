using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebApplication.Models.Entities;
using WebApplication.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication.Services
{
    public class SiteService
    {
        private ConnectionService _connection;

        public SiteService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> GetSiteById(string SiteId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Site/Id/" + SiteId, Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllSite(string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Site/All", Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllSiteByUserId(string UserId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Site/UserId/" + UserId, Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> CreateSite(Site site, string Token)
        {
            string jsonResult = await _connection.PostData("Site/Create", Token, site);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> EditSite(Site site, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Site/Edit", Token, site);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> DeleteSite(string SiteId, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Site/Delete", Token, HttpSimpleParameters.Of("_id", SiteId));
            return JObject.Parse(jsonResult);
        }
    }
}