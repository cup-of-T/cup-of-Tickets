using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketsServer.Api.Models;
using TicketsServer.Api.Services;
using System.Globalization;

namespace TicketsServer.Api.Controllers;
[Route("api/[controller]")]
[ApiController]

public class UsersController : ControllerBase
{
    private readonly string teamName = "</salt>";
    private readonly DbContext _context;
    private readonly IFileService _fileservice;

    public UsersController(DbContext context, IFileService fileService)
    {
        _context = context;
        _fileservice = fileService;
    }

    [HttpGet]
    [Authorize("User")]
    public async Task<ActionResult<IEnumerable<UserResponse>>> GetUsers()
    {
        if (_context.Users == null)
        {
            return NotFound();
        }
        var users = await _context.Users
            .Include(u => u.Teams)
            .ToListAsync();
        return users.Select(user => UserHelper.UserToUserResponse(user)).ToList();
    }

    [HttpPost]
    [Authorize("User")]
    public async Task<ActionResult<UserResponse>> GetOrPostUser()
    {
        string token = Request.Headers["Authorization"].ToString().Substring("Bearer ".Length).Trim();
        var handler = new JwtSecurityTokenHandler();
        var decodedToken = handler.ReadJwtToken(token);

        var email = decodedToken.Claims.FirstOrDefault(c => c.Type == "/email")!.Value;
        if (email == null)
        {
            return Forbid();
        }
        var existingUser = _context.Users.Include(u => u.Teams).FirstOrDefault(u => u.Email == email);
        if (existingUser != null)
        {
            return Ok(UserHelper.UserToUserResponse(existingUser));
        }
        var picture = decodedToken.Claims.FirstOrDefault(c => c.Type == "/picture")!.Value;
        var roles = decodedToken.Claims.Where(c => c.Type == "/roles")
                                        .Select(role => role.Value)
                                        .ToList();


        // var team = await _context.Teams.FirstOrDefaultAsync(t => t.Name == teamName);
        // if (team == null)
        // {
        //     return BadRequest();
        // }

        roles.Sort();
        var role = roles[0];

        var name = email.Split('@')[0].Replace('.', ' ');
        var textInfo = new CultureInfo("en-US", false).TextInfo;

        var user = new User()
        {
            Email = email,
            Name = textInfo.ToTitleCase(name),
            ImageUrl = picture,
            Role = role,
            Teams = new List<Team>()
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUsers), new { id = user.UserId }, UserHelper.UserToUserResponse(user));
    }

    [HttpPut("{id}")]
    [Authorize("User")]
    public async Task<IActionResult> PutUser(int id, [FromForm] ChangeUserRequest userRequest)
    {
        var userToUpdate = await _context.Users.FindAsync(id);
        if (userToUpdate == null)
        {
            return NotFound();
        }

        var picturePath = "";
        if (userRequest.Picture != null)
        {
            _fileservice.DeleteImage(userToUpdate.ImageUrl!);
            picturePath = await _fileservice.UploadImage(userRequest.Picture);
        }


        if (String.IsNullOrEmpty(picturePath))
        {
            picturePath = userToUpdate.ImageUrl;
        }

        userToUpdate.Name = userRequest.Name;
        userToUpdate.ImageUrl = picturePath!;

        _context.Entry(userToUpdate).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return Ok(userToUpdate);
    }

}