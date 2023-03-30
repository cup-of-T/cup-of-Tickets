using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketsServer.Api.Models;
using TicketsServer.Api.Services;

namespace TicketsServer.Api.Controllers;
[Route("api/[controller]")]
[ApiController]

public class UsersController : ControllerBase
{
    private readonly string teamName = "</salt>";
    private readonly DbContext _context;


    public UsersController(DbContext context)
    {
        _context = context;
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
        var existingUser = _context.Users.FirstOrDefault(u => u.Email == email);
        if (existingUser != null)
        {
            return Ok(existingUser);
        }
        var picture = decodedToken.Claims.FirstOrDefault(c => c.Type == "/picture")!.Value;
        var roles = decodedToken.Claims.Where(c => c.Type == "/roles")
                                        .Select(role => role.Value)
                                        .ToList();

        var team = await _context.Teams.FirstOrDefaultAsync(t => t.Name == teamName);
        if (team == null)
        {
            return BadRequest();
        }
        roles.Sort();
        var role = roles[0];
        var user = new User()
        {
            Email = email,
            Name = email.Split('@')[0],
            ImageUrl = picture,
            Role = role,
            Teams = new List<Team> { team }
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUsers), new { id = user.UserId }, UserHelper.UserToUserResponse(user));
    }

    //__________I DONT THINK WE NEED THIS SPAGHETTI ANYMORE________

    // [HttpGet("/email/{email}")]
    // [Authorize("User")]
    // public async Task<ActionResult<User>> GetUser(string email)
    // {
    //     if (_context.Users == null)
    //     {
    //         return NotFound();
    //     }
    //     var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    //     if (user == null)
    //     {
    //         return NoContent();
    //     }
    //     return user;
    // }

    // [HttpGet("{id}")]
    // public async Task<ActionResult<User>> GetUser(int id)
    // {
    //   if (_context.Users == null)
    //   {
    //       return NotFound();
    //   }
    //     var user = await _context.Users.FindAsync(id);

    //     if (user == null)
    //     {
    //         return NotFound();
    //     }

    //     return user;
    // }

    // [HttpPut("{id}")]
    // public async Task<IActionResult> PutUser(int id, User user)
    // {
    //     if (id != user.UserId)
    //     {
    //         return BadRequest();
    //     }

    //     _context.Entry(user).State = EntityState.Modified;

    //     try
    //     {
    //         await _context.SaveChangesAsync();
    //     }
    //     catch (DbUpdateConcurrencyException)
    //     {
    //         if (!UserExists(id))
    //         {
    //             return NotFound();
    //         }
    //         else
    //         {
    //             throw;
    //         }
    //     }

    //     return NoContent();
    // }


    // [HttpDelete("{id}")]
    // public async Task<IActionResult> DeleteUser(int id)
    // {
    //     if (_context.Users == null)
    //     {
    //         return NotFound();
    //     }
    //     var user = await _context.Users.FindAsync(id);
    //     if (user == null)
    //     {
    //         return NotFound();
    //     }

    //     _context.Users.Remove(user);
    //     await _context.SaveChangesAsync();

    //     return NoContent();
    // }

    // private bool UserExists(int id)
    // {
    //     return (_context.Users?.Any(e => e.UserId == id)).GetValueOrDefault();
    // }
}