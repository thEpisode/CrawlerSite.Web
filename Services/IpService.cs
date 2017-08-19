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
    public class IpService
    {
        private ConnectionService _connection;

        public IpService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> GetIpById(string IpId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Ip/Id/" + IpId, Token, HttpComposedParameters.Of("IpId", IpId));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllIp(string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Ip/All", Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetIpByApiKey(string ApiKey, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Ip/ApiKey/" + ApiKey, Token, HttpComposedParameters.Of("ApiKey", ApiKey));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> CreateIp(object ip, string Token)
        {
           string jsonResult = await _connection.PostData("Ip/Create", Token, ip);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> EditIp(Ip ip, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Ip/Edit", Token, ip);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> DeleteIp(string IpId, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Ip/Delete", Token, HttpSimpleParameters.Of("_id", IpId));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> BlockUser(string SocketId, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Ip/BlockUser", Token, HttpSimpleParameters.Of("SocketId", SocketId));
            return JObject.Parse(jsonResult);
        }
    }
}