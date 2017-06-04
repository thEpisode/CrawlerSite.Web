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
    public class FormService
    {
        private ConnectionService _connection;

        public FormService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> GetFormById(string FormId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("/Form/Id/" + FormId, Token, HttpComposedParameters.Of("FormId", FormId));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllForm(string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Form/All", Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> CreateForm(Form form, string Token)
        {
            string jsonResult = await _connection.PostData("Form/Create", Token, form);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> EditForm(Form form, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Form/Edit", Token, form);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> DeleteForm(string FormId, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Form/Delete", Token, HttpSimpleParameters.Of("_id", FormId));
            return JObject.Parse(jsonResult);
        }
    }
}