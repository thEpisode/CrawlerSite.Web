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

        //public IActionResult Index() => View();

        [HttpPost]
        public async Task<JsonResult> VerifyVoucher(string VoucherId)
        {
            dynamic result = await _voucherService.VerifyVoucher(VoucherId);
            return Json(result);
        }
    }
}