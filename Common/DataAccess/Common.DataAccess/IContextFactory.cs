using Microsoft.EntityFrameworkCore;

namespace UZ.DataAccess
{
    public interface IContextFactory
    {
        DbContext Get();
    }
}