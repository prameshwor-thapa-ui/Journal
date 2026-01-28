using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using NewJornalApp.Data;
using NewJornalApp.Models;

namespace NewJornalApp.Services
{
    public class AuthService : IAuthService
    {
        private readonly JournalsDbContext _context;

        public AuthService(JournalsDbContext context)
        {
            _context = context;
        }

        public async Task<User?> LoginAsync(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
                return null;

            if (!VerifyPasswordHash(password, user.PasswordHash))
                return null;

            return user;
        }

        public async Task<User> RegisterAsync(string username, string password)
        {
            if (await UserExistsAsync(username))
                throw new Exception("Username already exists");

            var user = new User
            {
                Username = username,
                PasswordHash = HashPassword(password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> UserExistsAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            var hash = HashPassword(password);
            return hash == storedHash;
        }
    }
}
