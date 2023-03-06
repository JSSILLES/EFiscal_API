using ANTT.Framework.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ANTT.EFISCAL.Domain.Spec.Entities
{
    public class Link : IEntity
    {
        #region [ CONTRUCTOR ]
        protected Link()
        {

        }

        public Link(int codigoSeqLink, string nomeLink, string ValorLink, string nomeLoginSCA, DateTime dataCadastro)
        {
            this.CodigoSeqLink = codigoSeqLink;
            this.NomeLink = nomeLink;
            this.ValorLink = ValorLink;
            //this.StatusLink = StatusLink;
            this.DataCadastro = dataCadastro;
            this.NomeLoginSCA = nomeLoginSCA;

            this.Acessos = new List<Acesso>();
        }
        #endregion [ CONTRUCTOR ]


        #region [ PROPERTIES ]
        [Key]
        [Required]
        public int CodigoSeqLink { get; set; }

        //public bool StatusLink { get; protected set; }

        [Required]
        [StringLength(50)]
        public string NomeLoginSCA { get; protected set; }

        public ICollection<Acesso> Acessos { get; protected set; }

        public DateTime? DataAlteracao { get; set; }

        [Required]
        public DateTime? DataCadastro { get; set; }

        [Required]
        [StringLength(255)]
        public string ValorLink { get; set; }

        [Required]
        [StringLength(50)]
        public string NomeLink { get; protected set; }

        #endregion [ PROPERTIES ]

        #region [METHODS]
        public void Uptade(int codigoSeqLink, string noLink, string valorlink)
        {
            CodigoSeqLink = codigoSeqLink;
            NomeLink = noLink;
            ValorLink = valorlink;
        }
        #endregion [METHODS]
    }
}
