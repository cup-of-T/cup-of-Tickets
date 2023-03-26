using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using dotenv.net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using TicketsServer.Api.Requirement;
using TicketsServer.Api.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureAppConfiguration((configBuilder) =>
{
    // DotEnv.Load();
    configBuilder.AddEnvironmentVariables();
});

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.AddServerHeader = false;
});



builder.Services.AddControllers();
builder.Host.ConfigureServices(services =>
{
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            var audience =
                  builder.Configuration.GetValue<string>("AUTH0_AUDIENCE");

            options.Authority =
                  $"https://{builder.Configuration.GetValue<string>("AUTH0_DOMAIN")}/";
            options.Audience = audience;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuerSigningKey = true
            };
        });

    services.AddAuthorization(options =>
    {
        options.AddPolicy("delete:ticket", policy =>
        {
            policy.Requirements.Add(new RbacRequirement("delete:ticket"));
        });
    });

    services.AddSingleton<IAuthorizationHandler, RbacHandler>();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "My Api", Version = "v1" });
    opt.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Scheme = "bearer"
    });
    opt.OperationFilter<SecureEndpointAuthRequirementFilter>();
});

builder.Services.AddDbContext<DbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationDbContext")));

var app = builder.Build();

var requiredVars =
    new string[] {
          "PORT",
          "CLIENT_ORIGIN_URL",
          "AUTH0_DOMAIN",
          "AUTH0_AUDIENCE",
    };


foreach (var key in requiredVars)
{
    var value = Environment.GetEnvironmentVariable(key);
    if (value == "" || value == null)
    {
        throw new Exception($"Config variable missing: {key}.");
    }
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(cors =>
   {
       cors.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
   });

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
