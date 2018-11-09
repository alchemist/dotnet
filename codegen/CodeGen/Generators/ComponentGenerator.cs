using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeGen.Descriptors;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using static Microsoft.CodeAnalysis.CSharp.SyntaxFactory;

namespace CodeGen.Generators
{
    public class ComponentGenerator : IGenerator
    {
        private SyntaxTree ParseExpression(string expression)
        {
            return CSharpSyntaxTree.ParseText(expression);
        }

        private dynamic CreatePropertyFor(dynamic property)
        {
            var propertyType = property.type.name;

            if (property.isReactive)
            { propertyType = $"IReactiveProperty<{propertyType}>"; }
            else if(property.isCollection)
            { propertyType = $"IList<{propertyType}>"; }

            var accessDecorators = new List<AccessorDeclarationSyntax>
            {
                AccessorDeclaration(SyntaxKind.GetAccessorDeclaration)
                    .WithSemicolonToken(Token(SyntaxKind.SemicolonToken))
            };

            if (!property.isReactive && !property.isCollection)
            {
                var setter = AccessorDeclaration(SyntaxKind.GetAccessorDeclaration)
                    .WithSemicolonToken(Token(SyntaxKind.SemicolonToken));

                accessDecorators.Add(setter);
            }

            return PropertyDeclaration(ParseTypeName(propertyType), property.name)
                .AddModifiers(Token(SyntaxKind.PublicKeyword))
                .AddAccessorListAccessors(accessDecorators.ToArray());
        }

        private StatementSyntax CreateInitializerFor(dynamic property)
        {
            var propertyType = property.type.name;

            if (property.isReactive)
            { propertyType = $"ReactiveProperty<{propertyType}>"; }
            else if (property.isCollection)
            { propertyType = $"List<{propertyType}>"; }

            return ExpressionStatement(
                AssignmentExpression(SyntaxKind.SimpleAssignmentExpression,
                    IdentifierName(property.name),
                    ObjectCreationExpression(IdentifierName(propertyType))
                        .WithArgumentList(ArgumentList())));
        }

        private StatementSyntax CreateDisposerFor(dynamic property)
        {
            return ExpressionStatement(
                InvocationExpression(
                    MemberAccessExpression(
                        SyntaxKind.SimpleMemberAccessExpression,
                        IdentifierName(property.name),
                        IdentifierName("Dispose"))));
        }

        public async Task<object> Generate(dynamic descriptor)
        {
            var propertyList = (ICollection<dynamic>) descriptor.properties;
            var hasReactiveProperties = propertyList.Any(x => x.isReactive);
            var hasCollectionProperties = propertyList.Any(x => x.isCollection);

            var @namespace = NamespaceDeclaration(ParseName("Example.Components"))
                .NormalizeWhitespace()
                .AddUsings(UsingDirective(ParseName("EcsRx.Components")));
            
            var classDeclaration = ClassDeclaration(descriptor.name)
                    .AddModifiers(Token(SyntaxKind.PublicKeyword))
                    .AddBaseListTypes(SimpleBaseType(ParseTypeName("IComponent")));

            if (hasReactiveProperties || hasCollectionProperties)
            {
                var propertyInitializers = propertyList.Where(x => x.isReactive || x.isCollection).Select(CreateInitializerFor);

                var constructorMember = ConstructorDeclaration(descriptor.name)
                    .WithModifiers(TokenList(Token(SyntaxKind.PublicKeyword)))
                    .WithBody(Block(propertyInitializers));

                classDeclaration = classDeclaration.AddMembers(constructorMember);
            }

            if (hasReactiveProperties)
            {
                @namespace = @namespace.AddUsings(UsingDirective(ParseName("System")));
                @namespace = @namespace.AddUsings(UsingDirective(ParseName("UniRx")));
                classDeclaration = classDeclaration.AddBaseListTypes(SimpleBaseType(ParseTypeName("IDisposable")));
            }

            foreach (var property in descriptor.properties)
            {
                var propertyDeclaration = CreatePropertyFor(property);
                classDeclaration = classDeclaration.AddMembers(propertyDeclaration);

                var requiredUsing = UsingDirective(ParseName(property.type.containingNamespace));
                if (!@namespace.Usings.Any(x => x.IsEquivalentTo(requiredUsing)))
                { @namespace = @namespace.AddUsings(requiredUsing); }
            }
            
            if (hasReactiveProperties)
            {
                var disposingMethods = propertyList.Where(x => x.isReactive).Select(CreateDisposerFor);

                var disposeMethod = MethodDeclaration(List<AttributeListSyntax>(),
                    TokenList(),
                    PredefinedType(Token(SyntaxKind.VoidKeyword)),
                    null,
                    Identifier("Dispose"),
                    null,
                    ParameterList(),
                    List<TypeParameterConstraintClauseSyntax>(),
                    Block(disposingMethods),
                    Token(SyntaxKind.SemicolonToken));

                classDeclaration = classDeclaration.AddMembers(disposeMethod);
            }
            
            @namespace = @namespace.AddMembers(classDeclaration);
            
            return @namespace
                .NormalizeWhitespace()
                .ToFullString();
        }
    }
}
