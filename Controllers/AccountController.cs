using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using WebApplication.Services;

namespace WebApplication.Controllers
{
    public class AccountController : Controller
    {
        public AccountService _accountService { get; set; }
        public AccountController()
        {
            _accountService = new AccountService();
        }

        public IActionResult Index() => View();

        public IActionResult ChangePassword() => View();

        public IActionResult DeleteAccount() => View();

        [HttpPost]
        public async Task<JsonResult> ChangePasswordByUserId(string UserId, string OldPassword, string NewPassword)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);
            
            if(!String.IsNullOrEmpty(token))
            {
                object userdData = new 
                {
                    UserId = UserId,
                    OldPassword = OldPassword,
                    NewPassword = NewPassword
                };

                dynamic result = await _accountService.ChangePasswordByUserId(userdData, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }

        [HttpPost]
        public async Task<JsonResult> DeleteAccountByUserId(string UserId)
        {
            string token = WebApplication.Utils.Token.Get(Request.Headers);

            if(!String.IsNullOrEmpty(token))
            {
                object userdData = new 
                {
                    UserId = UserId
                };

                dynamic result = await _accountService.DeleteAccountByUserId(userdData, token);
                return Json(result);
            }
            return Json(new { success= false, message= "Something went wrong when retrieving data, try again." });
        }
    }
}