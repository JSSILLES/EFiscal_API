using ANTT.Framework.Presentation.Filters;
using System.Web;
using System.Web.Mvc;

namespace ANTT.EFISCAL_WEB
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleAjaxErrorAttribute());
            filters.Add(new HandleErrorAttribute());
            filters.Add(new NoCacheAttribute());
        }
    }
}
