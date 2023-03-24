using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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
    public bool Completed { get; set; }
    public required string TimeEstimate { get; set; }
    public User? AssignedUser { get; set; }
    public List<Category>? Category { get; set; }
}