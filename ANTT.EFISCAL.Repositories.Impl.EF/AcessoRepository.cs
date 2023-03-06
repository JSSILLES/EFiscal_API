using ANTT.EFISCAL.Domain.Spec.Entities;
using ANTT.EFISCAL.Repositories.Spec;
using ANTT.Framework.Repositories.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ANTT.EFISCAL.Repositories.Impl.EF
{
    public class AcessoRepository : RepositoryBase<Acesso>, IAcessoRepository
    {
        public AcessoRepository(DbContextProvider contex) : base(contex)
        {
        }
    }
}
