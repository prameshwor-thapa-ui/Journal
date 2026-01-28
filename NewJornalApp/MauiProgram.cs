using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using NewJornalApp.Data;
using Microsoft.Maui.Storage;
using System.IO;

namespace NewJornalApp;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
			});

		builder.Services.AddMauiBlazorWebView();

#if DEBUG
		builder.Services.AddBlazorWebViewDeveloperTools();
		builder.Logging.AddDebug();
#endif
			// Configure EF Core SQLite

			var dbFolder = FileSystem.AppDataDirectory;
			var dbPath = Path.Combine(dbFolder, "journals_auth.db");
			builder.Services.AddDbContext<JournalsDbContext>(options =>
				options.UseSqlite($"Data Source={dbPath}"));

			// Journal service
			builder.Services.AddScoped<NewJornalApp.Services.JournalService>();
			builder.Services.AddScoped<NewJornalApp.Services.IAuthService, NewJornalApp.Services.AuthService>();
			builder.Services.AddScoped<Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider, NewJornalApp.Auth.CustomAuthenticationStateProvider>();
			builder.Services.AddAuthorizationCore();

			var app = builder.Build();

			// Ensure database exists (initial simple approach)
			using (var scope = app.Services.CreateScope())
			{
				var db = scope.ServiceProvider.GetRequiredService<JournalsDbContext>();
				db.Database.EnsureCreated();

				// Seed sample entry if none
				if (!db.Journals.Any())
				{
					db.Journals.Add(new Models.Journal
					{
						Title = "Welcome",
						Content = "This is your first journal entry. You can write new entries using the Write feature.",
						Emoji = "😊",
						Date = DateTime.Now,
						CreatedAt = DateTime.UtcNow
					});
					db.SaveChanges();
				}
			}

			return app;
	}
}
