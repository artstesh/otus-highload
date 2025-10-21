namespace Common.Http.Response
{
    /// <summary>
    ///     Описывает базовый ответ на запрос
    /// </summary>
    /// <typeparam name="T">Тип данных ответа</typeparam>
    public class BaseResponse<T> : ErrorResponse, IBaseResponse<T>
    {
        /// <summary>
        ///     Результат запроса при успешном выполнении
        /// </summary>
        public T Result { get; set; }
    }
}