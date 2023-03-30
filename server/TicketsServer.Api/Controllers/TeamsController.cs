using System;
using System.Collections.Generic;
using System.Linq;
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
    public class TeamsController : ControllerBase
    {
        private readonly DbContext _context;

        public TeamsController(DbContext context)
        {
            _context = context;
        }

        [Authorize("User")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeam()
        {
          if (_context.Team == null)
          {
              return NotFound();
          }
            return await _context.Team.ToListAsync();
        }

        [Authorize("User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
          if (_context.Team == null)
          {
              return NotFound();
          }
            var team = await _context.Team.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            return team;
        }

        private bool TeamExists(int id)
        {
            return (_context.Team?.Any(e => e.TeamId == id)).GetValueOrDefault();
        }
    }
}
