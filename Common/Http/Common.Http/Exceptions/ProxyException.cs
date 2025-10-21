using System.Runtime.Serialization;

namespace Common.Http.Exceptions
{
    /// <summary>
    ///     Исключение, возникающее при некорректной работе Proxy сервиса
    /// </summary>
    [Serializable]
    public class ProxyException : Exception
    {
        public ProxyException(string message) : base(message)
        {
        }

        public ProxyException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected ProxyException(SerializationInfo serializationInfo, StreamingContext streamingContext) : base(
            serializationInfo, streamingContext)
        {
        }
    }
}