using API_Floricultura.Context;
using API_Floricultura.Repository.Interfaces;

namespace API_Floricultura.Repository
{
    public class UnityOfWork : IUnityOfWork
    {
        public IUserRepository? _userRepo;
        public IProductRepository? _productRepo;
        public AppDbContext _context;
        public UnityOfWork(AppDbContext context)
        {
            _context = context; 
        }

        public IUserRepository UserRepository
        {
            get
            {
                return _userRepo = _userRepo ?? new UserRepository(_context);
            }
        }

        public IProductRepository ProductRepository
        {
            get
            {
                return _productRepo = _productRepo ?? new ProductRepository(_context);
            }
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
