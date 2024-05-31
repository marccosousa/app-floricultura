using API_Floricultura.Domain.Models;
using AutoMapper;

namespace API_Floricultura.Domain.DTOs.Mappings
{
    public class ProfileMap : Profile
    {
       public ProfileMap() 
       {
            CreateMap<User,RegisterDTO>().ReverseMap();
            CreateMap<User, LoginDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}
