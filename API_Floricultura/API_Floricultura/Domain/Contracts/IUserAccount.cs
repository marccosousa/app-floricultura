using API_Floricultura.Domain.DTOs;
using static API_Floricultura.Domain.DTOs.ServiceResponses;

namespace API_Floricultura.Domain.Contracts
{
    public interface IUserAccount
    {
        Task<GeneralResponse> CreateAccount(UserDTO userDTO);
        Task<LoginResponse> LoginAccount(LoginDTO loginDTO);
    }
}
