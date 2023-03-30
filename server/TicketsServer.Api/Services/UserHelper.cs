using TicketsServer.Api.Models;

namespace TicketsServer.Api.Services;

internal static class UserHelper
{
    public static UserResponse UserToUserResponse(User user)
    {
        var responseList = user.Teams?.Select(t =>
            new Team
            {
                TeamId = t.TeamId,
                Name = t.Name,
            })
            .ToList();

        return new UserResponse()
        {
            UserId = user.UserId,
            Email = user.Email,
            Name = user.Name,
            Role = user.Role,
            ImageUrl = user.ImageUrl,
            Teams = responseList
        };
    }
}