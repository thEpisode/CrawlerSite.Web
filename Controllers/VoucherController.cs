using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CrawlerSite.Services;

namespace CrawlerSite.Controllers
{
    public class VoucherController : Controller
    {
        public VoucherService _voucherService { get; set; }

        public VoucherController()
        {
            _voucherService = new VoucherService();
        }

        public IActionResult GenerateEarlyBird() => View();

        [HttpPost]
        public async Task<JsonResult> GenerateEarlyBirdVoucher(string Email, string PlanId)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                object voucherData = new {
                    Prefix = "eb-",
                    Length = 10,
                    Email = Email,
                    PlanId = "basic",
                    Amount = 999,
                    Currency = "USD"
                };

                dynamic result = await _voucherService.GenerateVoucher(voucherData, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }

        [HttpPost]
        public async Task<JsonResult> VerifyVoucher(string VoucherId)
        {
            dynamic result = await _voucherService.VerifyVoucher(VoucherId);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> RedeemVoucher(string VoucherId, string UserId)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                object voucherData = new {
                    VoucherId = VoucherId,
                    UserId = UserId
                };

                dynamic result = await _voucherService.RedeemVoucherByUserId(voucherData, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }
    }
}