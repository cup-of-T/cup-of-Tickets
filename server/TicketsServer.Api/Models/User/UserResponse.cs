using System.ComponentModel.DataAnnotations;

namespace TicketsServer.Api.Models;

public class UserResponse
{
    public int UserId { get; set; }
    public required string Email { get; set; }
    public string? Name { get; set; }
    public string? Role { get; set; }
    public string? ImageUrl { get; set; }
    public List<Team>? Teams { get; set; }
    

}