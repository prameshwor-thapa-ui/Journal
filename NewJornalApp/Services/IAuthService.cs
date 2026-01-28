using NewJornalApp.Models;

namespace NewJornalApp.Services
{
    public interface IAuthService
    {
        Task<User?> LoginAsync(string username, string password);
        Task<User> RegisterAsync(string username, string password);
        Task<bool> UserExistsAsync(string username);
    }
}
