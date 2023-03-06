USE BD_EFISCAL
GO


if exists (select 1
   from sys.sysreferences r join sys.sysobjects o on (o.id = r.constid and o.type = 'F')
   where r.fkeyid = object_id('TB_LINK'))
alter table TB_ANEXO
   drop constraint FK_TB_CONTEUDO_TB_ANEXO
go

if exists (select 1
            from  sysindexes
           where  id    = object_id('TB_LINK')
            and   name  = 'IN_FK_TB_LINK'
            and   indid > 0
            and   indid < 255)
   drop index TB_LINK.IN_FK_TB_LINK
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TB_LINK')
            and   type = 'U')
   drop table TB_LINK
go

/*==============================================================*/
/* Table: TB_LINK                                              */
/*==============================================================*/
create table TB_LINK (
   CD_SEQ_LINK       		INT            identity,
   DS_LINK          		VARCHAR(300)   not null,
   DT_CADASTRO          	DATETIME       not null,
   DT_ALTERACAO            	DATETIME       not null,
   NO_LOGIN_SCA             VARCHAR(50)    not null,
   constraint PK_TB_LINK primary key (CD_SEQ_LINK)
)
go

if exists (select 1 from  sys.extended_properties
           where major_id = object_id('TB_LINK') and minor_id = 0)
begin 
   declare @CurrentUser sysname 
select @CurrentUser = user_name() 
execute sp_dropextendedproperty 'MS_Description',  
   'user', @CurrentUser, 'table', 'TB_LINK'  
end 

select @CurrentUser = user_name() 
execute sp_addextendedproperty 'MS_Description',  
   'Tabela criada para manter os links do EFISCAL', 
   'user', @CurrentUser, 'table', 'TB_LINK'
go

if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('TB_LINK')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'CD_SEQ_LINK')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'TB_LINK', 'column', 'CD_SEQ_LINK'

end

if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('TB_LINK')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'DS_LINK')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'TB_LINK', 'column', 'DS_LINK'

end

select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'Campo criado para manter o caminho (url) no qual o arquivo está armazenado no disco.',
   'user', @CurrentUser, 'table', 'TB_LINK', 'column', 'DS_LINK'
go


if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('TB_LINK')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'DT_CADASTRO')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'TB_LINK', 'column', 'DT_CADASTRO'

end


select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'Data e hora que o arquivo foi cadastrado.',
   'user', @CurrentUser, 'table', 'TB_LINK', 'column', 'DT_CADASTRO'
go



if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('TB_LINK')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'DT_ALTERACAO')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'TB_LINK', 'column', 'DT_ALTERACAO'

end


select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'Data e hora que houve alteração.',
   'user', @CurrentUser, 'table', 'TB_LINK', 'column', 'DT_ALTERACAO'
go

if exists(select 1 from sys.extended_properties p where
      p.major_id = object_id('TB_LINK')
  and p.minor_id = (select c.column_id from sys.columns c where c.object_id = p.major_id and c.name = 'NO_LOGIN_SCA')
)
begin
   declare @CurrentUser sysname
select @CurrentUser = user_name()
execute sp_dropextendedproperty 'MS_Description', 
   'user', @CurrentUser, 'table', 'TB_LINK', 'column', 'NO_LOGIN_SCA'

end


select @CurrentUser = user_name()
execute sp_addextendedproperty 'MS_Description', 
   'Campo criado para manter o nome do login do usuário do Sistema de Controle de Acesso (SCA)',
   'user', @CurrentUser, 'table', 'TB_LINK', 'column', 'NO_LOGIN_SCA'
go