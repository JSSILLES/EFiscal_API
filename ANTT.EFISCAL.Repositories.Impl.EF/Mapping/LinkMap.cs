using ANTT.EFISCAL.Domain.Spec.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ANTT.EFISCAL.Repositories.Impl.EF.Mapping
{
    public class LinkMap : EntityTypeConfiguration<Link>
    {
        public LinkMap()
        {
            ToTable("dbo.TB_LINK");
            HasKey(x => x.CodigoSeqLink);

            Property(x => x.CodigoSeqLink).HasColumnName("CD_SEQ_LINK").HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.NomeLink).HasColumnName("NOME_LINK");
            Property(x => x.ValorLink).HasColumnName("DS_LINK");
            Property(x => x.DataCadastro).HasColumnName("DT_CADASTRO");
            Property(x => x.DataAlteracao).HasColumnName("DT_ALTERACAO");
        }
    }
}
