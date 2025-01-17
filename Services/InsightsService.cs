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
    public class InsightsService
    {
        private ConnectionService _connection;

        public InsightsService()
        {
            _connection = new ConnectionService();
        }

        public async Task<dynamic> GetSiteScreenshot(string Id, string token)
        {
            string jsonResult = await _connection.GetDataAsync("Insights/HeatmapScreenshotById/" + Id, token);

            return JObject.Parse(jsonResult);            
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