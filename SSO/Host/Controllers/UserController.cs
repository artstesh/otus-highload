using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OtusHighload.Application.Services;
using OtusHighload.Attributes;
using OtusHighload.Entities;

namespace OtusHighload.Controllers;

[Route("api/v1/[controller]")]
[Auth]
public class UserController
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet(""), Produces("application/json")]
    [ProducesResponseType(typeof(List<AppUser>), StatusCodes.Status200OK)]
    public Task<List<AppUser>> List(CancellationToken ct)
    {
        return _userService.List(ct);
    }

    [HttpGet("{id}"), Produces("application/json")]
    [ProducesResponseType(typeof(AppUser), StatusCodes.Status200OK)]
    public Task<AppUser?> GetUser(Guid id, CancellationToken ct)
    {
        return _userService.Get(id, ct);
    }

    [HttpPost(""), Produces("application/json")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    public Task<bool> Create([FromBody] AppUser item, string password, CancellationToken ct)
    {
        return _userService.CreateUser(item, password, ct);
    }
}
