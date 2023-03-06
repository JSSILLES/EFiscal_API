using ANTT.Framework.CrossCutting.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace ANTT.EFISCAL_WEB.Helper
{
    public static class PermissaoHelper
    {
        public static MvcHtmlString ValidarPermissaoControle(this MvcHtmlString value, string claimValue)
        {
            return ValidarPermissao(claimValue) ? value : MvcHtmlString.Empty;
        }

        public static bool ValidarPermissaoFuncionalidade(this WebViewPage page, string claimValue)
        {
            return ValidarPermissao(claimValue);
        }

        private static bool ValidarPermissao(string claimValue)
        {
            var user = HttpContext.Current.User ?? (ClaimsPrincipal)Thread.CurrentPrincipal;

            var claimsProvider = DependencyResolver.Current.GetService<IAuthorizationService>();

            return claimsProvider.Authorize(claimValue);
        }
    }
}