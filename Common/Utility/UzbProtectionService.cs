using System.Text.Json;
using Microsoft.AspNetCore.DataProtection;

namespace Common.Utility
{
    public interface IUzbProtectionService
    {
        string Protect(string value);
        string Unprotect(string value);
        T UnprotectSerialized<T>(string value);
    }

    public class UzbProtectionService : IUzbProtectionService
    {
        private readonly IDataProtector _dataProtector;

        public UzbProtectionService(IDataProtectionProvider dataProtectionProvider)
        {
            _dataProtector = dataProtectionProvider.CreateProtector("uzb");
        }

        public string Protect(string value)
        {
            return _dataProtector.Protect(value);
        }

        public string Unprotect(string value)
        {
            return _dataProtector.Unprotect(value);
        }

        public T UnprotectSerialized<T>(string value)
        {
            return JsonSerializer.Deserialize<T>(_dataProtector.Unprotect(value));
        }
    }
}