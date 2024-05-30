using Microsoft.AspNetCore.Identity;

namespace API_Floricultura.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? Name { get; set; }

    }
}
