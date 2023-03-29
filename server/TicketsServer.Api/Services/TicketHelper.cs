using TicketsServer.Api.Models;

namespace TicketsServer.Api.Services;

internal static class TicketHelper
{
    public static TicketResponse TicketToResponse(Ticket ticket)
    {
        var responseList = new List<string>();
        if (ticket.Categories != null)
        {
            responseList = ticket.Categories.Select(cat => cat.Name).ToList();
        }
        return new TicketResponse()
        {
            TicketId = ticket.TicketId,
            Title = ticket.Title,
            CreatedAt = ticket.CreatedAt,
            Description = ticket.Description,
            Urgency = ticket.Urgency,
            TimeEstimate = ticket.TimeEstimate,
            Creator = ticket.Creator,
            AssignedUser = ticket.AssignedUser,
            Categories = responseList
        };
    }
}