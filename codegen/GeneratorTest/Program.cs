using System;
using CodeGen.Descriptors;
using CodeGen.Generators;

namespace GeneratorTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var intType = new TypeDescriptor { name = typeof(int).Name, containingNamespace = typeof(int).Namespace };
            var boolType = new TypeDescriptor { name = typeof(bool).Name, containingNamespace = typeof(bool).Namespace };

            var componentGenerator = new ComponentGenerator();

            var component1 = new ComponentDescriptor
            {
                name = "SimpleComponent"
            };

            component1.properties.Add(new PropertyDescriptor { name = "PropertyA", type = boolType });
            component1.properties.Add(new PropertyDescriptor { name = "PropertyB", type = intType });

            var component1Code = componentGenerator.Generate(component1);
            component1Code.Wait();

            Console.Write(component1Code.Result);
            
            var component2 = new ComponentDescriptor
            {
                name = "DisposableComponent"
            };

            component2.properties.Add(new PropertyDescriptor { name = "PropertyA", type = boolType });
            component2.properties.Add(new PropertyDescriptor { name = "PropertyB", type = intType });

            var component2Code = componentGenerator.Generate(component2);
            component2Code.Wait();

            Console.Write(component2Code.Result);

            Console.Read();
        }
    }
}
