using System.Text;
using System.Web.Mvc;

namespace ANTT.EFISCAL_WEB.Presentation.Base
{
    public class AjaxResult : JsonResult
    {
        public bool Success { get; set; }
        public bool HasValue { get; set; }
        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }
        public object Result { get; set; }

        public AjaxResult(object result)
        {
            this.Result = result;
            Success = true;
            HasValue = true;
            base.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
        }

        public AjaxResult(bool success, string message)
        {
            this.Success = success;
            HasValue = true;

            if (success)
                SuccessMessage = message;
            else
                ErrorMessage = message;
        }

        public AjaxResult(bool success, bool hasValue)
        {
            this.Success = success;
            this.HasValue = hasValue;
        }

        public override void ExecuteResult(ControllerContext context)
        {
            base.Data = new
            {
                success = Success,
                hasValue = HasValue,
                SuccessMessage = SuccessMessage,
                ErrorMessage = ErrorMessage,
                result = Result
            };
            base.ContentEncoding = Encoding.Default;
            base.ContentType = "application/json";
            base.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            base.ExecuteResult(context);
        }
    }
}