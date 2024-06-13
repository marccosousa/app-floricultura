using System.Text.Json.Serialization;

namespace API_Floricultura.Domain.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public int Quantity { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; }

        public int AddQuantity(int quantity)
        {
            return Quantity += quantity; 
        }

        public int RemoveQuantity(int quantity)
        {
            Quantity -= quantity;
            if (Quantity < 0)
                Quantity = 0;
            return Quantity;

        }
    }

    
}
