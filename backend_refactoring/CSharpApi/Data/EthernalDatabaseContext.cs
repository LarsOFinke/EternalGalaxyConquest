using Microsoft.EntityFrameworkCore;

namespace CSharpApi.Data
{
    public class EthernalDatabaseContext : DbContext
    {
        public EthernalDatabaseContext(DbContextOptions options) : base(options) {}
    }
}
