using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ANTT.EFISCAL_WEB.Presentation.Helper
{
    public class AttributesDataEntity
    {
        public class DataAttribute : ValidationAttribute, IClientValidatable
        {
            public override bool IsValid(object value)
            {
                bool isValid = true;

                try
                {
                    if (value != null)
                        isValid = DateTime.TryParse(value.ToString(), out DateTime dateTime);
                }
                catch
                {
                    isValid = false;
                }

                return base.IsValid(value);
            }

            public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
            {
                var rule = new ModelClientValidationRule
                {
                    ErrorMessage = string.Format("Data inválida", metadata.DisplayName ?? "Data"),
                    ValidationType = "dateformat"
                };

                yield return rule;
            }
        }


        public class DataLessAttribute : ValidationAttribute, IClientValidatable
        {
            public readonly string fieldDataFinalCompare;
            public readonly string mensagem;
            /// <param name="fieldDataFinalCompare"></param>



            public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
            {
                var rule = new ModelClientValidationRule
                {
                    ErrorMessage = mensagem,
                    ValidationType = "datelessthan"
                };

                rule.ValidationParameters.Add("param", "#" + fieldDataFinalCompare);

                yield return rule;
            }
        }
    }
}