using CSharpApi.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CSharpApi.Data
{
    public class EternalDatabaseContext(DbContextOptions<EternalDatabaseContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
    }
}
