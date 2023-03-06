using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Integration.Spec.ValueObjects
{
    public class Mensagem
    {
        public ulong IdClassificacao { get; set; }

        public int FormaEnvioResposta { get; set; }

        public ulong IdCanalEntrada { get; set; }

        public string TextoCidadao { get; set; }

        public ulong IdTipoPessoa { get; set; }
    }
}
