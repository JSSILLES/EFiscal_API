using ANTT.EFISCAL.Domain.Spec.DomainServices;
using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.EFISCAL.Domain.Spec.Filters;
using ANTT.EFISCAL.Repositories.Spec;
using ANTT.Framework.Domain.DomainServices;
using ANTT.Framework.Domain.Entities;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Domain.Impl.DomainServices
{
    public class AcessoDomainService : DomainServiceBase, IAcessoDomainService
    {
        #region [ PROPERTIES ]

        public IAcessoRepository AcessoRepository { get; private set; }

        //public IEnumerable<IValidator<Acesso>> AcessoValidators { get; private set; }

        #endregion

        #region [ CONSTRUCTOR ]

        public AcessoDomainService(IAcessoRepository acessoRepository)//, IEnumerable<IValidator<Acesso>> acessoValidators)
        {
            AcessoRepository = acessoRepository;
            //AcessoValidators = acessoValidators;
        }

        #endregion

        #region [ METHODS ]

        public async Task<IPagedList<Acesso>> ListarAcessosAsync(FiltroAcesso filtro)
        {
            return await AcessoRepository.ListAsync(filtro);
        }
        public async Task<int?> SalvarAcessoAsync(Acesso acesso)
        {
            //TODO: Descomentar o código abaixo ao adicionar classes de validação de regras de negócio.
            //var result = AcessoValidators.Validate(acesso);

            //if (!result.IsValid)
            //{
            //var messages = string.Empty;

            //result.ForEach(r =>
            //{
            //messages = string.IsNullOrEmpty(messages) ? r.ErrorMessage : string.Concat(messages, "|", r.ErrorMessage);
            //});

            //throw new AcessoException(messages);
            //}

            if (acesso.CodigoSeqAcesso == 0)
            {
                await AcessoRepository.SaveAsync(acesso);
            }
            else
            {
                await AcessoRepository.UpdateAsync(acesso);
            }

            return acesso.CodigoSeqAcesso;
        }

        public async Task<Acesso> ObterAcessoAsync(int? codigoSeqAcesso)
        {
            return await AcessoRepository.GetAsync(new FiltroAcesso { CodigoSeqAcesso = codigoSeqAcesso });
        }

        public async Task DeletarAcessoAsync(int? codigoSeqAcesso)
        {
            var acessoTask = AcessoRepository.GetAsync(new FiltroAcesso { CodigoSeqAcesso = codigoSeqAcesso });

            var result = await acessoTask;

            if (result != null)
            {
                await this.AcessoRepository.DeleteAsync(result);
            }
        }

        public async Task<int> ContarAcessosAsync(FiltroAcesso filtro)
        {
            return await AcessoRepository.CountAsync(filtro);
        }

        #endregion
    }
}