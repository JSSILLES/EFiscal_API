using ANTT.EFISCAL.Domain.Spec.DomainServices;
using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.EFISCAL.Domain.Spec.Filters;
using ANTT.EFISCAL.Domain.Spec.ValueObjects;
using ANTT.EFISCAL.Repositories.Spec;
using ANTT.Framework.Domain.DomainServices;
using ANTT.Framework.Domain.Entities;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;



namespace ANTT.EFISCAL.Domain.Impl.DomainServices
{
    public class LinkDomainService : DomainServiceBase, ILinkDomainService
    {
        public IAcessoRepository AcessoRepository { get; private set; }

        public ILinkRepository LinkRepository { get; private set; }

        #region [ METHODS ]
        public LinkDomainService(IAcessoRepository acessoRepository, ILinkRepository linkRepository)
        {
            AcessoRepository = acessoRepository;
            LinkRepository = linkRepository;
        }

        public async Task<IPagedList<LinkSimplificado>> ListarLinkAsync(FiltroLink filtro)
        {
            var lista = await LinkRepository.ListAsync(filtro);

            return lista;
        }

        public async Task<int?> SalvarLinkAsync(Link link)
        {
            if(link.CodigoSeqLink == 0)
            {
                await LinkRepository.SaveAsync(link);
            }
            else
            {
                var linkBase = await LinkRepository.GetAsync(new FiltroLink { CodigoSeqLink = link.CodigoSeqLink});
                link.DataCadastro = link.DataCadastro;
                await LinkRepository.UpdateAsync(link);
            }

            return link.CodigoSeqLink;
        }

        #endregion [ METHODS ]
    }
}
