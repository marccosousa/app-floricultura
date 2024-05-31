using API_Floricultura.Context;
using API_Floricultura.Domain.Models;
using API_Floricultura.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API_Floricultura.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base (context)
        {
        } 
    }
}
