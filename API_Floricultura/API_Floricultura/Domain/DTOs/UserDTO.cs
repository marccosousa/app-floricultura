﻿using API_Floricultura.Domain.Models;
using System.ComponentModel.DataAnnotations;

namespace API_Floricultura.Domain.DTOs
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public ICollection<Product>? Products { get; set; }
    }
}
