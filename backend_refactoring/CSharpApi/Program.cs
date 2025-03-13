using CSharpApi.Data;
using CSharpApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<EternalDatabaseContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("DevContext")));
}
else
{
    builder.Services.AddDbContext<EternalDatabaseContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("ProdContext")));
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();