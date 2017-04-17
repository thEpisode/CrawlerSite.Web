using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication.Models.Entities
{
    public class Price
    {
        public string _id { get; set; }
        public string Feature {get; set;}
        public string Value;
        public string Type;
        public string Description;
        public int State;
    }
}