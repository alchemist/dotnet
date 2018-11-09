using System.Collections.Generic;

namespace CodeGen.Descriptors
{
    public class ComponentDescriptor
    {
        public string name { get; set; }
        public IList<PropertyDescriptor> properties { get; }

        public ComponentDescriptor()
        {
            properties = new List<PropertyDescriptor>();
        }
    }
}