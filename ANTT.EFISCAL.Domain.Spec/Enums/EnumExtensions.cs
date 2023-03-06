using System;
using System.ComponentModel;
using System.Reflection;

namespace ANTT.EFISCAL.Domain.Spec.Enums
{
    public static class EnumExtensions
    {
        public static string GetrEnumDescription(this Enum value)
        {
            if (value == null)
                return null;

            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(
                    typeof(DescriptionAttribute),
                    false);

            if (attributes != null && attributes.Length > 0)
                return attributes[0].Description;
            else
                return value.ToString();
        }
    }
}
