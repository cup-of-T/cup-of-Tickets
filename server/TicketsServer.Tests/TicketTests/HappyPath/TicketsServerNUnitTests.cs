using Microsoft.EntityFrameworkCore;
using TicketsServer.Api.Controllers;
using TicketsServer.Api.Models;
using NUnit;
using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using FluentAssertions;

namespace TicketsServer.Tests.TicketTests.HappyPath;

[TestFixture]
public class TicketsServerNUnitTests
{
    public TicketsController _controller;

    public DbContext _context;
    private DbContext CreateInMemoryDb()
    {
        var options = new DbContextOptionsBuilder<DbContext>()
        .UseInMemoryDatabase("DbContext")
        .Options;
        return new DbContext(options);
    }


        private void Seed(DbContext context)
    {

        var user = new User()
        {
            UserId = 21,
            Email = "mathias.viklund@salt.dev",
            Name = "Mathias Viklund",
            Role = "Manager",
            ImageUrl = "085feaef-28af-4001-82cb-4e50e3c0337c.jpeg",
            Teams = new List<Team>()
            {
                new Team(){TeamId=1,
                Name="Cup of tickets",
                Users=null
            }}
        };

        context.Users.Add(user);
        context.SaveChanges();

        var tickets = new List<Ticket>(){
            new Ticket(){
                Title = "Test",
                CreatedAt = (new DateTime()).ToLongTimeString(),
                TimeEstimate = "XS",
                Creator = user,
                Team = new Team(){
                    Name = "salt"
                }
            },
            new Ticket(){
                Title = "Test2",
                CreatedAt = (new DateTime()).ToLongTimeString(),
                TimeEstimate = "S",
                Creator = user,
                Team = new Team(){
                    Name = "salt"
                }
            }
        };
        context.Tickets.AddRange(tickets);
        context.SaveChanges();
    }
    [SetUp] public void Init()
    {

        _context = CreateInMemoryDb();
        Seed(_context);
        _controller = new TicketsController(_context);
    }
    [TearDown] public void Dispose()
    {
        // _context.Dispose();
        _context.Database.EnsureDeleted();
    }

    [Test] 
    public async Task getTickets_returns_Ok()
    {
        // act
        var response = await _controller.GetTickets();
        // assert
        Assert.IsAssignableFrom<ActionResult<IList<TicketResponse>>>(response);
    }

    [Test]
    public async Task getTickets_should_return_ok() 
    {
        // act
        var response = await _controller.GetTickets();
        // assert
        response.Result.Should().BeOfType<OkObjectResult>();
    }

    [Test]
    public async Task getTickets_should_return_all_tickets()
    {
        // act
        var response = await _controller.GetTickets();
        // assert
        response.Result.As<OkObjectResult>().Value.As<List<TicketResponse>>().Count.Should().Be(2);
    }

    [Test]
    public async Task getTickets_should_return_all_tickets()
    {
        // act
        var response = await _controller.GetTickets();
        // assert
        response.Result.As<OkObjectResult>().Value.As<List<TicketResponse>>().Count.Should().Be(2);
    }


}
