namespace Common.Utility;

public interface IRequestContext
{
    string RequestId { get; set; }
}

public class RequestContext : IRequestContext
{
    public string RequestId { get; set; }
}
