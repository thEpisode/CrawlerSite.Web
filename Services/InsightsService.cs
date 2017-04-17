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
    public class InsightsService
    {
        private ConnectionService _connection;

        public InsightsService()
        {
            _connection = new ConnectionService();
        }

        public string GetSiteScreenshotUrl(string Id, string Token)
        {
            return _connection.GetApiServiceUri() + "/Insights/HeatmapScreenshotById/" + Id;
        }

        public string GetSocketUrl(string Token)
        {
            return _connection.GetServiceUri();
        }

        public async Task<dynamic> GetSiteHeatmapData(string ApiKey, int? MinWidth, int? MaxWidth, string Type, int? MaxTime, bool? Flash, string Browser, string OperatingSystem, bool? Cookies, string Location, string Endpoint, string token)
        {
            string jsonResult = await _connection.GetDataAsync("Insights/HeatmapData/ApiKey/" + ApiKey + 
                                                                "/MinWidth/" + ((MinWidth != null) ? MinWidth.ToString() : "null") + 
                                                                "/MaxWidth/" + ((MaxWidth != null) ? MaxWidth.ToString() : "null") + 
                                                                "/Type/" + (Type != null ? Type : "null") + 
                                                                "/MaxTime/" + ((MaxTime != null) ? MaxTime.ToString() : "null") +
                                                                "/Flash/" + ((Flash != null) ? Flash.ToString() : "null") +
                                                                "/Browser/" + (Browser != null ? Browser : "null") +
                                                                "/OperatingSystem/" + (OperatingSystem != null ? OperatingSystem : "null") +
                                                                "/Cookies/" + ((Cookies != null) ? Cookies.ToString() : "null") +
                                                                "/Location/" + (Location != null ? Location : "null") +
                                                                "/Endpoint/" + (Endpoint != null ? Endpoint : "null") , 
                                                                token);
            return JObject.Parse(jsonResult);
        }
    }
}