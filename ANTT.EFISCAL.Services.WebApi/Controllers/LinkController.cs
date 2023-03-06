using ANTT.EFISCAL.Domain.Spec.Constants;
using ANTT.EFISCAL.Domain.Spec.DomainServices;
using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.EFISCAL.Domain.Spec.Filters;
using ANTT.EFISCAL.Services.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ANTT.EFISCAL.Services.WebApi.Controllers
{
    public class LinkController : ApiController
    {
        private ILinkDomainService _linkDomainService;

        public LinkController(ILinkDomainService linkDomainService)
        {
            _linkDomainService = linkDomainService;
        }

        [Route("api/controller/listar")]
        [HttpGet]
        public async Task<IHttpActionResult> listar([FromBody]int? codigoLink, int pageCount, int pageIndex)
        {
            var links = await _linkDomainService.ListarLinkAsync(new FiltroLink
            {
                StatusLink = true,
                CodigoSeqLink = codigoLink,
                PageCount = pageCount,
                PageIndex = pageIndex
            });

            return Ok(links);
        }

        [Route("api/controller/cadastrar")]
        [HttpPost]
        public async Task<IHttpActionResult> Post(LinkApi link)
        {
            if (ModelState.IsValid)
            {
                var idLink = await _linkDomainService.SalvarLinkAsync(link.CriarLink());
                return Created("api/links/listar", idLink);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

    }
}
