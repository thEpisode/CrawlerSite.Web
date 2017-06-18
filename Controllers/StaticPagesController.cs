using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CrawlerSite.Controllers
{
    public class ServicesController : Controller
    {
        public IActionResult Index() => View();
    }
    public class PricingController : Controller
    {
        public IActionResult Index() => View();
    }
    public class SupportController : Controller
    {
        public IActionResult Index() => View();
    }
    public class DocumentationController : Controller
    {
        public IActionResult Index() => View();
    }
    public class CasesController : Controller
    {
        public IActionResult Index() => View();
    }
    public class CompanyController : Controller
    {
        public IActionResult WhyUs() => View();
        public IActionResult Events() => View();
        public IActionResult AboutUs() => View();
        public IActionResult Partners() => View();
        public IActionResult NonProfits() => View();
    }
    public class ContactController : Controller
    {
        public IActionResult Index() => View();
    }
    public class LegalController : Controller
    {
        public IActionResult Terms() => View();
        public IActionResult PrivacyPolicy() => View();
        public IActionResult Cookies() => View();
        public IActionResult Security() => View();
        public IActionResult NonProfits() => View();
    }
    public class BlogController : Controller
    {
        public IActionResult Index() => View();
    }
}