using Microsoft.AspNetCore.Authorization;

namespace TicketsServer.Api.Requirement;

class RbacRequirement : IAuthorizationRequirement
{
    public string Role { get; }

    public RbacRequirement(string role)
    {
        Role = role ?? throw new ArgumentNullException(nameof(role));
    }
}
