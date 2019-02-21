using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Formatting;

namespace CodeGen.Formatters
{
    public class GeneralCodeFormatter
    {
        public async Task<object> FormatCode(dynamic code)
        {
            var root = SyntaxFactory.ParseCompilationUnit(code);
            var ws = new AdhocWorkspace();
            var formattedRoot = Formatter.Format(root, ws);
            return formattedRoot.ToFullString();
            
            /*
            var tree = CSharpSyntaxTree.ParseText(code);
            var root = (CSharpSyntaxNode)tree.GetRoot();
            
            var workspace = new AdhocWorkspace();
            var project = workspace.AddProject("", LanguageNames.CSharp);
            var document = project.AddDocument("", root);
            var formattedDocument = await Formatter.FormatAsync(document);
            var rootNode = await formattedDocument.GetSyntaxRootAsync();
            return rootNode.ToFullString();*/
        }
    }
}