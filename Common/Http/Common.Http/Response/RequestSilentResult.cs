namespace UZ.Http.Response
{
    public class RequestSilentResult<TError>
    {
        public TError Error { get; set; }
        public bool IsSuccessful => Error == null;
    }
}