using System.ComponentModel.DataAnnotations;

namespace TicketsServer.Api.Models;

public class TicketRequest
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public bool Completed { get; set; }
    public bool Archived { get; set; }
    public int Urgency { get; set; }
    public string? Category { get; set; }
    public string? TimeEstimate { get; set; }
}