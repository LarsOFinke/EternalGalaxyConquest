using Microsoft.EntityFrameworkCore;

namespace CSharpApi.Data
{
    public class EternalDatabaseContext : DbContext
    {
        public EternalDatabaseContext(DbContextOptions options) : base(options) {}
    }
}
