using System.Collections.Generic;
using System.Web.Mvc.Ajax;
using System.Web.Routing;

namespace EFISCAL_WEB.Models.Shared
{
    public class SortableColumnModel
    {
        public string ActionName { get; set; }

        public string ControllerName { get; set; }

        public RouteValueDictionary RouteValues { get; set; }

        public AjaxOptions AjaxOptions { get; set; }

        public string SortBy { get; set; }
        public string DisplayName { get; set; }
        public IDictionary<string, object> HtmlAttributes { get; set; }
        public string ColumnWidth { get; set; }
    }
}