using ANTT.EFISCAL.Domain.Spec.DomainServices;
using ANTT.EFISCAL.Services.WebApi.Models;
using System.Threading.Tasks;
using System.Web.Http;

namespace ANTT.EFISCAL.Services.WebApi.Controllers
{
    [RoutePrefix("api/Acesso")]
    public class AcessoController : ApiController
    {
        private IAcessoDomainService _acessoDomainService;

        public AcessoController(IAcessoDomainService acessoDomainService)
        {
            _acessoDomainService = acessoDomainService;
        }

        public async Task<IHttpActionResult> Post(AcessoApi acesso)
        {
            if (ModelState.IsValid)
            {
                var idAcesso = await _acessoDomainService.SalvarAcessoAsync(acesso.CriarAcesso());
                return Created("api/acessos", idAcesso);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
