using System.Threading.Tasks;

namespace CodeGen.Generators
{
    public interface IGenerator
    {
        Task<object> Generate(dynamic descriptor);
    }
}