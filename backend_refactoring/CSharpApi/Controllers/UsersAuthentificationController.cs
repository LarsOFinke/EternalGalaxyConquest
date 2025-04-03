using CSharpApi.Data;
using CSharpApi.Models.Entities;
using CSharpApi.Models.Entities.DTOs;
using CSharpApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CSharpApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersAuthentificationController(IAuthService authService) : ControllerBase
{

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(UserDto request)
    {
        var user = await authService.RegisterAsync(request);

        if (user is null)
        {
            return BadRequest($"Unable to register USER: {request.Username}");
        }

        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenResponseDto?>> Login(UserDto request)
    {
        var result = await authService.LoginAsync(request);

        if (result is null)
        {
            return BadRequest("Invalid Username or Password!");    
        }

        return Ok(result);
    }

    [Authorize]
    [HttpGet]
    public IActionResult AuthenticatedUserTest() 
    { 
        return Ok("You're Authenticated"); 
    }
    
    [Authorize(Roles = "Admin")]
    [HttpGet("admin")]
    public IActionResult AuthenticatedAdminTest() 
    { 
        return Ok("You're Authenticated"); 
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenRequestDto refreshToken)
    {
        var result = await authService.RefreshTokensAsync(refreshToken);

        if (result is null || result.AccessToken is null || result.RefreshToken is null)
        {
            return Unauthorized("Invalid refresh token");
        }

        return Ok(result);
    }
    
}
