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
            CreateMap<User, UserDTO>().ReverseMap().
                ForMember(dest => dest.Products, opt => opt.MapFrom(src => src.Products));
            CreateMap<Product, ProductDTO>().ReverseMap();
        }
    }
}
