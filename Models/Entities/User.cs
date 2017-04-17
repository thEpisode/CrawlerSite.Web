using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApplication.Models.Entities
{
    public class User
    {
        public string _id { get; set; }
        public string FirstName;
        public string LastName;
        public string Email;
        public string Password;
        public int State;
        public string[] Work;
        public string City { get; set; }
        public string Country { get; set; }
        public bool AcceptTerms { get; set; }
        public object[] Settings { get; set; }
    }
}