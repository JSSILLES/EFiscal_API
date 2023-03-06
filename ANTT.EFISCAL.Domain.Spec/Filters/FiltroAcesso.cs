using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.Framework.Domain;
using ANTT.Framework.Domain.Filters;
using System;
using System.Linq.Expressions;

namespace ANTT.EFISCAL.Domain.Spec.Filters
{
    public class FiltroAcesso : PagedFilterBase<Acesso>
    {
        public FiltroAcesso()
        {
            NoTrack = true;
        }

        public int? CodigoSeqAcesso { get; set; }
        public DateTime? DataInicial { get; set; }
        public DateTime? DataFinal { get; set; }

        public override Expression<Func<Acesso, bool>> Expression
        {
            get
            {
                return new ExpressionBuilder<Acesso>()
                    .AndIf(x => x.CodigoSeqAcesso == this.CodigoSeqAcesso, this.CodigoSeqAcesso.HasValue)
                    .AndIf(x => x.DataAcesso >= this.DataInicial, this.DataInicial.HasValue)
                    .AndIf(x => x.DataAcesso <= this.DataFinal, this.DataFinal.HasValue);
            }
        }
            
    }
}
