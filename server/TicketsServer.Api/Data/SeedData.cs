using System.Threading;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bogus;
using Microsoft.EntityFrameworkCore;
using TicketsServer.Api.Models;

namespace TicketsServer.Api.Data;

public class SeedData
{
    private static int getUrgency(int num)
    {
        if (num >= 10) return 2;
        if (num >= 8) return 1;
        return 0;
    }
    public async static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new DbContext(serviceProvider.GetRequiredService<DbContextOptions<DbContext>>()))
        {
            if (context.Tickets!.Any()) { return; }
            int ticketIndex = 0;
            int teamId = 0;

            var titles = new string[]{
                "HTTP returns 500",
                "Icon renders wrong image",
                "New endpoint in DbController",
                "Add users to onboarding",
                "Update dependencies",
                "Implement E2E test",
                "Add auth claims",
                "Implement component for adding products",
                "Fix navbar",
                "Invite new employees to Git",
            };
            var descriptions = new string[]{
                "The PUT request for editing this one feature returns 500 in deployment but not in development. It gives the errormessage \"Lorem Ipsum\".",
                "The header icon in the user-card at \"app.com/Profile\" has a strange behaviour when coming from different routes.",
                "Implement a new endpoint for GET'ing tickets from the Tickets-table, and return a list filtered by a paramater for Archived status. ",
                "Start the onboarding process in ServiceNow for all new employees. HR has a list of all user-details.",
                "We get some warning when building our backend, warning us about perhaps outdated libraries. Please check it out.",
                "We need a fresh E2E test that should check the entire slice. Testing through swagger is not a good solution.",
                "Add ticket:create and ticket:delete claim to Auth roles: SysAdmin and Admin.",
                "Refactor the \"Add product\" html page into a React component and reuse it where it is being used.",
                "QA reports some unexpected behaviour from our navbar. Please investigate and contact QA for more details.",
                "HR has a list of new recruits and we need to add all users to our GitHub organisation. We're missing some user-names from the new Employees, contact Sarah at HR to help with that."
            };

            var TimeEstimates = new string[] { "XS", "S", "M", "L", "XL" };

            var instructors = await context.Users.Include(u => u.Teams).Where(u => u.Role == "Manager").ToListAsync();

            var categories = await context.Categories.ToListAsync();

            var teams = await context.Teams.Where(t => t.TeamId >= 1 && t.TeamId <= 6).ToListAsync();

            var tickets = new Faker<Ticket>()
                .RuleFor(ticket => ticket.Title, bogus =>
                {
                    ticketIndex = bogus.Random.Number(0, 9);
                    return titles[ticketIndex];
                })
                .RuleFor(ticket => ticket.Description, bogus => descriptions[ticketIndex])
                .RuleFor(ticket => ticket.Archived, bogus => false)
                .RuleFor(ticket => ticket.CreatedAt, bogus => DateTime.Now.ToString("yyyy/MM/dd HH:mm"))
                .RuleFor(ticket => ticket.Urgency, bogus => getUrgency(bogus.Random.Number(1, 10)))
                .RuleFor(ticket => ticket.Status, bogus => 0)
                .RuleFor(ticket => ticket.TimeEstimate, bogus => bogus.Random.ArrayElement<string>(TimeEstimates))
                .RuleFor(ticket => ticket!.Team, bogus =>
                {
                    var team = teams[bogus.Random.Number(0, teams.Count! - 1)];
                    teamId = team.TeamId;
                    return team;
                })
                .RuleFor(ticket => ticket.Creator, bogus =>
                {
                    var teamInstructors = instructors
                        .Where(u => u.Teams!.Any(t => t.TeamId == teamId))
                        .ToList();
                    return bogus.Random.ListItem(teamInstructors);
                })
                .RuleFor(ticket => ticket.Categories, bogus => bogus.Random.ListItems(categories, (bogus.Random.Number(1, 3))))
                .Generate(130);

            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();
        };
    }
}



// for (int i = 0; i < 130; i++)
// {
//     var ticket = new Faker<Ticket>()
//         .RuleFor(ticket => ticket.Title, bogus => titles[i%10])
//         .RuleFor(ticket => ticket.Description, bogus => descriptions[i%10])
//         .RuleFor(ticket => ticket.Archived, bogus => false)
//         .RuleFor(ticket => ticket.CreatedAt, bogus => DateTime.Now.ToString("yyyy/MM/dd HH:mm"))
//         .RuleFor(ticket => ticket.Urgency, bogus => 0)
//         .RuleFor(ticket => ticket.Status, bogus => bogus.Random.Number(0, 0))
//         .RuleFor(ticket => ticket.TimeEstimate, bogus => bogus.Random.ArrayElement<string>(TimeEstimates))
//         .RuleFor(ticket => ticket.Creator, bogus => bogus.Random.ArrayElement(instructors))
//         .RuleFor(ticket => ticket.Team, bogus => bogus.Random.ListItem(teams))
//         .RuleFor(ticket => ticket.Categories, bogus => bogus.Random.ListItems(categories, (bogus.Random.Number(1, 3))))
//         .Generate();
//     await context.Tickets.AddAsync(ticket);
// }
