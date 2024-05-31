using API_Floricultura.Context;
using API_Floricultura.Domain.Models;
using API_Floricultura.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API_Floricultura.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context) { }

        public async Task<IEnumerable<Product>> GetProductsByUserAsync(int userId)
        {
            return await _context.Products.Where(p => p.UserId == userId).ToListAsync(); 
        }
    }
}
