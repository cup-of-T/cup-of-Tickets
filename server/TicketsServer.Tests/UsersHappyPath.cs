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
    private readonly User MockedUser;

    public UsersHappyPath()
    {
        _options = new DbContextOptionsBuilder<DbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

        MockedUser = new User()
        {
            UserId = 1,
            Email = "donna@kraken.se",
            Name = "Donna Soujeh",
            Role = "Developer",
        };
    }

    [Fact]
    public async Task GetUsers_returns_list_of_UserResponse()
    {
        var mockedFileService = new Mock<IFileService>();
        using (var context = new DbContext(_options))
        {
            context.Users.Add(MockedUser);
            await context.SaveChangesAsync();

            var controller = new UsersController(context, mockedFileService.Object);

            var response = await controller.GetUsers();

            Assert.Equal(typeof(List<UserResponse>), response.Value?.GetType());
            response.Value?.Count().Should().Be(1);
            response.Value?[0].Name.Should().Be("Donna Soujeh");
        }
    }



}
