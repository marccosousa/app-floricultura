using API_Floricultura.Context;
using API_Floricultura.Domain.Models;
using API_Floricultura.Repository.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using static API_Floricultura.Domain.DTOs.ServiceResponses;

namespace API_Floricultura.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base (context)
        {
        }

        public async Task<IEnumerable<User>> GetUsersWithProducts()
        {
            {
                return await _context.Users.Include(u => u.Products).ToListAsync();
            }
        }

        public async Task<User> GetUserWithProducts(int id)
        {
            {
                var user = await _context.Users.Include(u => u.Products).FirstOrDefaultAsync(u => u.UserId == id);
                if (user is null)
                {
                    throw new Exception("Usuario nao encontrado"); 
                }
                return user;

            }
        }
    }
}
