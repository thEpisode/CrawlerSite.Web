using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace CrawlerSite.Utils
{
    public static class Token
    {
        public static string Get(IHeaderDictionary headers)
        {
            string token = String.Empty;

            foreach (var item in headers)
            {
                if(item.Key == "x-access-token")
                {
                    token = item.Value;
                    break;
                }
            }

            return token;
        }
    }
}