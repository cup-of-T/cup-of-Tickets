using Microsoft.EntityFrameworkCore;
using TicketsServer.Api.Models;

    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbContext (DbContextOptions<DbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Ticket> Tickets { get; set; } = default!;
        public DbSet<Category> Categories { get; set; } = default!;
    }
