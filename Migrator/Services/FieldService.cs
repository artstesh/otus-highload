using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Fields.Entities;
using Common.Http.Extensions;

namespace AgroPlatform.Migrator.Services
{
    public class FieldService
    {
        private readonly HttpClient _httpClient;

        public FieldService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        internal async Task CreateFieldsAsync(List<Field> fields)
        {
            for (var index = 0; index < fields.Count; index++)
            {
                var field = fields[index];
                Console.WriteLine($"{index} of {fields.Count} processing");
                await _httpClient.PostAsync("field", field);
            }
        }

        internal async Task Reset()
        {
                await _httpClient.PostAsync("reset", null);
        }
    }
}
