using ANTT.Framework.Domain.Entities;
using ANTT.Framework.Domain.Filters;
using ANTT.EFISCAL_WEB.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ANTT.EFISCAL_WEB.Models.Shared
{
    public abstract class FiltroViewModelBase<TViewModel, TEntity, TFiltro> : IFiltroViewModel<TViewModel, TFiltro>
        where TFiltro : IPagedFilter<TEntity>, new()
        where TEntity : class
    {
        protected FiltroViewModelBase()
        {
            PageCount = 20;
            PageIndex = 0;
            OrderByDescending = false;
        }

        public int PageIndex { get; set; }
        public int PageCount { get; set; }
        public bool OrderByDescending { get; set; }
        public string OrderByProperty { get; set; }
        public IPagedList<TViewModel> Lista { get; set; }
        public string MsgRetorno { get; set; }

        public virtual TFiltro CriarFiltro(int? pageCount = null)
        {
            var filtro = new TFiltro
            {
                PageCount = pageCount ?? PageCount,
                PageIndex = PageIndex,
                OrderByDescending = OrderByDescending,
                OrderByProperty = ExpressionHelper.GetPropertySelector<TEntity>(OrderByProperty)
            };
            return filtro;
        }
    }
}