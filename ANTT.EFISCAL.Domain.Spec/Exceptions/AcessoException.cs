using ANTT.Framework.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Domain.Spec.Exceptions
{
    public class AcessoException : BusinessExceptionBase
    {
        public AcessoException(string message) : base(message)
        { }
    }
}
