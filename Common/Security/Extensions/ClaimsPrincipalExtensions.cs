using System.Security.Claims;

namespace Common.Security.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid GetUserId(this ClaimsPrincipal claims)
        {
            return Guid.Parse(claims.FindFirstValue("sub") ?? Guid.Empty.ToString());
        }

        public static IEnumerable<string> GetRoles(this ClaimsPrincipal claims)
        {
            return claims.Claims.Where(x => x.Type == "role").Select(x => x.Value).ToList();
        }

        public static bool IsAdmin(this ClaimsPrincipal claims)
        {
            return GetRoles(claims).Contains(SecurityConstants.AdminRoleName);
        }

        public static bool IsSuperAdmin(this ClaimsPrincipal claims)
        {
            return GetRoles(claims).Contains(SecurityConstants.SuperAdminRoleName);
        }
    }
}