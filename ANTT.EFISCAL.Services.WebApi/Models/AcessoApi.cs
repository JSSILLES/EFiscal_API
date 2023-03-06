using ANTT.EFISCAL.Domain.Spec.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ANTT.EFISCAL.Services.WebApi.Models
{
    public class AcessoApi
    {
        [Required]
        public int? CodigoConteudo { get; set; }

        public string Localizacao { get; set; }

        public Acesso CriarAcesso()
        {
            return new Acesso(0, DateTime.Now);
        }
    }
}