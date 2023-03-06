using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Domain.Spec.Utilities
{
    public static class TransformUtilities
    {
        public static IList<TDestination> Transform<TEntity, TDestination>(this IList<TEntity> list, Func<TEntity, TDestination> transform)
        {
            return new List<TDestination>(list.Select(transform));
        }
        public static IEnumerable<TDestination> Transform<TEntity, TDestination>(this IEnumerable<TEntity> list, Func<TEntity, TDestination> transform)
        {
            return new List<TDestination>(list.Select(transform));
        }
        public static ICollection<TDestination> Transform<TEntity, TDestination>(this ICollection<TEntity> list, Func<TEntity, TDestination> transform)
        {
            return new List<TDestination>(list.Select(transform));
        }
        public static List<TDestination> Transform<TEntity, TDestination>(this List<TEntity> list, Func<TEntity, TDestination> transform)
        {
            return new List<TDestination>(list.Select(transform));
        }

        public static T? ParseEnum<T>(string value) where T : struct
        {
            if (value == null)
                return null;

            if (Enum.IsDefined(typeof(T), value))
            {
                return (T)Enum.Parse(typeof(T), value, ignoreCase: true);
            }
            else
            {
                return null;
            }
        }
        public static string ParseEnumDescription<T>(string stringDescription) where T : struct
        {
            if (string.IsNullOrEmpty(stringDescription))
                return null;

            var enumtype = typeof(T);

            foreach (var item in enumtype.GetFields())
            {
                var descriptionName = item.Name;

                if (descriptionName == null)
                    continue;

                if (stringDescription == descriptionName)
                {
                    var descriptionAttribute = item.GetCustomAttributes(typeof(DescriptionAttribute), false).FirstOrDefault() as DescriptionAttribute;
                    return descriptionAttribute.Description;
                }
            }

            return null;
        }
    }
}
