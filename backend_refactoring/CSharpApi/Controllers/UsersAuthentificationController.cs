using CSharpApi.Data;
using CSharpApi.Models.Entities;
using CSharpApi.Models.Entities.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CSharpApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersAuthentificationController : ControllerBase
{
    public static User user = new();

    private readonly EternalDatabaseContext _context;

    public UsersAuthentificationController(EternalDatabaseContext context)
    {
        _context = context;
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
    
}
