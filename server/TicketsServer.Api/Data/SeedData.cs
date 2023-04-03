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
    public async static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new DbContext(serviceProvider.GetRequiredService<DbContextOptions<DbContext>>()))
        {
            if (context.Tickets!.Any()) { return; }

            var descriptions = new string[]{
                "check the github project for additional info",
                "do not get expected response from request",
                "input border color does not change on hover",
                "color of the sidebar does not match the new palette",
                "update icons to thinner versions",
                "post endpoint crashes when trying send a RAND currency",
                "return value of the loan is mismatched by 0.0000001",
                "navbar hover should not increase size of icon",
                "cookie window should increase size with new content",
                "authorization should include the new role"
            };

            var titles = new string[]{
                "Frontend bug",
                "Backend issue",
                "500 error when posting user",
                "button hover not working",
                "icon is too small",
                "navbar avatar does not load",
                "post endpoint does not take currency",
                "make patch method DRYer",
                "add test for patch bankloan",
                "cookie popup out of scope",
                "cookie window fix"
            };

            var TimeEstimates = new string[] { "XS", "S", "M", "L", "XL" };

            var mathias = await context.Users.FindAsync(21);
            var lucas = await context.Users.FindAsync(24);
            var bjorn = await context.Users.FindAsync(25);
            if (mathias == null || lucas == null || bjorn == null)
            {
                throw new Exception("Can't find instructor");
            }
            var instructors = new User[] { mathias, lucas, bjorn };

            var categories = context.Categories.ToList();

            var teams = context.Teams.ToList();

            var tickets = new Faker<Ticket>()
                .RuleFor(ticket => ticket.Title, bogus => bogus.Random.ArrayElement<string>(titles))
                .RuleFor(ticket => ticket.Description, bogus => bogus.Random.ArrayElement<string>(descriptions))
                .RuleFor(ticket => ticket.Archived, bogus => bogus.Random.Bool())
                .RuleFor(ticket => ticket.Urgency, bogus => 0)
                .RuleFor(ticket => ticket.Status, bogus => bogus.Random.Number(0, 0))
                .RuleFor(ticket => ticket.TimeEstimate, bogus => bogus.Random.ArrayElement<string>(TimeEstimates))
                .RuleFor(ticket => ticket.Creator, bogus => bogus.Random.ArrayElement(instructors))
                .RuleFor(ticket => ticket.Team, bogus => bogus.Random.ListItem(teams))
                .RuleFor(ticket => ticket.Categories, bogus => bogus.Random.ListItems(categories, (bogus.Random.Number(1, 3))))
                .Generate(130);

            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();
        };
    }
}
