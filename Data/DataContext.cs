using Data.Configuration;
using Data.Entity;
using Microsoft.EntityFrameworkCore;    

namespace Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Video> Video { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Video>(new VideoConfiguration().Configure);
            base.OnModelCreating(builder);
        }
    }
}
