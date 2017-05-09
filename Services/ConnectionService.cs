using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

using WebApplication.Models.Entities;
using WebApplication.Utils;
using WebApplication;

namespace WebApplication
{
    public class ConnectionService
    {
        public HttpClient _client;
        private string _serviceUri;
        private string _uri;

        public ConnectionService()
        {
            _client = new HttpClient();
            _serviceUri = AppSettings.ApiUri;
            _uri = AppSettings.Uri;
        }

        public string GetApiServiceUri()
        {
            return _serviceUri;
        }

        public string GetServiceUri()
        {
            return _uri;
        }

        public async Task<string> PostData(string action, string Token, params KeyValuePair<string, string>[] HttpParameters)
        {
            string uri = string.Format("{0}/{1}", _serviceUri, action);

            _client.DefaultRequestHeaders.Add("x-access-token", Token);

            HttpContent keyValues = new FormUrlEncodedContent(HttpPostEncodedBuilder(HttpParameters));

            var response = await _client.PostAsync(uri, keyValues);
            
            string content = await response.Content.ReadAsStringAsync();
            if(!String.IsNullOrEmpty(content)){
                 return content;
            }
            return String.Empty;
        }

        public async Task<string> PostData(string action, string Token, object HttpParameters)
        {
            string uri = string.Format("{0}/{1}", _serviceUri, action);

             _client.DefaultRequestHeaders.Add("x-access-token", Token);

            string keyValues = JsonConvert.SerializeObject(HttpParameters);

            var buffer = System.Text.Encoding.UTF8.GetBytes(keyValues);
            var byteContent = new ByteArrayContent(buffer);

            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await _client.PostAsync(uri, byteContent);
            
            string content = await response.Content.ReadAsStringAsync();
            if(!String.IsNullOrEmpty(content)){
                 return content;
            }
            return String.Empty;
        }

        public async Task<string> SimplePostData(string action, string Token, params KeyValuePair<string, string>[] HttpParameters)
        {
            string uri = string.Format("{0}/{1}", _serviceUri, action);

            _client.DefaultRequestHeaders.Add("x-access-token", Token);

            HttpContent keyValues = new FormUrlEncodedContent(HttpPostEncodedBuilder(HttpParameters));

            var response = await _client.PostAsync(uri, keyValues);
            
            string content = await response.Content.ReadAsStringAsync();
            if(!String.IsNullOrEmpty(content)){
                 return content;
            }
            return String.Empty;
        }

        public async Task<string> SimplePostData(string action, string Token, object HttpParameters)
        {
            string uri = string.Format("{0}/{1}", _serviceUri, action);

             _client.DefaultRequestHeaders.Add("x-access-token", Token);

            string keyValues = JsonConvert.SerializeObject(HttpParameters);

            var buffer = System.Text.Encoding.UTF8.GetBytes(keyValues);
            var byteContent = new ByteArrayContent(buffer);

            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await _client.PostAsync(uri, byteContent);
            
            string content = await response.Content.ReadAsStringAsync();
            if(!String.IsNullOrEmpty(content)){
                 return content;
            }
            return String.Empty;
        }

        public async Task<string> GetDataAsync(string action, string Token)
        {
            _client.DefaultRequestHeaders.Add("x-access-token", Token);

            string uri = string.Format("{0}/{1}", _serviceUri, action);
            
            string result = String.Empty;

            try
            {
                result = await _client.GetStringAsync(uri);
            }
            catch (HttpRequestException ex)
            {
                result = ProcessHttpErrorString(ex);
            }
            catch(Exception exc)
            {
                result = exc.Message;
            }
            return result;
        }

        public async Task<string> GetDataAsync(string action, string Token, params KeyValuePair<string, object>[] HttpParameters)
        {
            string uri = string.Format("{0}/{1}{2}", _serviceUri, action, HttpParametersBuilder(HttpParameters));

            _client.DefaultRequestHeaders.Add("x-access-token", Token);
            
            return await _client.GetStringAsync(uri);
        }
        
        private IEnumerable<KeyValuePair<string, string>> HttpPostEncodedBuilder(KeyValuePair<string, string>[] httpParameters)
        {
            List<KeyValuePair<string, string>> keyValues = new List<KeyValuePair<string, string>>();
            for (int i = 0; i < httpParameters.Length; i++)
            {
                keyValues.Add(httpParameters[i]);
            }
            return keyValues;
        }

        private string HttpPostParametersBuilder(KeyValuePair<string, object>[] httpParameters)
        {
            string stringParameters = "[";

            for (int i = 0; i < httpParameters.Length; i++)
            {
                stringParameters += "{";
                stringParameters += httpParameters[i].Key + ":" + httpParameters[i].Value;
                stringParameters += "}";
                if (i < httpParameters.Length - 1)
                {
                    stringParameters += ",";
                }
            }

            stringParameters += "]";

            return stringParameters;
        }

        private string HttpParametersBuilder(KeyValuePair<string, object>[] httpParameters)
        {
            string stringParameters = String.Empty;

            for (int i = 0; i < httpParameters.Length; i++)
            {
                if (i==0)
                {
                    stringParameters = "?";
                }
                stringParameters += httpParameters[i].Key + "=" + httpParameters[i].Value + "&";
            }
            stringParameters = stringParameters.Remove(stringParameters.Length - 1);

            return stringParameters;
        }
        
        private string ProcessHttpErrorString(HttpRequestException ex)
        {
            if(ex.HResult == -2146233088)
            {
                return "{success: false, message: \"No token provided. Please login again.\"}";
            }
            else
            {
                return "{success: false, message: \"Something went wrong.\"}";
            }
        }
    }
}