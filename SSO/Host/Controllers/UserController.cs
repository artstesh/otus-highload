using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OtusHighload.Application.Services;
using OtusHighload.Attributes;
using OtusHighload.Contracts.Models;
using OtusHighload.Entities;

namespace OtusHighload.Controllers;

[Route("[controller]")]
public class UserController : Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [Auth]
    [HttpGet("list"), Produces("application/json")]
    [ProducesResponseType(typeof(List<AppUser>), StatusCodes.Status200OK)]
    public Task<List<AppUser>> List(CancellationToken ct)
    {
        return _userService.List(ct);
    }

    [Auth]
    [HttpGet("get/{id}"), Produces("application/json")]
    [ProducesResponseType(typeof(AppUser), StatusCodes.Status200OK)]
    public Task<AppUser?> GetUser(Guid id, CancellationToken ct)
    {
        return _userService.Get(id, ct);
    }

    [Auth]
    [HttpGet("search"), Produces("application/json")]
    [ProducesResponseType(typeof(List<AppUser>), StatusCodes.Status200OK)]
    public Task<List<AppUser>> SearchUsers(string? firstName, string? lastName, CancellationToken ct)
    {
        return _userService.SearchByName(firstName, lastName, ct);
    }

    [HttpPost("register"), Produces("application/json")]
    [ProducesResponseType(typeof(Guid?), StatusCodes.Status200OK)]
    public Task<Guid?> Create([FromBody] AppUserCreateDto item, CancellationToken ct)
    {
        return _userService.CreateUser(item, ct);
    }

    [HttpPost("generate"), Produces("application/json")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    public Task<bool> CreateRandomUsers(CancellationToken ct, int count = 1000000)
    {
        return _userService.CreateRandomUsers(ct, count);
    }
}
