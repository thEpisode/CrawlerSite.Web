using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CrawlerSite.Models.Entities;
using CrawlerSite.Services;
using CrawlerSite.Models.ViewModels;
using System.ComponentModel;
using Newtonsoft.Json.Linq;

namespace CrawlerSite.Controllers
{
    public class UserController : Controller
    {
        public UserService _userService { get; set; }

        public UserController()
        {
            _userService = new UserService();
        }

        public IActionResult Index() => View();

        public IActionResult Add() => View();

        public IActionResult Invited() => View();

        public IActionResult Edit(string id) => View();

        public IActionResult Delete(string id) => View();

        [HttpPost]
        public async Task<JsonResult> GetByCredentials(CredentialsViewModel credentials)
        {
            dynamic result = await _userService.AuthenticateUser(credentials.Email, credentials.Password);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> Register(RegisterViewModel userData)
        {
            dynamic result = await _userService.RegisterUser(new
            {
                FirstName = userData.FirstName,
                LastName = userData.LastName,
                Email = userData.Email,
                Password = userData.Password,
                Work = userData.Work,
                City = userData.City,
                Country = userData.Country,
                AcceptTerms = userData.AcceptTerms,
                State = userData.State,
                VoucherId = userData.VoucherCode
            });
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> AddUserToSubscription(string FirstName, string LastName, string Email, string Country, int State, string City, string Password, string[] Work, bool RandomPassword, bool ResetPassword, string UserId)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _userService.AddUserToSubscription(new
                {
                    FirstName = FirstName,
                    LastName = LastName,
                    Email = Email,
                    Country = Country,
                    City = City,
                    Password = Password,
                    Work = Work,
                    State = State,
                    RandomPassword = RandomPassword,
                    ResetPassword = ResetPassword,
                    UserId = UserId
                }, token);
                return Json(result);
            }

            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }

        [HttpPost]
        public async Task<JsonResult> CreateUser(string FirstName, string LastName, string Email, string Country, string City, string Site, string Password, string[] Work, Boolean AcceptTerms)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _userService.CreateUser(new User()
                {
                    FirstName = FirstName,
                    LastName = LastName,
                    Email = Email,
                    Country = Country,
                    City = City,
                    //Site= Site,
                    Password = Password,
                    Work = Work,
                    AcceptTerms = AcceptTerms,
                    State = 4 // Invited
                }, token);
                return Json(result);
            }

            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetUserById(string UserId)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _userService.GetUserById(UserId, token);
                return Json(result);
            }
            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }

        [HttpPost]
        public async Task<JsonResult> EditUser(string _id, string FirstName, string LastName, string Email, string City, string Country)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _userService.EditUser(new User()
                {
                    _id = _id,
                    FirstName = FirstName,
                    LastName = LastName,
                    Email = Email,
                    City = City,
                    Country = Country
                }, token);

                return Json(result);
            }
            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }

        [HttpPost]
        public async Task<JsonResult> DeleteUser(string _id)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _userService.DeleteUser(_id, token);
                return Json(result);
            }
            return Json(new { success = false, message = "Something went wrong when retrieving data, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetAllUser(string subscriptionId)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _userService.GetAllUser(token);

                return Json(result);
            }

            return Json(new { success = false, message = "Something went wrong when retrieving plans, try again." });
        }

        [HttpGet]
        public async Task<JsonResult> GetAllUserOfSubscriptionByUserId(string UserId)
        {
            string token = CrawlerSite.Utils.Token.Get(Request.Headers);

            if (!String.IsNullOrEmpty(token))
            {
                dynamic result = await _userService.GetAllUserOfSubscriptionByUserId(UserId, token);

                return Json(result);
            }

            return Json(new { success = false, message = "Something went wrong when retrieving plans, try again." });
        }
    }
}