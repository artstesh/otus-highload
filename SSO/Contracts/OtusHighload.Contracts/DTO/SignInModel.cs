namespace OtusHighload.Contracts.DTO;

public class SignInModel
{
    public required Guid UserId { get; set; }
    public required string Password { get; set; }
}
