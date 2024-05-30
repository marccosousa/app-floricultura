using System.ComponentModel.DataAnnotations;

namespace API_Floricultura.Domain.DTOs
{
    public class LoginDTO
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
    }
}
