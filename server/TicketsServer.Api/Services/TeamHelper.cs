using TicketsServer.Api.Models;

namespace TicketsServer.Api.Services;

internal static class TeamHelper
{
    public static TeamResponse TeamToTeamResponse(Team team)
    {
        var responseList = team.Users!.Select(t =>
            new User
            {
                UserId = t.UserId,
                Email = t.Email,
                Name = t.Name,
                Role = t.Role,
                ImageUrl = t.ImageUrl
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