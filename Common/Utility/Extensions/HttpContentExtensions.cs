using System.IO.Compression;
using System.Text.Json;

namespace Common.Utility.Extensions
{
    public static class HttpContentExtensions
    {
        public static async Task<TResponse> ReadAsDtoAsync<TResponse>(this HttpContent httpContent)
        {
            var isGzip = httpContent.Headers.ContentEncoding.Contains("gzip");
            var isDeflate = !isGzip && httpContent.Headers.ContentEncoding.Contains("deflate");
            if (isGzip || isDeflate)
            {
                using Stream decompressedStream = new MemoryStream();
                if (isGzip)
                    using (var gzipStream = new GZipStream(await httpContent.ReadAsStreamAsync(),
                               CompressionMode.Decompress))
                    {
                        await gzipStream.CopyToAsync(decompressedStream);
                    }
                else if (isDeflate)
                    using (var gzipStream = new DeflateStream(await httpContent.ReadAsStreamAsync(),
                               CompressionMode.Decompress))
                    {
                        await gzipStream.CopyToAsync(decompressedStream);
                    }

                decompressedStream.Seek(0, SeekOrigin.Begin);
                var content = string.Empty;
                using (var sr = new StreamReader(decompressedStream))
                {
                    content = sr.ReadToEnd();
                }

                if (!string.IsNullOrEmpty(content)) return JsonSerializer.Deserialize<TResponse>(content);
            }

            return JsonSerializer.Deserialize<TResponse>(await httpContent.ReadAsStringAsync());
        }
    }
}