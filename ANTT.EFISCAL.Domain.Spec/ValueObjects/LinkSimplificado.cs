using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Domain.Spec.ValueObjects
{


    public class LinkSimplificado
    {      
        public int CodigoSeqLink { get; set; }

        public DateTime? DataAlteracao { get; set; }

        public DateTime DataCadastro { get; set; }

        public string DescricaoLink { get; set; }

        public string NomeLink { get; set; }
    }
}
