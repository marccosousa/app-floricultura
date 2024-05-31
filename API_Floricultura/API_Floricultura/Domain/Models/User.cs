using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace API_Floricultura.Domain.Models
{
    public class User
    {
        public User()
        {
            Products = [];
        }
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public ICollection<Product>? Products { get; set; }

    }
}
