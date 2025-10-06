using Microsoft.AspNetCore.Mvc;
using OtusHighload.Application.Services;
using OtusHighload.Contracts.Models;
using OtusHighload.Services;

namespace OtusHighload.Controllers;

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
        var logged = _authStoreService.CheckExisting(data.UserId);
        if (logged != null) return Ok(logged);
        var valid = await _userService.CheckPassword(data.UserId, data.Password, ct);
        if (valid) return Ok(_authStoreService.AddEntry(data.UserId));
        return BadRequest();
    }
}