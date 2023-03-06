using System;
using System.Globalization;
using System.Web.Mvc;

namespace ANTT.EFISCAL_WEB.Helper
{
    public class DataTimeBinder : DefaultModelBinder
    {
        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            object result = null;

            var modelName = bindingContext.ModelName;
            var attemptedValue = bindingContext.ValueProvider.GetValue(modelName)?.AttemptedValue;

            // in datetime? binding attemptedValue can be Null
            if (attemptedValue != null && !string.IsNullOrWhiteSpace(attemptedValue))
            {
                try
                {
                    var value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
                    DateTime parsedDate;

                    var isValidFormat = DateTime.TryParse(value.AttemptedValue, CultureInfo.GetCultureInfo("pt-BR").DateTimeFormat, DateTimeStyles.None, out parsedDate);

                    if (isValidFormat)
                        result = parsedDate;
                }
                catch (FormatException e)
                {
                    bindingContext.ModelState.AddModelError(modelName, e);
                }
            }

            return result;
        }
    }
}