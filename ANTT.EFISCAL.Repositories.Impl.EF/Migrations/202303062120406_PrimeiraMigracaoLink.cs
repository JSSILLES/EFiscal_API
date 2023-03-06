namespace ANTT.EFISCAL.Repositories.Impl.EF.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PrimeiraMigracaoLink : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TB_ACESS",
                c => new
                    {
                        CD_SEQ_ACESSO = c.Int(nullable: false, identity: true),
                        DT_ACESSO = c.DateTime(nullable: false),
                        Link_CodigoSeqLink = c.Int(),
                    })
                .PrimaryKey(t => t.CD_SEQ_ACESSO)
                .ForeignKey("dbo.TB_LINK", t => t.Link_CodigoSeqLink)
                .Index(t => t.Link_CodigoSeqLink);
            
            CreateTable(
                "dbo.TB_LINK",
                c => new
                    {
                        CD_SEQ_LINK = c.Int(nullable: false, identity: true),
                        NomeLoginSCA = c.String(nullable: false, maxLength: 50, unicode: false),
                        DT_ALTERACAO = c.DateTime(),
                        DT_CADASTRO = c.DateTime(nullable: false),
                        DS_LINK = c.String(nullable: false, maxLength: 255, unicode: false),
                        NOME_LINK = c.String(nullable: false, maxLength: 50, unicode: false),
                    })
                .PrimaryKey(t => t.CD_SEQ_LINK);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TB_ACESS", "Link_CodigoSeqLink", "dbo.TB_LINK");
            DropIndex("dbo.TB_ACESS", new[] { "Link_CodigoSeqLink" });
            DropTable("dbo.TB_LINK");
            DropTable("dbo.TB_ACESS");
        }
    }
}
