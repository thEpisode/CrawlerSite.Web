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
    public class PriceService
    {
        private ConnectionService _connection;

        public PriceService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> GetPriceById(string PriceId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Price/Id/" + PriceId, Token, HttpComposedParameters.Of("PriceId", PriceId));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllPrice(string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Price/All",Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> CreatePrice(Price price, string Token)
        {
            string jsonResult = await _connection.PostData("Price/Create", Token, price);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> EditPrice(Price price, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Price/Edit", Token, price);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> DeletePrice(string PriceId, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Price/Delete", Token, HttpSimpleParameters.Of("_id", PriceId));
            return JObject.Parse(jsonResult);
        }
    }
}