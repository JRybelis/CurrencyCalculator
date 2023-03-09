using CurrencyCalculator.Core.Interfaces.Services;
using CurrencyCalculator.Core.Interfaces.Services.Web;
using CurrencyCalculator.Core.Interfaces.Services.Validators;
using CurrencyCalculator.Core.Services;
using CurrencyCalculator.Core.Validation;
using CurrencyCalculator.Core.Services.Web;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", b =>
    b.AllowAnyHeader()
    .AllowAnyOrigin()
    .AllowAnyMethod());
});

builder.Services.Configure<BankOfLithuaniaClientSettings>(
    builder.Configuration.GetSection("BankOfLithuaniaClientSettings"));

builder.Host.UseSerilog((ctx, lc) =>
    lc.WriteTo.Console()
    .ReadFrom.Configuration(ctx.Configuration));

builder.Services.AddSingleton<IBankOfLithuaniaClientSettings>((_) => builder.Configuration
    .GetSection("BankOfLithuaniaClientSettings")
    .Get<BankOfLithuaniaClientSettings>());
builder.Services.AddScoped<IBankOfLithuaniaClient, BankOfLithuaniaClient>();
builder.Services.AddScoped<ICurrencyCalculatorService, CurrencyCalculatorService>();
builder.Services.AddScoped<IResultParser, ResultParser>();
builder.Services.AddScoped<IDateValidation, DateValidation>();

builder.Services.AddResponseCaching(options =>
{
    options.MaximumBodySize = 1024;
    options.UseCaseSensitivePaths = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseResponseCaching();

app.Use(async (context, next) =>
{
    context.Response.GetTypedHeaders().CacheControl =
        new Microsoft.Net.Http.Headers.CacheControlHeaderValue()
        {
            Public = true,
            MaxAge = TimeSpan.FromSeconds(10)
        };
    context.Response.Headers[Microsoft.Net.Http.Headers.HeaderNames.Vary] =
        new[] {"Accept-Encoding"};

    await next();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
