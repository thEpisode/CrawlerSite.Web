using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Services;

namespace WebApplication.Controllers
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
        public async Task<JsonResult> GenerateEarlyBirdVoucher(string email)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                object voucherData = new {
                    Prefix = "eb-",
                    Length = 10,
                    Email = email,
                    Amount = 999,
                    Currency = "USD"
                };

                dynamic result = await _voucherService.GenerateVoucher(voucherData, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again.", result = null });
        }

        [HttpPost]
        public async Task<JsonResult> VerifyVoucher(string VoucherId)
        {
            if(!String.IsNullOrEmpty(token))
            {
                dynamic result = await _voucherService.VerifyVoucher(VoucherId);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again.", result = null });
        }
    }
}