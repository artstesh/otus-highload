namespace UZ.Http.Response
{
    /// <summary>
    ///     Интерфейс базового ответа
    /// </summary>
    public interface IBaseResponse<T> : IErrorResponse
    {
        /// <summary>
        ///     Результат запроса при успешном выполнении
        /// </summary>
        T Result { get; set; }
    }
}