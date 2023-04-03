using System.Reflection.Metadata.Ecma335;
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
        
        var team = new Team(){
                    TeamId= 1,
                    Name = "salt"
                };

        _context.Teams.Add(team);
        _context.SaveChanges();

        var user = new User()
        {
            UserId = 21,
            Email = "mathias.viklund@salt.dev",
            Name = "Mathias Viklund",
            Role = "Manager",
            ImageUrl = "085feaef-28af-4001-82cb-4e50e3c0337c.jpeg",
            Teams = new List<Team>()
            {
                team
            }
        };

        context.Users.Add(user);
        context.SaveChanges();

        var tickets = new List<Ticket>(){
            new Ticket(){
                TicketId = 1,
                Title = "Test",
                CreatedAt = (new DateTime()).ToLongTimeString(),
                TimeEstimate = "XS",
                Creator = user,
                Team = team
            },
            new Ticket(){
                TicketId = 2,
                Title = "Test2",
                CreatedAt = (new DateTime()).ToLongTimeString(),
                TimeEstimate = "S",
                Creator = user,
                Team = team
                }
            };

        context.Tickets.AddRange(tickets);
        context.SaveChanges();
    }

    TicketRequest ticketRequest = new TicketRequest()
    {
        UserId = 1,
        Title = "Test",
        TimeEstimate = "XS",
        Description = "Hi",
        TeamId = 1,
        CategoryNames = new List<string>(){"salt"}
    };

    [SetUp] public void Init()
    {

        _context = CreateInMemoryDb();
        Seed(_context);
        _controller = new TicketsController(_context);
    }
    [TearDown] public void Dispose()
    {
        _context.Database.EnsureDeleted();
    }

    [Test] 
    public async Task getTickets_returns_Ok()
    {
        // act
        var response = await _controller.GetTickets(1);
        // assert
        Assert.IsAssignableFrom<ActionResult<IList<TicketResponse>>>(response);
    }

    [Test]
    public async Task getTickets_should_return_ok() 
    {
        // act
        var response = await _controller.GetTickets(1);
        // assert
        response.Result.Should().BeOfType<OkObjectResult>();
    }

    [Test]
    public async Task getTickets_should_return_all_tickets()
    {
        // act
        var response = await _controller.GetTickets(1);
        // assert
        response.Result.As<OkObjectResult>().Value.As<IList<TicketResponse>>().Count.Should().Be(2);
    }

    [Test] 
    public async Task getTicket_returns_Ok()
    {
        // act
        var response = await _controller.GetTicket(1, 1);
        // assert
        Assert.IsAssignableFrom<ActionResult<TicketResponse>>(response);
    }
    [Test]
    public async Task getTicket_should_return_right_ticket()
    {
        // act
        var response = await _controller.GetTicket(1,1);
        // assert
        response.Result.As<OkObjectResult>().Value.As<TicketResponse>().TicketId.Should().Be(1);
    }
    [Test]
    public async Task getTicket_should_return_404_for_non_existant_id()
    {
        // act
        var response = await _controller.GetTicket(1 , -1);
        // assert
        response.Result.Should().BeOfType<NotFoundResult>();
    }
    [Test]
    public async Task PatchStatus_should_return_no_content()
    {
        // arrange
        var request = new TicketStatusRequest(){
            Status = 1
        };
        // act
        var response = await _controller.PatchTicketStatus(1, request);
        // assert
        response.Should().BeOfType<NoContentResult>();
    }
    // [Test]
    // public async Task PatchAssignee_should_return_no_content()
    // {
    //      // arrange
    //     var request = new TicketAssigneeRequest(){
    //         AssigneeId = 2
    //     };
    //     // act
    //     var response = await _controller.PatchTicketAssignedTo(1, request);
    //     // assert
    //     response.Should().BeOfType<NoContentResult>(); 
    // }
    // [Test]
    // public async Task PostTicket_should_return_ok()
    // {
    //     // act
    //     var response = await _controller.PostTicket(ticketRequest);
    //     // assert
    //     response.Result.Should().BeOfType<CreatedAtActionResult>();
    // }
}


