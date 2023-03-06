namespace EFISCAL_WEB.Models.Shared
{
    public class ComboViewModel
    {
        public ComboViewModel(int value, string text)
        {
            Value = value;
            Text = text;
        }

        public ComboViewModel(int value, string text, int attribute)
        {
            Value = value;
            Text = text;
            Attribute = attribute;
        }

        public int Value { get; set; }
        public string Text { get; set; }
        public int Attribute { get; set; }
    }
}