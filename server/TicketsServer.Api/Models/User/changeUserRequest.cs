using System.ComponentModel.DataAnnotations;

namespace TicketsServer.Api.Models;

public class ChangeUserRequest
{
    public required string? Name { get; set; }
    public IFormFile? Picture { get; set; }
}