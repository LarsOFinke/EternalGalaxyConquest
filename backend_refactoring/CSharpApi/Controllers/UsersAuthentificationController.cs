using CSharpApi.Data;
using CSharpApi.Models.Entities;
using CSharpApi.Models.Entities.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CSharpApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersAuthentificationController : ControllerBase
{
    public static User user = new();

    private readonly EternalDatabaseContext _context;
    private readonly IConfiguration _configuration;

    public UsersAuthentificationController(EternalDatabaseContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public ActionResult<User> Register(UserDto request)
    {
        var hashedPassword = new PasswordHasher<User>()
        .HashPassword(user, request.Password);    

        user.Username = request.Username;
        user.PasswordHash = hashedPassword;
        
        return Ok(user);

    }

    [HttpPost("login")]
    public ActionResult<string> Login(UserDto request)
    {
        if (user.Username != request.Username)
        {
            return BadRequest("User not found");
        }

        if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
        {
            return BadRequest("Incorrect password provided");
        }

        string token = CreateJwtToken(user);


        return Ok(token);
    }

    private string CreateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AppSettings:Token")!));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new JwtSecurityToken(
            issuer: _configuration.GetValue<string>("AppSettings:Issuer"),
            audience: _configuration.GetValue<string>("AppSettings:Audience"),
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: credentials
            );

           return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }
    
}
