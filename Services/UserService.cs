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
    public class UserService
    {
        private ConnectionService _connection;

        public UserService()
        {
            _connection = new ConnectionService();
        }


        public async Task<dynamic> AuthenticateUser(string Email, string Password)
        {
            string jsonResult = await _connection.PostData("User/GetByCredentials", String.Empty,
                                                HttpSimpleParameters.Of("Email", Email),
                                                HttpSimpleParameters.Of("Password", Password));

            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> RegisterUser(object user)
        {
            string jsonResult = await _connection.PostData("User/Create", String.Empty, user);

            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetUserById(string UserId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("User/Id/" + UserId, Token, HttpComposedParameters.Of("UserId", UserId));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllUser(string Token)
        {
            string jsonResult = await _connection.GetDataAsync("User/All", Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> CreateUser(object user, string Token)
        {
            string jsonResult = await _connection.PostData("User/Create", Token, user);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> AddUserToSubscription(object user, string Token)
        {
            string jsonResult = await _connection.PostData("User/createUserToSubscription", Token, user);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> EditUser(User user, string Token)
        {
            string jsonResult = await _connection.SimplePostData("User/EditByUserId", Token, user);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> DeleteUser(string UserId, string Token)
        {
            string jsonResult = await _connection.SimplePostData("User/DeleteByUserId", Token, HttpSimpleParameters.Of("UserId", UserId));
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllUserOfSubscriptionByUserId(string UserId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("User/GetAllUsersOfSubscriptionByUserId/" + UserId, Token);
            return JObject.Parse(jsonResult);
        }
    }
}