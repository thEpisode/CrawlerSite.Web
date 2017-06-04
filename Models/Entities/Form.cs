using System;
using System.Collections.Generic;
using System.Linq;

namespace CrawlerSite.Models.Entities
{
    public class Form
    {
        public string ApiKey { get; set; }
        public string Name { get; set; }
        public string[] Tags { get; set; }
        public string Path { get; set; }
        public int State { get; set; }
    }
}