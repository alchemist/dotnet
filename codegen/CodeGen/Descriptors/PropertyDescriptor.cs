namespace CodeGen.Descriptors
{
    public class PropertyDescriptor
    {
        public string name { get; set; }
        public TypeDescriptor type { get; set; }
        public bool isReactive { get; set; }
        public bool isCollection { get; set; }
    }
}