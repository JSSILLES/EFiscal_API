using ANTT.Framework.Domain.Entities;

namespace ANTT.EFISCAL_WEB.Models.Shared
{
    public interface IFiltroViewModel<TViewModel, TFiltro>
    {
        IPagedList<TViewModel> Lista { get; set; }
        bool OrderByDescending { get; set; }
        string OrderByProperty { get; set; }
        int PageCount { get; set; }
        int PageIndex { get; set; }

        TFiltro CriarFiltro(int? pageCount = default(int?));
    }
}
