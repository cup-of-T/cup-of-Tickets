using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicket()
        {
            if (_context.Tickets == null)
            {
                return NotFound();
            }
            return await _context.Tickets.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
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

            return ticket;
        }

        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(TicketRequest request)
        {
            var creator = await _context.Users.FirstOrDefaultAsync(u => u.UserId == request.UserId);
            if(creator == null)
            {
                return BadRequest();
            }
            var newTicketCategoryList = new List<Category>();
            foreach (var categoryName in request.CategoryNames)
            {
                var categoryToAdd = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Name == categoryName);
                if(categoryToAdd == null)
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

            return CreatedAtAction(nameof(GetTicket), new { id = result.TicketId }, result);
        }

        [HttpDelete("{id}")]
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

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchTicketStatus(int id, int status)
        {
            var ticketToUpdate = await _context.Tickets.FindAsync(id);

            if (ticketToUpdate == null)
            {
                return NotFound();
            }

            ticketToUpdate.Status = status;
             _context.Entry(ticketToUpdate).State = EntityState.Modified;

            // remove the try and catch?
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

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchTicketAssignedTo(int id, User assignedUser)
        {
            var ticketToUpdate = await _context.Tickets.FindAsync(id);

            if (ticketToUpdate == null)
            {
                return NotFound();
            }

            ticketToUpdate.AssignedUser = assignedUser;
             _context.Entry(ticketToUpdate).State = EntityState.Modified;

            // remove the try and catch?
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
                    throw ;
                }
            }

            return NoContent();
        }

        private bool TicketExists(int id)
        {
            return (_context.Tickets?.Any(e => e.TicketId == id)).GetValueOrDefault();
        }
    }
