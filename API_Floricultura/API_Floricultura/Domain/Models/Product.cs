using System.Text.Json.Serialization;

namespace API_Floricultura.Domain.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public int Quantity { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }
    }
}
