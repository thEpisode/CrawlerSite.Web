using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CrawlerSite.Controllers
{
    public class SettingsController : Controller
    {
        public IActionResult Index() => View();
    }
}