using System.Drawing;
using System.Text.RegularExpressions;

namespace Common.Utility.Extensions
{
    public static class ImageExtensions
    {
        /// <summary>
        ///     Метод для вытаскивания данных для картинки из base64 строки
        /// </summary>
        /// <param name="base64">Строка base64</param>
        /// <returns>Массив битов картинки</returns>
        public static byte[] ImageDataFromBase64(string base64)
        {
            var base64Data = Regex.Match(base64, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
            if (string.IsNullOrEmpty(base64Data)) return Convert.FromBase64String(base64);
            return Convert.FromBase64String(base64Data);
        }

        public static Image ImageFromBase64(this string base64)
        {
            var imageBytes = ImageDataFromBase64(base64);
            var ms = new MemoryStream(imageBytes, 0, imageBytes.Length);
            // Convert byte[] to Image
            ms.Write(imageBytes, 0, imageBytes.Length);
            var image = Image.FromStream(ms, true);
            return image;
        }
    }
}