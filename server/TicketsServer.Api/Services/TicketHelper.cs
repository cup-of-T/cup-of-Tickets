using TicketsServer.Api.Models;

namespace TicketsServer.Api.Services;

internal static class TicketHelper
{
    public static TicketResponse TicketToResponse(Ticket ticket)
    {
        var responseList = ticket.Categories!.Select(cat =>
            new Category
            {
                CategoryId = cat.CategoryId,
                Name = cat.Name
            })
            .ToList();

        return new TicketResponse()
        {
            TicketId = ticket.TicketId,
            Title = ticket.Title,
            CreatedAt = ticket.CreatedAt,
            Description = ticket.Description,
            Archived = ticket.Archived,
            Urgency = ticket.Urgency,
            Status = ticket.Status,
            TimeEstimate = ticket.TimeEstimate,
            Creator = ticket.Creator,
            AssignedUser = ticket.AssignedUser,
            Categories = responseList
        };
    }
}