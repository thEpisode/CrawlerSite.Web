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
    public class MovementService
    {
        private ConnectionService _connection;

        public MovementService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> GetMovementById(string MovementId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Movement/Id/" + MovementId, Token, HttpComposedParameters.Of("MovementId", MovementId));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllMovement(string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Movement/All", Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> CreateMovement(Movement movement, string Token)
        {
            string jsonResult = await _connection.PostData("Movement/Create", Token, movement);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> EditMovement(Movement movement, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Movement/Edit", Token, movement);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> DeleteMovement(string MovementId, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Movement/Delete", Token, HttpSimpleParameters.Of("_id", MovementId));
            return JObject.Parse(jsonResult);
        }
    }
}