using System;
using System.Collections.Generic;
using System.Linq;

namespace CrawlerSite.Models.Entities
{

    public class HeatmapEvent
    {
        public Coordinates Position { get; set; }
        public Coordinates Scroll { get; set; }
        public int TimeStamp { get; set; }
        public object Client { get; set; }
        public object Location { get; set; }
    }
}