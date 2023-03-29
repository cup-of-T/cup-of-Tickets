using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TicketsServer.Api.Models;

public class Category
{
    [Key]
    public int CategoryId { get; set; }
    public required string Name { get; set; }
    public List<Ticket>? Tickets { get; set; }
}