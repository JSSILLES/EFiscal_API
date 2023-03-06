using ANTT.EFISCAL.Domain.Spec.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Services.WebApi.Models
{
    public class LinkApi
    {
        
        public int? CodigoSeqLink { get; set; }

        
        public string NomeLink { get; set; }

        
        public string ValorLink { get; set; }

        //public bool StatusLink { get; set; }
                
        public string NomeLoginSCA { get; set; }

        public Link CriarLink()
        {
            return new Link(CodigoSeqLink.Value, NomeLink, ValorLink, NomeLoginSCA, DateTime.Now);
        }

    }
}
