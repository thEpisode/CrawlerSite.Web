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
    public class ScrollService
    {
        private ConnectionService _connection;

        public ScrollService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> GetScrollById(string ScrollId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Scroll/Id/",Token, HttpComposedParameters.Of("ScrollId", ScrollId));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllScroll(string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Scroll/All", Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> CreateScroll(Scroll scroll, string Token)
        {
            string jsonResult = await _connection.PostData("Scroll/Create", Token, scroll);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> EditScroll(Scroll scroll, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Scroll/Edit", Token, scroll);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> DeleteScroll(string ScrollId, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Scroll/Delete", Token, HttpSimpleParameters.Of("_id", ScrollId));
            return JObject.Parse(jsonResult);
        }
    }
}