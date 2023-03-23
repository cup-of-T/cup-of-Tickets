using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketsServer.Api.Models;

public class Ticket
{
    [Key]
    public int TicketId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string CreatedAt { get; set; }
    public Category Category { get; set; }
    public bool Completed { get; set; }
    public bool Archived { get; set; }
    public int Urgency { get; set; }
    public string TimeEstimate { get; set; }
    public User AssignedUser { get; set; }
}