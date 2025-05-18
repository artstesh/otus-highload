using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OtusHighload.Application.Services;
using OtusHighload.Attributes;
using OtusHighload.Contracts.DTO;
using OtusHighload.Entities;
using OtusHighload.Services;


[Route("[controller]")]
public class LoginController: Controller
{
    private readonly IUserService _userService;
    private readonly IAuthStoreService _authStoreService;

    public LoginController(IUserService userService, IAuthStoreService authStoreService)
    {
        _userService = userService;
        _authStoreService = authStoreService;
    }

    [HttpPost(""), Produces("application/json")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Create([FromBody] SignInModel data, CancellationToken ct)
    {
        var valid = await _userService.CheckPassword(data.UserId.ToString(), data.Password, ct);
        if (valid) return Ok(_authStoreService.AddEntry(data.UserId));
        return BadRequest();
    }
}
