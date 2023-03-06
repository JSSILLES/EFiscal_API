using ANTT.EFISCAL_WEB.Presentation.App_Start;
using BundleTransformer.Core.Bundles;
using System.Web.Optimization;

namespace ANTT.EFISCAL_WEB.Presentation
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = true;

#if DEBUG
            BundleTable.EnableOptimizations = false;
#endif

            RegisterStyleBundles(bundles);
            RegisterJavascriptBundles(bundles);
        }


        private static void RegisterStyleBundles(BundleCollection bundles)
        {
            //libraries
            var libraries = new CustomStyleBundle("~/bundles/libs/css").NonOrdering().Include(
                                "~/content/css/bootstrap.min.css",
                                "~/content/libs/css/tempusdominus-bootstrap-4.min.css",
                                "~/content/libs/css/all.min.css",
                                "~/content/libs/css/select2.min.css",
                                "~/content/libs/css/toastr.min.css",
                                "~/content/css/global.min.css",
                                "~/content/css/datatables.css",
                                "~/content/scss/internal.min.css",
                                "~/content/css/custom.css");

            bundles.Add(libraries);
        }

        private static void RegisterJavascriptBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/lib/jquery").NonOrdering().Include(
                    "~/content/libs/js/jquery-3.3.1.min.js",
                    "~/content/libs/jquery/ui/jquery-ui.min.js",
                    "~/content/libs/jquery/blockui/jquery.blockUI.min.js",
                    "~/content/libs/jquery/unobtrusive/jquery.unobtrusive-ajax.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/libs/js").NonOrdering().Include(
                               "~/content/libs/js/popper.min.js",
                               "~/content/libs/js/bootstrap.min.js",
                               "~/content/libs/js/jquery.mask.min.js",
                               "~/content/libs/js/select2.min.js",
                               "~/content/libs/js/toastr.min.js",
                                "~/content/libs/jquery/numericinput/numericInput.min.js"));

            //JS global
            bundles.Add(new ScriptBundle("~/bundles/js/global").NonOrdering().Include(
                            "~/content/assets/js/global.js"));

            //JS APLICAÇÕES CUSTOMIZADAS
            bundles.Add(new ScriptBundle("~/bundles/js").NonOrdering().Include(
                              "~/content/assets/js/apply_modal.js",
                              "~/content/assets/js/apply_date.js",
                              "~/content/assets/js/apply_toggle.js",
                              "~/content/assets/js/apply_select.js",
                              "~/content/assets/js/apply_mask.js",
                              "~/content/assets/js/apply_toastr.js",
                              "~/content/assets/js/apply_tab.js",
                              "~/content/assets/js/apply_validation.js",
                              "~/content/assets/js/apply_pagination.js",
                              "~/content/libs/js/moment.min.js",
                              "~/content/libs/js/moment_pt-br.js",
                              "~/content/libs/js/tempusdominus-bootstrap-4.min.js",
                              "~/content/sistema/mensagens.js",
                              "~/content/sistema/squadra.js"));
            //JS MOMENT
            bundles.Add(new ScriptBundle("~/bundles/libs/js/moment").NonOrdering().Include(
                             "~/content/libs/js/moment.min.js",
                             "~/content/libs/js/moment_pt-br.js"));

            //JS CALENDARIO
            bundles.Add(new ScriptBundle("~/bundles/js/calendario").NonOrdering().Include(
                             "~/content/libs/js/tempusdominus-bootstrap-4.min.js",
                             "~/content/assets/js/apply_date.js"));


            bundles.Add(new ScriptBundle("~/bundles/js/libs").NonOrdering().Include(
                                "~/content/libs/icheck/icheck.min.js",
                                "~/content/libs/jquery/numericinput/numericInput.min.js",
                                "~/content/libs/amplifyjs/amplify.min.js",
                                "~/content/libs/bootbox/bootbox.min.js",
                                "~/content/libs/money/jquery.maskMoney.js"
                                ));


            bundles.Add(new ScriptBundle("~/bundles/jqueryval").NonOrdering().Include(
                                 "~/content/libs/jquery/validate/jquery.validate.min.js",
                                 "~/content/libs/jquery/validate/jquery.validate.unobtrusive.min.js",
                                 "~/content/libs/jquery/validate/additional-methods.min.js",
                                 "~/content/libs/jquery/validate/localization/messages_pt_BR.min.js",
                                 "~/content/libs/jquery/validate/methods_pt.js"
                                 ));

            bundles.Add(new ScriptBundle("~/bundles/cadastroBasico").Include(
                                "~/content/antt/antt.cadastros.js",
                                "~/content/antt/antt.exportacao.js",
                                "~/content/antt/antt.formulario.js",
                                "~/content/antt/antt.utilities"));

            bundles.Add(new ScriptBundle("~/bundles/anttConteudo").Include(
                                "~/Scripts/Conteudo/antt.conteudo.js"));
        }

    }
}
