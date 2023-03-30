using TicketsServer.Api.Models;

namespace TicketsServer.Api.Services;

internal static class TeamHelper
{
    public static TeamResponse TeamToTeamResponse(Team team)
    {
        var responseList = team.Users!.Select(u =>
            new User
            {
                UserId = u.UserId,
                Email = u.Email,
                Name = u.Name,
                Role = u.Role,
                ImageUrl = u.ImageUrl
            })
            .ToList();
        return new TeamResponse()
        {
            TeamId = team.TeamId,
            Name = team.Name,
            Users = responseList
        };
    }
}