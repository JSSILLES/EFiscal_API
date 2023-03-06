using ANTT.Framework.Repositories.EF;
using System.Diagnostics;

namespace ANTT.EFISCAL.Repositories.Impl.EF.Context
{
    public class DataBaseContext : FrameworkDbContext
    {
        public DataBaseContext() : base("DataBaseContext")
        {
#if DEBUG
            Database.Log = Log;
#endif

            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
        }

        public static void Log(string a)
        {
            Debug.WriteLine(a);
        }
    }
}
