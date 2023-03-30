using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketsServer.Api.Models;
using TicketsServer.Api.Services;

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
        public async Task<ActionResult<IEnumerable<TeamResponse>>> GetTeam()
        {
            if (_context.Teams == null)
            {
                return NotFound();
            }
            var teams = await _context.Teams
                .Include(t => t.Users)
                .ToListAsync();

            return teams.Select(t => TeamHelper.TeamToTeamResponse(t)).ToList();
        }

        [Authorize("User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<TeamResponse>> GetTeam(int id)
        {
            if (_context.Teams == null)
            {
                return NotFound();
            }
            var team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            return TeamHelper.TeamToTeamResponse(team);
        }

        private bool TeamExists(int id)
        {
            return (_context.Teams?.Any(e => e.TeamId == id)).GetValueOrDefault();
        }
    }
}
