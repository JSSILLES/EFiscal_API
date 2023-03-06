using ANTT.Framework.CrossCutting.Logging;
using System.Web.Http.ExceptionHandling;

namespace ANTT.EFISCAL.Services.WebApi.Helpers
{
    public class GlobalExceptionLogger : ExceptionLogger
    {
        public override void Log(ExceptionLoggerContext context)
        {
            Logger.Error(context.Exception, "Erro geral:", null);
        }
    }
}