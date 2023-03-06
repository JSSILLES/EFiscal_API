using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EFISCAL_WEB.Extentions
{
    public static class StringExtensions
    {
        public static string ToConcatenatedString(this List<string> list, string separator)
        {
            return string.Join(separator, list);
        }

        public static string ToConcatenatedString(this string[] list, string separator)
        {
            return string.Join(separator, list);
        }
    }
}