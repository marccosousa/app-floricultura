using System.ComponentModel.DataAnnotations;

namespace API_Floricultura.Domain.DTOs
{
    public class RegisterDTO
    {
        public int UserId { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string? Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string? ConfirmPassword { get; set; }
    }
}
