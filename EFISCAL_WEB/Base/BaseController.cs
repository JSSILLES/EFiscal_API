using ANTT.Framework.Presentation.Controllers;
using Elmah;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace ANTT.EFISCAL_WEB.Presentation.Base
{
    public class BaseController : FrameworkControllerBase
    {
        protected override void OnException(ExceptionContext exceptionContext)
        {
            if (!exceptionContext.ExceptionHandled)
            {
                string controllerName = (string)exceptionContext.RouteData.Values["controller"];
                string actionName = (string)exceptionContext.RouteData.Values["action"];

                ErrorSignal.FromCurrentContext().Raise(exceptionContext.Exception);

                var model = new HandleErrorInfo(exceptionContext.Exception, controllerName, actionName);

                exceptionContext.Result = new ViewResult
                {
                    ViewName = "~/Views/Shared/Error.cshtml",
                    ViewData = new ViewDataDictionary<HandleErrorInfo>(model),
                    TempData = exceptionContext.Controller.TempData
                };

                exceptionContext.ExceptionHandled = true;
            }
        }

        public Dictionary<string, string> GetErrorModelState(ModelStateDictionary modelState)
        {
            Dictionary<string, string> dictionaryModelError = new Dictionary<string, string>();
            for (int i = 0; i < modelState.Keys.ToList().Count; i++)
            {
                if (modelState.Values.ToArray()[i].Errors.Count > 0)
                {
                    var key = modelState.Keys.ToList()[i];
                    var message = modelState.Values.ToList()[i];

                    dictionaryModelError.Add(key, message.Errors[0].ErrorMessage);
                }
            }

            return dictionaryModelError;
        }

        public void GenerateMessagesModelStateToView(ModelStateDictionary ModelState)
        {
            Dictionary<string, string> dictionaryModelError = GetErrorModelState(ModelState);

            ErrorMessage = "ModelStateIsInvalid";
            TempData["MessagesModelInvalid"] = JsonConvert.SerializeObject(dictionaryModelError);
        }
        public string ListarErrosModelState()
        {
            return
                string.Join("<br />",
                    ModelState.Where(x => x.Value.Errors.Any())
                     .SelectMany(x => x.Value.Errors)
                    .Select(x => x.ErrorMessage).ToList()
            );
        }
    }
}