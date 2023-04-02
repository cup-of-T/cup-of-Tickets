using System.ComponentModel.DataAnnotations;
namespace TicketsServer.Api.Models;

public class Ticket
{
    [Key]
    public int TicketId { get; set; }
    public required string Title { get; set; }
    public required string CreatedAt { get; set; }
    public string? Description { get; set; }
    public bool Archived { get; set; }
    public int Urgency { get; set; }
    public int Status { get; set; }
    public required string TimeEstimate { get; set; }
    public required User Creator { get; set; }
    public required Team Team { get; set; }
    public User? AssignedUser { get; set; }
    public List<Category>? Categories { get; set; }
}