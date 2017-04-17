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
    public class AccountService
    {
        private ConnectionService _connection;

        public AccountService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> ChangePasswordByUserId(object customerData, string Token)
        {
            string jsonResult = await _connection.PostData("User/ChangePasswordByUserId", Token, customerData);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> DeleteAccountByUserId(object customerData, string Token)
        {
            string jsonResult = await _connection.PostData("User/DeleteAccountByUserId", Token, customerData);
            return JObject.Parse(jsonResult);
        }
    }
}