using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using dotenv.net;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using App.Requirement;
using Microsoft.AspNetCore.Authorization;
using App.Authorization;
using Microsoft.OpenApi.Models;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureAppConfiguration((configBuilder) =>
{
    configBuilder.Sources.Clear();
    DotEnv.Load();
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
        options.AddPolicy("read:admin-messages", policy =>
        {
            policy.Requirements.Add(new RbacRequirement("read:admin-messages"));
        });
    });

    services.AddSingleton<IAuthorizationHandler, RbacHandler>();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "ApiPlayground", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Name = HeaderNames.Authorization,
        });
        // dont add global security requirement
        // c.AddSecurityRequirement(/*...*/);
        c.OperationFilter<SecureEndpointAuthRequirementFilter>();
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
    var value = app.Configuration.GetValue<string>(key);

    if (value == "" || value == null)
    {
        throw new Exception($"Config variable missing: {key}.");
    }
}

app.Urls.Add(
    $"http://+:{app.Configuration.GetValue<string>("PORT")}");

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
