using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace NewJornalApp.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<JournalsDbContext>
    {
        public JournalsDbContext CreateDbContext(string[] args)
        {
            var folder = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData) ?? Directory.GetCurrentDirectory();
            var dbPath = Path.Combine(folder, "journals.db");
            var builder = new DbContextOptionsBuilder<JournalsDbContext>();
            builder.UseSqlite($"Data Source={dbPath}");
            return new JournalsDbContext(builder.Options);
        }
    }
}