using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TicketsServer.Api.Models;

    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbContext (DbContextOptions<DbContext> options)
            : base(options)
        {
        }

        public DbSet<TicketsServer.Api.Models.User> User { get; set; } = default!;

        public DbSet<TicketsServer.Api.Models.Ticket> Ticket { get; set; } = default!;
    }
