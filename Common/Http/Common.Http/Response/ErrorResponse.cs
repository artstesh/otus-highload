namespace UZ.Http.Response
{
    /// <summary>
    ///     Описывает базовый ответ с ошибкой
    /// </summary>
    /// <typeparam name="T">Тип данных ответа</typeparam>
    public class ErrorResponse : IErrorResponse
    {
        /// <summary>
        ///     Признак успешности выполнения запроса
        /// </summary>
        public bool IsSuccess { get; set; }

        /// <summary>
        ///     Список ошибок
        /// </summary>
        public IList<string> ErrorMessages { get; set; }
    }
}