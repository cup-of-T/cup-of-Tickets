using Xunit;
using TicketsServer.Api.Controllers;
using TicketsServer.Api.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;

namespace TicketsServer.Tests;


public class UsersHappyPath
{
    private readonly DbContextOptions<DbContext> _options;
    private readonly List<Ticket> MockTickets;
    private readonly List<User> MockUsers;

    public UsersHappyPath()
    {
        _options = new DbContextOptionsBuilder<DbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

        MockUsers = new List<User>
        {
            new User()
            {
                UserId = 1,
                Email = "donna@kraken.se",
                Name = "Donna Soujeh",
                Role = "Developer",
            }
        };

        MockTickets = new List<Ticket>
        {
            // new Ticket()
            // {
            //     TicketId = 1,
            //     Title = "Do tests",
            //     CreatedAt = "2023/04/01 19:10",
            //     Description = "We need to do tests for our application. Use xUnit and EF InMemory.",
            //     Archived = false,
            //     TimeEstimate = "X",

            // }
        };
    }

    [Fact]
    public async Task Test1()
    {
        var mockedFileService = new Mock<IFileService>();
        using (var context = new DbContext(_options))
        {
            var controller = new UsersController(context, mockedFileService.Object);

            var response = await controller.GetUsers();
            
            Assert.Equal(typeof(List<UserResponse>), response.Value?.GetType());
        }
    }
}
