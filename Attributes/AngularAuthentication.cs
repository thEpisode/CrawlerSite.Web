using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Core;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.Net.Http.Headers;

namespace CrawlerSite.Attributes
{
    public class AuthenticateAttribute : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var headersDictionary = context.HttpContext.Request.Headers;
            string tokenHeader = headersDictionary["x-access-token"].ToString();
            if(String.IsNullOrEmpty(tokenHeader)){
                var descriptor = context.ActionDescriptor as ControllerActionDescriptor;

                if (descriptor != null)
                {
                    if(descriptor.ControllerName  == "Dashboard" && descriptor.ActionName == "Index")
                    {
                        var parameters = descriptor.MethodInfo.GetParameters();
                        bool hasToken = false;
                        foreach (var parameter in parameters)
                        {
                            if(parameter.Name == "AuthToken")
                            {
                                hasToken = true;
                            }
                        }
                        if(!hasToken) 
                                context.Result = new RedirectToActionResult("Login", "Home", null);
                    }
                    else
                    {
                        context.Result = new RedirectToActionResult("Login", "Home", null);
                    }
                }
            }
            
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // do something after the action executes
        }

        
    }
}