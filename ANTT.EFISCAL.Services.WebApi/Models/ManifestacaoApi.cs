using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.EFISCAL.Integration.Spec.ValueObjects;
using System;
using System.ComponentModel.DataAnnotations;

namespace ANTT.EFISCAL.Services.WebApi.Models
{
    public class ManifestacaoApi
    {        
        [Required]
        public string TextoCidadao { get; set; }

        [Required]
        public ulong IdTipoPessoa { get; set; }

        public Mensagem CriarMensagem()
        {
            return new Mensagem()
            {
                IdTipoPessoa = IdTipoPessoa,
                TextoCidadao = TextoCidadao
            };
        }
    }
}