using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.EFISCAL.Domain.Spec.Filters;
using ANTT.EFISCAL.Domain.Spec.ValueObjects;
using ANTT.Framework.Domain.Entities;
using ANTT.Framework.Repositories;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Repositories.Spec
{
    public interface ILinkRepository  : IRepository<Link>
    {
        //Task<IPagedList<Link>> ListarLinkAsync(FiltroLink filtro);
    }
}
