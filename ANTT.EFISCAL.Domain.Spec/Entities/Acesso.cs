using System;
using System.ComponentModel.DataAnnotations;
using ANTT.Framework.Domain.Entities;
using ANTT.Framework.Domain.DataAnnotations;

namespace ANTT.EFISCAL.Domain.Spec.Entities
{
    public class Acesso : IEntity
    {
        #region [CONSTRUCTOR]
        protected Acesso()
        {   }
        #endregion

        public Acesso(int codigoSeqAcesso, DateTime dataAcesso)
        {
            this.CodigoSeqAcesso = codigoSeqAcesso;
            this.DataAcesso = dataAcesso;
        }

        #region {PROPERTIES]
        [Key]
        [Required]
        public int CodigoSeqAcesso { get; set; }

        [Required]
        [CurrentDate]
        public DateTime DataAcesso { get; set; }
        #endregion


        #region [METHODS]
        public void Update (int codigoAcesso, DateTime dataAcesso)
        {
            CodigoSeqAcesso = codigoAcesso;
            DataAcesso = dataAcesso;
        }
        #endregion
    }
}
