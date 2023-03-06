using ANTT.Framework.CrossCutting.Ioc;
using ANTT.Framework.Integration.IoC;

namespace ANTT.EFISCAL.Integration.Impl.Configuration
{
    public class ContainerConfiguration : IContainerConfiguration
    {
        public void Configure(IContainer container)
        {
            this.RegisterAllIntegrationGateways(container);
        }
    }
}
