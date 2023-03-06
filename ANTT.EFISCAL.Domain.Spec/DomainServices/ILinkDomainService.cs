using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.EFISCAL.Domain.Spec.Filters;
using ANTT.EFISCAL.Domain.Spec.ValueObjects;
using ANTT.Framework.Domain.DomainServices;
using ANTT.Framework.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ANTT.EFISCAL.Domain.Spec.DomainServices
{
    public interface ILinkDomainService : IDomainService
    {
        Task<IPagedList<LinkSimplificado>> ListarLinkAsync(FiltroLink link);
        Task<int?> SalvarLinkAsync(Link link);
        //Task DeletarLinkAsync(int? codigoSeqLink);
        //Task<List<Link>> ObterTodos();
        //Task SalvarLinksAsync(Link link);

    }
}
