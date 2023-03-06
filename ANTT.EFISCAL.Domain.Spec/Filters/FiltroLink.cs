using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.EFISCAL.Domain.Spec.ValueObjects;
using ANTT.Framework.Domain;
using ANTT.Framework.Domain.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Domain.Spec.Filters
{
    public class FiltroLink : PagedFilterBase<Link>, IPagedProjectionFilter<Link, LinkSimplificado>
    {
        public FiltroLink()
        {
            NoTrack = true;

        }

        public int? CodigoSeqLink { get; set; }

        public bool? StatusLink { get; set; }

        public string NomeLink { get; set; }

        public string ValorLink { get; set; }

        public override Expression<Func<Link, bool>> Expression
        {
            get
            {
                return new ExpressionBuilder<Link>()
                    .AndIf(x => x.CodigoSeqLink == this.CodigoSeqLink, this.CodigoSeqLink.HasValue)
                    //.AndIf(x => x.StatusLink == StatusLink, StatusLink.HasValue)
                    .AndIf(x => x.NomeLink.Contains(this.NomeLink), !string.IsNullOrWhiteSpace(this.NomeLink))
                    .AndIf(x => x.ValorLink.Contains(this.ValorLink), !string.IsNullOrWhiteSpace(this.ValorLink));
            }
        }

        public Expression<Func<Link, LinkSimplificado>> Projection
        {
            get
            {
                return x => new LinkSimplificado
                {
                    CodigoSeqLink = x.CodigoSeqLink,
                    NomeLink = x.NomeLink,
                    DescricaoLink = x.ValorLink
                };
            }
        }
    }
}
