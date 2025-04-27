using System.Text;
using System.Xml.Linq;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Common.Utility.SwaggerFilters
{
    /// <summary>
    ///     Provides descriptions for enum values for the swagger
    /// </summary>
    public class EnumTypesSchemaFilter : ISchemaFilter
    {
        private readonly XDocument _xmlComments;

        /// <summary>
        ///     The path of the documentation file
        /// </summary>
        /// <param name="xmlPath"></param>
        public EnumTypesSchemaFilter(string xmlPath)
        {
            if (File.Exists(xmlPath)) _xmlComments = XDocument.Load(xmlPath);
        }

        public void Apply(OpenApiSchema schema, SchemaFilterContext context)
        {
            if (_xmlComments == null) return;

            if (schema?.Enum == null || schema.Enum.Count <= 0 || context?.Type == null || !context.Type.IsEnum) return;
            var builder = new StringBuilder("<p>Members:</p><ul>");

            var fullTypeName = context.Type.FullName;

            schema.Enum.OfType<OpenApiString>().Select(v => v.Value).ToList().ForEach(name =>
                builder.Append(GetElementDescription(fullTypeName, name, name)));

            schema.Enum.OfType<OpenApiInteger>().Select(v => v.Value).ToList().ForEach(name =>
                builder.Append(GetElementDescription(fullTypeName,
                    Enum.ToObject(context.Type, name)?.ToString(),
                    name.ToString())));

            builder.Append("</ul>");
            schema.Description += builder.ToString();
        }

        private string GetElementDescription(string fullTypeName, string propName, string value)
        {
            var fullEnumMemberName = $"F:{fullTypeName}.{propName}";

            var enumMemberComments = _xmlComments!.Descendants("member")
                .FirstOrDefault(m => m.Attribute("name").Value.EndsWith
                    (fullEnumMemberName, StringComparison.OrdinalIgnoreCase));

            var summary = enumMemberComments?.Descendants("summary").FirstOrDefault();

            return summary == null ? string.Empty : $"<li><i>{value}</i> - {summary.Value.Trim()}</li>";
        }
    }
}