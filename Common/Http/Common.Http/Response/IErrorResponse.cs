namespace Common.Http.Response
{
    /// <summary>
    ///     Интерфейс базового ответа с ошибками
    /// </summary>
    public interface IErrorResponse
    {
        /// <summary>
        ///     Признак успешности выполнения запроса
        /// </summary>
        bool IsSuccess { get; set; }

        /// <summary>
        ///     Список ошибок
        /// </summary>
        IList<string> ErrorMessages { get; set; }
    }
}