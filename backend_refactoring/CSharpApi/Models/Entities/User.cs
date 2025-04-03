namespace CSharpApi.Models.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.CreateVersion7(DateTime.UtcNow);
    public string Username { get; set;} = string.Empty;
    public string PasswordHash { get; set;} = string.Empty;
    public string Role { get; set;} = string.Empty;
    public string? RefreshToken { get; set;}

    public DateTime? RefreshTokenExpiryTime { get; set;}

    public User()
    {
        Id = Guid.CreateVersion7(DateTime.UtcNow);
    }
}