using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketsServer.Api.Models;

public class UserRequest
{
    public required string Email { get; set; }
    public required string ImageUrl { get; set; }
}
