using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketsServer.Api.Models;

namespace TicketsServer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DbContext _context;

        public UsersController(DbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize("User")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }

        [HttpGet("/email/{email}")]
        [Authorize("User")]
        public async Task<ActionResult<User>> GetUser(string email)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return NoContent();
            }
            return user;
        }

        [HttpPost]
        [Authorize("User")]
        public async Task<ActionResult<User>> PostUser()
        {
            string token = Request.Headers["Authorization"].ToString().Substring("Bearer ".Length).Trim();
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadJwtToken(token);

            var email = decodedToken.Claims.FirstOrDefault(c => c.Type == "/email")!.Value;
            if (email == null)
            {
                return Forbid();
            }
            if (_context.Users.FirstOrDefault(u => u.Email == email) != null)
            {
                return BadRequest();
            }
            var picture = decodedToken.Claims.FirstOrDefault(c => c.Type == "/picture")!.Value;
            var roles = decodedToken.Claims.Where(c => c.Type == "/roles")
                                            .Select(role => role.Value)
                                            .ToList();

            roles.Sort();
            var role = roles[0];

            var user = new User()
            {
                Email = email,
                Name = email.Split('@')[0],
                ImageUrl = picture,
                Role = role
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { id = user.UserId }, user);
        }

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
}
