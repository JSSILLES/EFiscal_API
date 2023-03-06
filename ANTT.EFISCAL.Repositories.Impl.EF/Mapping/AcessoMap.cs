using ANTT.EFISCAL.Domain.Spec.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace ANTT.EFISCAL.Repositories.Impl.EF.Mapping
{
    public class AcessoMap : EntityTypeConfiguration<Acesso>
    {
        public AcessoMap()
        {
            ToTable("dbo.TB_ACESS");
            HasKey(x => x.CodigoSeqAcesso);

            Property(x => x.CodigoSeqAcesso).HasColumnName("CD_SEQ_ACESSO").HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.DataAcesso).HasColumnName("DT_ACESSO");


        }
    }
}
