namespace UZ.Http.Response;

public class HttpOperationResult
{
    public List<string> Errors { get; set; } = new List<string>();

    public bool IsSuccessful => Errors.Count == 0;
}