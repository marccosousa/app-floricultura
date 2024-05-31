using API_Floricultura.Domain.DTOs;
using API_Floricultura.Domain.Models;
using API_Floricultura.Repository.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static API_Floricultura.Domain.DTOs.ServiceResponses;

namespace API_Floricultura.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IUnityOfWork _uof;
        private readonly IMapper _mapper;

        public ProductsController(IUnityOfWork ouf, IMapper mapper)
        {
            _uof = ouf;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> Get()
        {
            var products = await _uof.ProductRepository.GetAllAsync();

            if (products is null)
            {
                return NotFound();
            }
            var usersDto = _mapper.Map<IEnumerable<ProductDTO>>(products);
            return Ok(products);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDTO>> Post(ProductDTO productDto, int id)
        {
            if (productDto is null)
                return BadRequest();

            var user = await _uof.UserRepository.GetAsync(u => u.UserId == id); 
            if (user is null)
                return NotFound("Usuário não encontrado");

            var product = _mapper.Map<Product>(productDto);
            var newProduct = new Product
            {
                Name = productDto.Name,
                Quantity = productDto.Quantity,
                UserId = user.UserId,
                User = user,
            }; 

            user.Products?.Add(newProduct);
            await _uof.CommitAsync();

            return Ok(newProduct);
        }
    }
}
