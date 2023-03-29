namespace TicketsServer.Api.Models;

public class TicketRequest
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string TimeEstimate { get; set; }
    public int Urgency { get; set; }
    public required List<string> CategoryNames { get; set; }
    public int UserId { get; set; }
}