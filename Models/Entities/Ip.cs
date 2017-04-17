using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication.Models.Entities
{
    public class Ip
    {
        public string _id { get; set; }
        public string ApiKey { get; set; }
        public string IP { get; set; }
        public string Name { get; set; }
        public int State { get; set; }
        public string SiteRule { get; set; }
    }
}