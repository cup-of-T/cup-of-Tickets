using TicketsServer.Api.Requirement;
using Microsoft.AspNetCore.Authorization;

namespace TicketsServer.Api.Authorization;

class RbacHandler : AuthorizationHandler<RbacRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, RbacRequirement requirement)
    {
        if (!context.User.HasClaim(c => c.Type == "/roles"))
        {
            return Task.CompletedTask;
        }

        var permission = context.User.FindFirst(c => c.Type == "/roles" && c.Value == requirement.Role);

        if (permission == null)
        {
            return Task.CompletedTask;
        }

        context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
