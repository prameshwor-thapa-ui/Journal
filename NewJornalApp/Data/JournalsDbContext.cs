using Microsoft.EntityFrameworkCore;
using NewJornalApp.Models;

namespace NewJornalApp.Data
{
    public class JournalsDbContext : DbContext
    {
        public JournalsDbContext(DbContextOptions<JournalsDbContext> options) : base(options)
        {
        }

        public DbSet<Journal> Journals { get; set; }
        public DbSet<SecondaryMood> SecondaryMoods { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data with hashtags for testing
            modelBuilder.Entity<Journal>().HasData(
                new Journal
                {
                    Id = 1,
                    Title = "Welcome",
                    Content = "This is your first journal entry. You can write new entries using the Write feature. Try adding #hashtags like #welcome #journaling #productivity to see them in the Dashboard!",
                    Date = DateTime.Parse("2026-01-26"),
                    CreatedAt = DateTime.UtcNow,
                    Emoji = "😊",
                    Tags = "study, home, health"
                },
                new Journal
                {
                    Id = 2,
                    Title = "Hello from jacob",
                    Content = "hello from jacob. Today I worked on #coding and had a great time with #family. Feeling #grateful and #happy!",
                    Date = DateTime.Parse("2026-01-26"),
                    CreatedAt = DateTime.UtcNow,
                    Emoji = "😊",
                    Tags = "study, home, health"
                }
            );
        }
    }
}