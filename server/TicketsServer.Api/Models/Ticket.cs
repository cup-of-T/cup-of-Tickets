using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketsServer.Api.Models;

public class Ticket
{
    [Key]
    public int TicketId { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public required string CreatedAt { get; set; }
    public required Category Category { get; set; }
    public required bool Completed { get; set; }
    public required bool Archived { get; set; }
    public required int Urgency { get; set; }
    public required string TimeEstimate { get; set; }
    public  User? AssignedUser { get; set; }
}