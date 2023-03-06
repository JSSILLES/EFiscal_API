using System;
using System.Linq.Expressions;

namespace ANTT.EFISCAL_WEB.Helper
{
    public class ExpressionHelper
    {
        public static Expression<Func<T, object>> GetPropertySelector<T>(string propertyName)
        {
            var arg = Expression.Parameter(typeof(T), "x");
            var property = Expression.Property(arg, propertyName);
            var conv = Expression.Convert(property, typeof(object));
            return Expression.Lambda<Func<T, object>>(conv, new ParameterExpression[] { arg });
        }
    }
}