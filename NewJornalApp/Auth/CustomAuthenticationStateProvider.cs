using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;
using NewJornalApp.Models;
using NewJornalApp.Services;

namespace NewJornalApp.Auth
{
    public class CustomAuthenticationStateProvider : AuthenticationStateProvider
    {
        private readonly IAuthService _authService;
        private User? _currentUser;

        public CustomAuthenticationStateProvider(IAuthService authService)
        {
            _authService = authService;
        }

        public override Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            var identity = _currentUser == null
                ? new ClaimsIdentity()
                : new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, _currentUser.Id.ToString()),
                    new Claim(ClaimTypes.Name, _currentUser.Username),
                }, "CustomAuth");

            var user = new ClaimsPrincipal(identity);
            return Task.FromResult(new AuthenticationState(user));
        }

        public async Task Login(string username, string password)
        {
            var user = await _authService.LoginAsync(username, password);
            if (user != null)
            {
                _currentUser = user;
                NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
            }
            else
            {
                throw new Exception("Invalid credentials");
            }
        }

        public void Logout()
        {
            _currentUser = null;
            NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
        }
    }
}
