using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketsServer.Api.Models;
using TicketsServer.Api.Services;

namespace TicketsServer.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TicketsController : ControllerBase
{
    private readonly DbContext _context;

    public TicketsController(DbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Authorize("User")]
    public async Task<ActionResult<IList<TicketResponse>>> GetTickets()
    {
        if (_context.Tickets == null)
        {
            return NotFound();
        }
        var tickets = await _context.Tickets
        .Include(ticket => ticket.AssignedUser)
        .Include(ticket => ticket.Creator)
        .Include(ticket => ticket.Categories)
        .Include(ticket => ticket.Team)
        .ToListAsync();

        var ticketResponse = tickets.Select(ticket => TicketHelper.TicketToResponse(ticket)).ToList();

        return Ok(ticketResponse);
    }

    [HttpGet("{id}")]
    [Authorize("User")]
    public async Task<ActionResult<TicketResponse>> GetTicket(int id)
    {
        if (_context.Tickets == null)
        {
            return NotFound();
        }

        var ticket = await _context.Tickets
        .Include(ticket => ticket.AssignedUser)
        .Include(ticket => ticket.Creator)
        .Include(ticket => ticket.Categories)
        .Include(ticket => ticket.Team)
        .FirstOrDefaultAsync(ticket => ticket.TicketId == id);

        if (ticket == null)
        {
            return NotFound();
        }

        return TicketHelper.TicketToResponse(ticket);
    }

    [HttpPost]
    [Authorize("Manager")]
    public async Task<ActionResult<TicketResponse>> PostTicket(TicketRequest request)
    {
        var creator = await _context.Users.FirstOrDefaultAsync(u => u.UserId == request.UserId);
        if (creator == null)
        {
            return BadRequest();
        }
        
        var newTicketCategoryList = new List<Category>();
        foreach (var categoryName in request.CategoryNames)
        {
            var categoryToAdd = await _context.Categories
                .FirstOrDefaultAsync(c => c.Name == categoryName);
            if (categoryToAdd == null)
            {
                return BadRequest();
            }
            newTicketCategoryList.Add(categoryToAdd);
        }
        var team = await _context.Teams.FirstOrDefaultAsync(t => t.TeamId == request.TeamId);
        if (team == null)
        {
            return BadRequest();
        }

        var newTicket = new Ticket()
        {
            Title = request.Title,
            CreatedAt = DateTime.Now.ToString("yyyy/MM/dd HH:mm"),
            Description = request.Description,
            Urgency = request.Urgency,
            TimeEstimate = request.TimeEstimate,
            Categories = newTicketCategoryList,
            Creator = creator,
            Team = team
        };

        var result = _context.Tickets.Add(newTicket).Entity;
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetTicket),
             new { id = result.TicketId },
             TicketHelper.TicketToResponse(result)
         );
    }

    [HttpDelete("{id}")]
    [Authorize("Manager")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        if (_context.Tickets == null)
        {
            return NotFound();
        }
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize("Manager")]
    public async Task<IActionResult> PutTicket(int id, Ticket ticket)
    {
        if (id != ticket.TicketId)
        {
            return BadRequest();
        }

        _context.Entry(ticket).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TicketExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpPatch("{id}/status")]
    [Authorize("User")]
    public async Task<IActionResult> PatchTicketStatus(int id, TicketStatusRequest request)
    {
        var ticketToUpdate = await _context.Tickets.FindAsync(id);

        if (ticketToUpdate == null)
        {
            return NotFound();
        }

        ticketToUpdate.Status = request.Status;
        _context.Entry(ticketToUpdate).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TicketExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    [HttpPatch("{id}/archived")]
    [Authorize("User")]
    public async Task<IActionResult> PatchTicketArchived(int id, TicketArchivedRequest request)
    {
        var ticketToUpdate = await _context.Tickets.FindAsync(id);

        if (ticketToUpdate == null)
        {
            return NotFound();
        }

        ticketToUpdate.Archived = request.Archived;
        _context.Entry(ticketToUpdate).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TicketExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    [HttpPatch("{id}/assignedto")]
    [Authorize("User")]
    public async Task<IActionResult> PatchTicketAssignedTo(int id, [FromBody] TicketAssigneeRequest request)
    {
        var ticketToUpdate = await _context.Tickets.FindAsync(id);

        if (ticketToUpdate == null)
        {
            return NotFound();
        }


        var assignedUser = await _context.Users.FindAsync(request.AssigneeId);

        if (assignedUser == null)
        {
            return NotFound();
        }

        ticketToUpdate.AssignedUser = assignedUser;
        _context.Entry(ticketToUpdate).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TicketExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    private bool TicketExists(int id)
    {
        return (_context.Tickets?.Any(e => e.TicketId == id)).GetValueOrDefault();
    }
}
