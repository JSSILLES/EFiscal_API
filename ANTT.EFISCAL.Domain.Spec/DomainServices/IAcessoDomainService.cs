using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.EFISCAL.Domain.Spec.Filters;
using ANTT.Framework.Domain.DomainServices;
using ANTT.Framework.Domain.Entities;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Domain.Spec.DomainServices
{
    public interface IAcessoDomainService : IDomainService
    {
        Task<IPagedList<Acesso>> ListarAcessosAsync(FiltroAcesso filtro);
        Task<int?> SalvarAcessoAsync(Acesso acesso);
        Task<Acesso> ObterAcessoAsync(int? codigoSeqAcesso);
        Task DeletarAcessoAsync(int? codigoSeqAcesso);
        Task<int> ContarAcessosAsync(FiltroAcesso filtro);
    }
}
