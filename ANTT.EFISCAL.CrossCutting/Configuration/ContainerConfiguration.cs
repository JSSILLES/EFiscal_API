using System;
using System.Linq;
using ANTT.Framework.CrossCutting.Ioc;
using ANTT.Framework.Domain;
using ANTT.Framework.Repositories;
using ANTT.Framework.Repositories.EF;
using ANTT.EFISCAL.Repositories.Impl.EF.Context;

namespace ANTT.EFISCAL.CrossCutting.Configuration
{
    public class ContainerConfiguration : IContainerConfiguration
    {
        public void Configure(IContainer container)
        {
            var domainServiceClass = AppDomain.CurrentDomain.GetAssemblies()
                                        .Where(a => a.FullName.Contains("Domain.Impl"))
                                        .SelectMany(s => s.GetTypes())
                                        .FirstOrDefault(p => p.IsClass && p.Name.EndsWith("DomainService"));

            if (domainServiceClass != null)
            {
                container.RegisterAllDomainServices(domainServiceClass.Assembly);
            }

            var repositoryClass = AppDomain.CurrentDomain.GetAssemblies()
                                        .Where(a => a.FullName.Contains("Repositories.Impl"))
                                        .SelectMany(s => s.GetTypes())
                                        .FirstOrDefault(p => p.IsClass && p.Name.EndsWith("Repository"));

            if (repositoryClass != null)
            {
                container.RegisterAllRepositories(repositoryClass.Assembly);
            }

            var validationClass = AppDomain.CurrentDomain.GetAssemblies()
                                        .Where(a => a.FullName.Contains("Domain.Impl.Validators"))
                                        .SelectMany(s => s.GetTypes())
                                        .FirstOrDefault(p => p.IsClass && p.Name.EndsWith("Validator"));

            if (validationClass != null)
            {
                container.RegisterAllRepositories(validationClass.Assembly);
            }

            this.RegisterDbContext<DataBaseContext>(container, asyncAware: true);
        }
    }
}
