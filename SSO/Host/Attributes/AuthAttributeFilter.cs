using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using OtusHighload.Services;

namespace OtusHighload.Attributes;

public class AuthAttribute : ActionFilterAttribute
{
    private IAuthStoreService? storeService;

    public override void OnActionExecuting(ActionExecutingContext context)
    {var token = context.HttpContext.Request.Headers["x-token"].ToString();
        if (string.IsNullOrWhiteSpace(token) || GetService(context).GetId(Guid.Parse(token)) == null)
            context.Result = new UnauthorizedResult();
        else
            base.OnActionExecuting(context);
    }
    private IAuthStoreService GetService(ActionExecutingContext context)
    {
        if (storeService != null) return storeService;
        var svc = context.HttpContext.RequestServices;
        storeService = svc.GetService<IAuthStoreService>();
        return storeService!;
    }
}
