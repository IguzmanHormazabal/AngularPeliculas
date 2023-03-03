namespace back_end
{
    using AutoMapper;
    using global::back_end.Controllers;
    using global::back_end.filtros;
    using global::back_end.Utilidades;
    //using back_end.Repositorios;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.HttpsPolicy;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.OpenApi.Models;
    using NetTopologySuite;
    using NetTopologySuite.Geometries;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    namespace back_end
    {
        public class Startup
        {
            public Startup(IConfiguration configuration)
            {
                Configuration = configuration;
            }

            public IConfiguration Configuration { get; }

            // This method gets called by the runtime. Use this method to add services to the container.
            public void ConfigureServices(IServiceCollection services)
            {
                

                services.AddAutoMapper(typeof(Startup));

                //desde aqui es solo para configurar el point de la ubicacion del cine.
                services.AddSingleton(provider =>
               
                    new MapperConfiguration(config =>
                    {
                        var geometryFactory = provider.GetRequiredService<GeometryFactory>();
                        config.AddProfile(new AutomapperProfiles(geometryFactory));
                    }).CreateMapper());

                services.AddSingleton<GeometryFactory>(NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326));

                //AlmacenadorAzureStorage para azure y AlmacenadorArchivosLocal para el local
                services.AddTransient<IAlmacenadorArchivos, AlmacenadorArchivosLocal>();
                services.AddHttpContextAccessor();
                //entityFramework
                //connection string "defaultConnection"
                services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("defaultConnection"),
                sqlserver => sqlserver.UseNetTopologySuite())); //utilizar para el mapa

                



                services.AddCors(options =>
                {
                    //primer corps para poder conectar el front con el end.
                    options.AddDefaultPolicy(builder =>
                    {
                        var frontendURL = Configuration.GetValue<string>("frontend_url");
                        builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader()
                        .WithExposedHeaders(new string[] { "cantidadTotalRegistros" }); //ultima parte exponer headers para el front
                    });
                });
                //uso de filtros
                services.AddResponseCaching(); //filtro 1 para usar cache
                //segundo filtro con jwt
                services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();           
                services.AddControllers(options =>
                {
                    options.Filters.Add(typeof(FiltroDeExcepcion)); //filtro personalizado 2. 
                });
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new OpenApiInfo { Title = "back_end", Version = "v1" });
                });
            }

            // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            {

               

                //middleswares por defecto en desarrollo
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                    app.UseSwagger();
                    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "back_end v1"));
                }

                app.UseHttpsRedirection();

                app.UseStaticFiles();

                app.UseRouting();

                app.UseCors();

                app.UseAuthentication();

                app.UseAuthorization();

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
            }
        }
    }

}
