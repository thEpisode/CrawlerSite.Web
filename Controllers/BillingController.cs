using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using WebApplication.Services;

namespace WebApplication.Controllers
{
    public class BillingController : Controller
    {
        public BillingService _billingService { get; set; }
        public BillingController()
        {
            _billingService = new BillingService();
        }

        public IActionResult Index() => View();

        public IActionResult PlanDetail() => View();

        public IActionResult BillingHistory() => View();

        [HttpPost]
        public async Task<JsonResult> SubscribeToPlan(string Plan, string Email, string Description, string StripeToken, string Firstname, string Lastname)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            object customerData = new 
            {
                Plan = Plan,
                Email = Email,
                Description = Description,
                StripeToken = StripeToken,
                Firstname = Firstname,
                Lastname = Lastname
            };

            dynamic result = await _billingService.SubscribeToPlan(customerData, token);
            return Json(result);
        }

        [HttpGet]
        public async Task<JsonResult> GetAllPlans()
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            dynamic result = await _billingService.GetAllPlans(token);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> ChangePlan(string PlanId, string UserId)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            object customerData = new {
                PlanId = PlanId,
                UserId = UserId
            };

            dynamic result = await _billingService.ChangePlan(customerData, token);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> GetCustomerByUserId(string UserId, string CustomerId)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            object customerData = new 
            {
                UserId = UserId,
                CustomerId = CustomerId
            };

            dynamic result = await _billingService.GetCustomerByUserId(customerData, token);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> GetChargesByUserId(string UserId)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            object customerData = new 
            {
                UserId = UserId
            };

            dynamic result = await _billingService.GetChargesByUserId(customerData, token);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> GetSubscriptionByUserId(string UserId)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            object customerData = new 
            {
                UserId = UserId
            };

            dynamic result = await _billingService.GetSubscriptionByUserId(customerData, token);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> CheckIfHasNoPaymentMethodByUserId(string UserId)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _billingService.CheckIfHasNoPaymentMethodByUserId(UserId, token);

                return Json(result);
            }

            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }
    }
}