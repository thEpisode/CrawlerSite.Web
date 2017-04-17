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
    public class ClickService
    {
        private ConnectionService _connection;

        public ClickService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> GetClickById(string ClickId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Click/Id/" + ClickId, Token, HttpComposedParameters.Of("ClickId", ClickId));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllClick(string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Click/All", Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> CreateClick(Click click, string Token)
        {
            string jsonResult = await _connection.PostData("Click/Create", Token, click);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> EditClick(Click click, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Click/Edit", Token, click);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> DeleteClick(string ClickId, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Click/Delete", Token, HttpSimpleParameters.Of("_id", ClickId));
            return JObject.Parse(jsonResult);
        }
    }
}