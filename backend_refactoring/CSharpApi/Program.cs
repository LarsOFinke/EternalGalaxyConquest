using System.Text.Json;
using System.Text.Json.Serialization;
using CSharpApi.Controllers.WebSocketController;
using CSharpApi.Data;
using CSharpApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSignalR();

builder.Services.AddCors();

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


// Adding ENUM to String Converter with SnakeCaseLower Naming Policy
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.SnakeCaseLower));
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
});

app.MapStaticAssets();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapHub<WebSocketEndpoints>("/we-test");

app.Run();