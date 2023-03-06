using ANTT.Framework.CrossCutting.Ioc.SI.WebApi.Owin;
using Microsoft.Owin;
using Owin;
using System.Web.Http;

[assembly: OwinStartup(typeof(ANTT.EFISCAL.Services.WebApi.Startup))]
namespace ANTT.EFISCAL.Services.WebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseSimpleInjector(GlobalConfiguration.Configuration);
        }
        
    }
}
