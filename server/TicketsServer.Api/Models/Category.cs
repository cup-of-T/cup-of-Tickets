using System.ComponentModel.DataAnnotations;

namespace TicketsServer.Api.Models;

public class Category
{
    [Key]
    public int CategoryId{get;set;}
}