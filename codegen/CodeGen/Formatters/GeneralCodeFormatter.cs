using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace CodeGen.Formatters
{
    public class GeneralCodeFormatter
    {
        public async Task<object> FormatCode(dynamic code)
        {
            var tree = CSharpSyntaxTree.ParseText(code);
            var root = (CSharpSyntaxNode)tree.GetRoot();
            return root.NormalizeWhitespace().ToFullString();
        }
    }
}