﻿using API_Floricultura.Domain.Models;

namespace API_Floricultura.Repository.Interfaces
{
    public interface IProductRepository : IRepository<Product>
    {
        Task<IEnumerable<Product>> GetProductsByUserAsync(int userId);
    }
}