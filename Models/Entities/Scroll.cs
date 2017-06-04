using System;
using System.Collections.Generic;
using System.Linq;

namespace CrawlerSite.Models.Entities
{
    public class Scroll
    {
        public string _id { get; set; }
        public string ApiKey;
        public HeatmapEvent Event;
        public string Pathname;
        public int State;
    }
}