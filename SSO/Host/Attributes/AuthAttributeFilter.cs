using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using OtusHighload.Services;

namespace OtusHighload.Attributes;

public class AuthAttribute : TypeFilterAttribute
{
    public AuthAttribute() : base(typeof(AuthAttributeFilter))
    {
    }
}

public class AuthAttributeFilter : IAuthorizationFilter
{
    private readonly IAuthStoreService storeService;

    public AuthAttributeFilter(IAuthStoreService storeService)
    {
        this.storeService = storeService;
    }


    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var token = context.HttpContext.Request.Headers["x-token"].ToString();
        if (string.IsNullOrWhiteSpace(token) || storeService.GetId(Guid.Parse(token)) == null)
            context.Result = new ForbidResult();
    }
}
