using ANTT.EFISCAL.Domain.Spec.Entities;
using EFISCAL_WEB.Properties;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EFISCAL_WEB.Models
{
    public class ConfiguracaoLinkViewModel
    {
        public ConfiguracaoLinkViewModel()
        {
        }

        public ConfiguracaoLinkViewModel(Link link)
        {
            Link = new LinkViewModel(link);
        }

        public LinkViewModel Link { get; set; }

        public List<Link> ConvertToEntity()
        {
            var list = new List<Link>();

            //int codigoSeqLink, string nomeLink, string ValorLink, bool StatusLink, string nomeLoginSCA,
            //DateTime dataCadastro, DateTime? dataAlteracao

            if (Link != null)
                list.Add(new Link(Link.CodigoSeqLink, Link.NomeLink, Link.ValorLink, Link.StatusLink, Link.NomeLoginSCA, Link.DataCadastro, Link.DataAlteracao));

            return list;
        }
    }

    public class LinkViewModel
    {
        public LinkViewModel()
        {
        }

        public LinkViewModel(Link link)
        {
            if (link == null)
                return;

            CodigoSeqLink = link.CodigoSeqLink;            
            NomeLink = link.NomeLink;
            ValorLink = link.ValorLink;
        }

        #region [ PROPERTIES ]

        [Key]
        [Required]
        public int CodigoSeqLink { get; set; }

        [Required]
        public bool StatusLink { get; protected set; }

        [Required]
        [StringLength(50)]
        public string NomeLoginSCA { get; protected set; }

        [Display(Name = "Link")]
        [Required(ErrorMessageResourceName = "MSG_E001", ErrorMessageResourceType = typeof(Resources))]
        [StringLength(255)]
        public string ValorLink { get; set; }

        [Required]
        [StringLength(50)]
        public string NomeLink { get; set; }

        public DateTime? DataAlteracao { get; set; }

        [Required]
        public DateTime DataCadastro { get; set; }

        #endregion [ PROPERTIES ]

        public Link CriarLink()
        {
            return new Link(CodigoSeqLink, NomeLink, ValorLink, StatusLink, NomeLoginSCA, DataCadastro, DataAlteracao);
        }
    }
}