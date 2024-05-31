namespace API_Floricultura.Repository.Interfaces
{
    public interface IUnityOfWork
    {
        IUserRepository UserRepository { get; }
        IProductRepository ProductRepository { get; }

        Task CommitAsync(); 
    }
}
