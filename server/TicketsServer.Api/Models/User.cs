using System.ComponentModel.DataAnnotations;

namespace TicketsServer.Api.Models;

public class User
{
    [Key]
    public int UserId { get; set; }
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string Role { get; set; }
    public string? ImageUrl { get; set; }
    public List<Team>? Teams { get; set; }


}