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
    public class BillingService
    {
        private ConnectionService _connection;

        public BillingService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> SubscribeToPlan(object customerData, string Token)
        {
            string jsonResult = await _connection.PostData("Payment/Subscription/UpdatePaymentMethod", Token, customerData);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllPlans(string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Plans/All", Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> ChangePlan(object customerData, string Token)
        {
            string jsonResult = await _connection.PostData("Payment/Subscription/ChangePlan", Token, customerData);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetCustomerByUserId(object customerData, string Token)
        {
            string jsonResult = await _connection.PostData("Payment/GetCustomerByUserId", Token, customerData);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetChargesByUserId(object customerData, string Token)
        {
            string jsonResult = await _connection.PostData("Payment/GetChargesByUserId", Token, customerData);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetSubscriptionByUserId(object customerData, string Token)
        {
            string jsonResult = await _connection.PostData("Payment/GetSubscriptionByUserId", Token, customerData);
            return JObject.Parse(jsonResult);
        }
        
        public async Task<dynamic> CheckIfHasNoPaymentMethodByUserId (string UserId, string Token)
        {
            string jsonResult =await _connection.SimplePostData("Payment/CheckIfHasNoPaymentMethodByUserId", Token, HttpSimpleParameters.Of("UserId", UserId));
            return JObject.Parse(jsonResult);
        }
    }
}