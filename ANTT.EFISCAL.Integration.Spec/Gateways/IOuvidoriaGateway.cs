using ANTT.EFISCAL.Integration.Spec.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Integration.Spec.Gateways
{
    public interface IOuvidoriaGateway
    {
        Task<RetornoMensagem> GravarMensagem(Mensagem mensagem);
        Task<IEnumerable<AuxiliarMensagem>> ListarTiposMensagem();
        Task<IEnumerable<AuxiliarMensagem>> ListasTiposUsuario();
        Task<IEnumerable<AuxiliarMensagem>> ListarUFs();
    }
}
