namespace UZ.Http.Response
{
    public class RequestResult<TResponse, TError> : RequestSilentResult<TError>
    {
        public TResponse Data { get; set; }
    }
}