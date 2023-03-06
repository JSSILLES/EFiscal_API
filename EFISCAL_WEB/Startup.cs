using Owin;
using Microsoft.Owin;
using ANTT.Framework.Integration.NovoSCA.Auth;

[assembly: OwinStartup(typeof(ANTT.EFISCAL_WEB.Presentation.Startup))]
namespace ANTT.EFISCAL_WEB.Presentation
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseScaAuthentication();
        }
    }
}