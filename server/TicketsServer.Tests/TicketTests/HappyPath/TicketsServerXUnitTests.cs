// using Microsoft.EntityFrameworkCore;
// using TicketsServer.Api.Controllers;
// using TicketsServer.Api.Models;
// using Microsoft.AspNetCore.Mvc;
// using Xunit;

// namespace TicketsServer.Tests.TicketTests.HappyPath;

// public class TicketsServerUnitTests
// {
//     private DbContext CreateInMemoryDb(string dbName)
//     {
//         var options = new DbContextOptionsBuilder<DbContext>()
//         .UseInMemoryDatabase(dbName)
//         .Options;
//         return new DbContext(options);
//     }

//     private TicketsController CreateNewController(string dbName)
//     {
//         var context = CreateInMemoryDb(dbName);
//         Seed(context);
//         var controller = new TicketsController(context);
//         return controller;
//     }



//     private void Seed(DbContext context)
//     {

//         var user = new User()
//         {
//             UserId = 21,
//             Email = "mathias.viklund@salt.dev",
//             Name = "Mathias Viklund",
//             Role = "Manager",
//             ImageUrl = "085feaef-28af-4001-82cb-4e50e3c0337c.jpeg",
//             Teams = new List<Team>()
//             {
//                 new Team(){TeamId=1,
//                 Name="Cup of tickets",
//                 Users=null
//             }}
//         };

//         context.Users.Add(user);
//         context.SaveChanges();

//         var tickets = new List<Ticket>(){
//             new Ticket(){
//                 Title = "Test",
//                 CreatedAt = (new DateTime()).ToLongTimeString(),
//                 TimeEstimate = "XS",
//                 Creator = user,
//                 Team = new Team(){
//                     Name = "salt"
//                 }
//             },
//             new Ticket(){
//                 Title = "Test2",
//                 CreatedAt = (new DateTime()).ToLongTimeString(),
//                 TimeEstimate = "S",
//                 Creator = user,
//                 Team = new Team(){
//                     Name = "salt"
//                 }
//             }
//         };
//         context.Tickets.AddRange(tickets);
//         context.SaveChanges();
//     }

//     [Fact]
//      public async void getTcikets_returns_Ok()
//     {
//         // arrange
//         var controller = CreateNewController("GetTickets_should_return_correct_type");
//         // act
//         var response = await controller.GetTickets();
//         // assert
//         Assert.IsAssignableFrom<ActionResult<IList<TicketResponse>>>(response);
//     }
// }
