using CSharpApi.Models.Entities.DTOs;
using CSharpApi.Models.Entities;

namespace CSharpApi.Services
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserDto request);

        Task<TokenResponseDto?> LoginAsync(UserDto request);

        Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);

    }
}
