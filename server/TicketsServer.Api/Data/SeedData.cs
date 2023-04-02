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
            if (context.Tickets!.Any()) { return;}
            
            var descriptions = new string[]{
                "",
                "",
                "",
            };

            var titles = new string[]{
                "Frontend bug",

            };

            var TimeEstimates = new string[]{"XS","S","M","L","XL"};

            var mathias = await context.Users.FindAsync(21);

            var categories = context.Categories.ToList();

            var tickets = new Faker<Ticket>()
                .RuleFor(ticket => ticket.Title, bogus => bogus.Name.JobTitle())
                .RuleFor(ticket => ticket.CreatedAt, bogus => bogus.Name.JobTitle())
                .RuleFor(ticket => ticket.Description, bogus => bogus.Name.JobTitle())
                .RuleFor(ticket => ticket.Archived, bogus => bogus.Random.Bool())
                .RuleFor(ticket => ticket.Urgency, bogus => 0)
                .RuleFor(ticket => ticket.Status, bogus => bogus.Random.Number(0,0))
                .RuleFor(ticket => ticket.TimeEstimate, bogus => bogus.Random.ArrayElement<string>(TimeEstimates))
                .RuleFor(ticket => ticket.Creator, bogus => mathias)
                .RuleFor(ticket => ticket.Title, bogus => bogus.Name.JobTitle())            
                .RuleFor(ticket => ticket.Categories, bogus => bogus.Random.ListItems(categories, (bogus.Random.Number(1,3))))
                .Generate(25);

            await context.Tickets.AddRangeAsync(tickets);
            await context.SaveChangesAsync();
        };
    }
}
