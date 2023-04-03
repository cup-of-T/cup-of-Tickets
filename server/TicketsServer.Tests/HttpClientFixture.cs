using System;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using TicketsServer.Api;
using Xunit;

namespace TicketsServer.Tests;

public class HttpClientFixture : IDisposable
{
    public HttpClientFixture() => this.Client = new WebApplicationFactory<Program>().CreateClient();

    public void Dispose() => this.Client.Dispose();
    public HttpClient Client { get; private set; }
}

[CollectionDefinition(nameof(HttpClientCollection))]
public class HttpClientCollection : ICollectionFixture<HttpClientFixture>
{

}
