using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketsServer.Api.Models;

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
    public async Task<ActionResult<IEnumerable<Ticket>>> GetTicket()
    {
        if (_context.Tickets == null)
        {
            return NotFound();
        }
        return await _context.Tickets
        .Include(ticket => ticket.AssignedUser)
        .Include(ticket => ticket.Creator)
        .Include(ticket => ticket.Categories)
        .ToListAsync();
    }

    [HttpGet("{id}")]
    [Authorize("User")]
    public async Task<ActionResult<Ticket>> GetTicket(int id)
    {
        if (_context.Tickets == null)
        {
            return NotFound();
        }

        var ticket = await _context.Tickets
        .Include(ticket => ticket.AssignedUser)
        .Include(ticket => ticket.Creator)
        .Include(ticket => ticket.Categories)
        .FirstOrDefaultAsync(ticket => ticket.TicketId == id);

        if (ticket == null)
        {
            return NotFound();
        }

        return ticket;
    }

    [HttpPost]
    [Authorize("Manager")]
    public async Task<ActionResult<Ticket>> PostTicket(TicketRequest request)
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

        var newTicket = new Ticket()
        {
            Title = request.Title,
            CreatedAt = DateTime.Now.ToLongDateString(),
            Description = request.Description,
            Urgency = request.Urgency,
            TimeEstimate = request.TimeEstimate,
            Categories = newTicketCategoryList,
            Creator = creator
        };

        var result = _context.Tickets.Add(newTicket).Entity;
        await _context.SaveChangesAsync();

        var ticketResponse = new TicketResponse()
        {
            TicketId = result.TicketId,
            Title = result.Title,
            CreatedAt = result.CreatedAt,
            Description = result.Description,
            Urgency = result.Urgency,
            TimeEstimate = result.TimeEstimate,
            Creator = result.Creator,
            AssignedUser = result.AssignedUser,
            Categories = request.CategoryNames
        };

        return CreatedAtAction(nameof(GetTicket), new { id = result.TicketId }, ticketResponse);
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
