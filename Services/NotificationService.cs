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
    public class NotificationService
    {
        private ConnectionService _connection;

        public NotificationService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> GetNotificationsById(string UserId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Notification/UserId/" + UserId, Token);
            return JObject.Parse(jsonResult);
        }
        
        public async Task<dynamic> GetNotificationById(string NotificationId, string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Notification/Id/" + NotificationId, Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> GetAllNotification(string Token)
        {
            string jsonResult = await _connection.GetDataAsync("Notification/All", Token);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> CreateNotification(Notification notification, string Token)
        {
            string jsonResult = await _connection.PostData("Notification/Create", Token, notification);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> EditNotification(Notification notification, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Notification/Edit", Token, notification);
            return JObject.Parse(jsonResult);
        }

        public async Task<dynamic> DeleteNotification(string NotificationId, string Token)
        {
            string jsonResult = await _connection.SimplePostData("Notification/Delete", Token, HttpSimpleParameters.Of("_id", NotificationId));
            return JObject.Parse(jsonResult);
        }
    }
}