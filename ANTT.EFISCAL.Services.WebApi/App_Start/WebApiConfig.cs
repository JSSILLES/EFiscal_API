using ANTT.EFISCAL.Services.WebApi.Helpers;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace ANTT.EFISCAL.Services.WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.Services.Add(typeof(IExceptionLogger), new GlobalExceptionLogger());

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //SwaggerConfig.Register();
        }
    }
}
