using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.EFISCAL.Domain.Spec.Filters;
using ANTT.EFISCAL.Domain.Spec.ValueObjects;
using ANTT.EFISCAL.Repositories.Spec;
using ANTT.Framework.Domain.Entities;
using ANTT.Framework.Repositories.EF;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Repositories.Impl.EF
{
    public class LinkRepository : RepositoryBase<Link>, ILinkRepository
    {
        public LinkRepository(DbContextProvider context) : base(context)
        {
        }

        public Task<IPagedList<LinkSimplificado>> ListarLinkAsync(FiltroLink filtro)
        {
            throw new System.NotImplementedException();
        }
    }
}
