using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TicketsServer.Api.Models
{
    public class TicketAssigneeRequest
    {
        public required int AssigneeId {get; set;}
    }
}