using System;
using System.Collections.Generic;
using System.Linq;

namespace CrawlerSite.Models.Entities
{
    public class Site
    {
        public string _id { get; set; }
        public string[] UsersId;
        public string Name;
        public string Url;
        public string[] Tags;
        public int State;
        public string ApiKey;
        public dynamic Track;
    }
}