using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API_Floricultura.Domain.DTOs
{
    public class ProductDTO
    {
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public int Quantity { get; set; }
    }
}
