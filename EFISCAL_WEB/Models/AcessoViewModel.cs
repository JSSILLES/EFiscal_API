using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.Framework.Domain.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations;

namespace EFISCAL_WEB.Models
{
    public class AcessoViewModel
    {
        public AcessoViewModel()
        {
        }

        public AcessoViewModel(Acesso acesso)
        {
            this.CodigoSeqAcesso = acesso.CodigoSeqAcesso;
            this.DataAcesso = acesso.DataAcesso;
        }

        #region [ PROPERTIES ]

        [Key]
        [Required]
        public int CodigoSeqAcesso { get; set; }

        [Required]
        [CurrentDate]
        public DateTime DataAcesso { get; set; }

        public string ConteudoAutocomplete { get; set; }
        #endregion

        public Acesso CriarAcesso()
        {
            return new Acesso(CodigoSeqAcesso, DataAcesso);
        }
    }
}