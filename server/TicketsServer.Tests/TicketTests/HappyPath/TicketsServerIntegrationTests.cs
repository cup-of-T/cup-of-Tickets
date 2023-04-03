// using System.Net;
// using Xunit;
// using FluentAssertions;

// namespace TicketsServer.Tests;


// [Collection(nameof(HttpClientCollection))]
// public class TicketsServerIntegrationTests
// {
//     readonly HttpClient _client;

//     const string BASE_URL = "/api/Tickets";

//     public TicketsServerIntegrationTests(HttpClientFixture fixture)
//     {
//         _client = fixture.Client;
//     }

//     [Fact]
//     public async Task getMany_returns_Ok()
//     {
//       // act
//       var response = await _client.GetAsync(BASE_URL);

//       // assert
//       response.IsSuccessStatusCode.Should().BeTrue();
//       response.StatusCode.Should().Be(HttpStatusCode.OK);
//     }
// }
