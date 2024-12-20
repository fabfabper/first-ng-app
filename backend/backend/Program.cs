using backend;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder.WithOrigins("http://localhost:50468")
        .SetIsOriginAllowed((host) => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

// Add services to the container.
builder.Services.AddSignalR();
builder.Services.AddSingleton<ServiceBusConnector>();
builder.Services.AddHostedService<ServiceBusBackgroundService>();
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
//builder.Services.AddAuthentication(options =>
//{
//    // Identity made Cookie authentication the default.
//    // However, we want JWT Bearer Auth to be the default.
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//}).AddJwtBearer(options =>
//{
//    // Configure the Authority to the expected value for
//    // the authentication provider. This ensures the token
//    // is appropriately validated.
//    options.Authority = "Authority URL"; // TODO: Update URL

//    // We have to hook the OnMessageReceived event in order to
//    // allow the JWT authentication handler to read the access
//    // token from the query string when a WebSocket or 
//    // Server-Sent Events request comes in.

//    // Sending the access token in the query string is required when using WebSockets or ServerSentEvents
//    // due to a limitation in Browser APIs. We restrict it to only calls to the
//    // SignalR hub in this code.
//    // See https://docs.microsoft.com/aspnet/core/signalr/security#access-token-logging
//    // for more information about security considerations when using
//    // the query string to transmit the access token.
//    options.Events = new JwtBearerEvents
//    {
//        OnMessageReceived = context =>
//        {
//            var accessToken = context.Request.Query["access_token"];

//            // If the request is for our hub...
//            var path = context.HttpContext.Request.Path;
//            if (!string.IsNullOrEmpty(accessToken) &&
//                (path.StartsWithSegments("/signalr-hub")))
//            {
//                // Read the token out of the query string
//                context.Token = accessToken;
//            }
//            return Task.CompletedTask;
//        }
//    };
//});

var app = builder.Build();

app.UseCors("CorsPolicy");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHub<SignalrHub>("/signalr-hub");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
