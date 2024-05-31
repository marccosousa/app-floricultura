using API_Floricultura.Domain.Models;

namespace API_Floricultura.Repository.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        public Task<IEnumerable<User>> GetUsersWithProducts();
        public Task<User> GetUserWithProducts(int id);

    }
}
