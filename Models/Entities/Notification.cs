using System;
using System.Collections.Generic;
using System.Linq;

namespace CrawlerSite.Models.Entities
{
    public class Notification
    {
        public string _id { get; set; }
        public string UserId {get; set;}
        public string ShortMessage;
        public string LongMessage;
        public string Uri;
        public string Type;
        public int State;
    }
}