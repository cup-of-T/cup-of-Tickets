namespace TicketsServer.Api.Models;

public class TeamResponse
{
    public int TeamId { get; set; }
    public required string Name { get; set; }
    public List<User>? Users { get; set; }
}