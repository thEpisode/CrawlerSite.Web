using System;
using System.Collections.Generic;
using System.Linq;

namespace CrawlerSite.Models.Entities
{
    public class Feedback
    {
        public string UserId { get; set; }
        public string Path { get; set; }
        public bool Like { get; set; }
        public string Description { get; set; }
        public string Logs { get; set; }
        public bool ReportBug { get; set; }
        public string Version { get; set; }
    }
}