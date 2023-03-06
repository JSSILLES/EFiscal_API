using System.ComponentModel;
using System.Web.Mvc;

namespace ANTT.EFISCAL_WEB.Helper
{
    public class CustomStringBinder : DefaultModelBinder
    {
        protected override object GetPropertyValue(ControllerContext controllerContext, ModelBindingContext bindingContext, PropertyDescriptor propertyDescriptor, IModelBinder propertyBinder)
        {
            var result = base.GetPropertyValue(controllerContext, bindingContext, propertyDescriptor, propertyBinder);
            if (result is string)
                result = ((string)result).Replace("\r\n", "\n");
            return result;
        }
    }
}