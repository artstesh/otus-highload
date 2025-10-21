using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Gateway.JsonConverters
{
    public class DateTimeOffsetJsonConverter : JsonConverter<DateTimeOffset>
    {
        public override DateTimeOffset Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options)
        {
            return DateTimeOffset.ParseExact(reader.GetString(),
                "yyyy-MM-dd", CultureInfo.InvariantCulture);
        }

        public override void Write(
            Utf8JsonWriter writer,
            DateTimeOffset dateTimeValue,
            JsonSerializerOptions options)
        {
            writer.WriteStringValue(dateTimeValue.ToString(
                "yyyy-MM-dd", CultureInfo.InvariantCulture));
        }
    }
}