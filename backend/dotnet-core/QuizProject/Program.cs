using Microsoft.EntityFrameworkCore;
using QuizProject.Helpers;
using QuizProject.Methods;
using QuizProject.Models;
using System.Text;
using Test;

namespace BookProject
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Test
            // Console.OutputEncoding = Encoding.Default;
            TestExport.Mainly(args);

            //Start
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddCors();
            builder.Services.AddSwaggerGen();
            string connectionString = builder.Configuration.GetConnectionString("QuizProject")!;
            builder.Services.AddDbContext<QuizProjectContext>(options => options.UseSqlServer(connectionString).UseLazyLoadingProxies());
            builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
            builder.Services.AddSingleton<ICategoryHelper, CategoryHelper>();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            };

            app.UseHttpsRedirection();

            app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}