using System.ComponentModel.DataAnnotations;

namespace TicketsServer.Api.Models;

public class Team
{
    [Key]
    public int TeamId { get; set; }
    public string Name { get; set; }
    public List<User> Users { get; set; }
}