using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketsServer.Api.Models
{
    public class TicketStatusRequest
    {
        public required int Status {get; set;}
    }
}
