﻿using API_Floricultura.Domain.DTOs;
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

        [HttpGet("user-products/{id:int}")]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> Get(int id)
        {
            var user = await _uof.UserRepository.GetUserWithProducts(id);
            var products = user.Products;
            if (user is null)
                return NotFound();

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

        [HttpPost("user-products/{id:int}")]
        public async Task<ActionResult<ProductDTO>> PostProductsInUser(ProductDTO productDto, int id)
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

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Product>> Delete(int id)
        {
            var product = await _uof.ProductRepository.GetAsync(p => p.ProductId == id);         
            if (product is null)
                return NotFound();
            _uof.ProductRepository.Delete(product);
            await _uof.CommitAsync();
            return Ok(product);
        }

        [HttpPost("add-quantity/{id:int}")]
        public async Task<ActionResult<ProductDTO>> AddQuantity(int id, int quantity)
        {
            var product = await _uof.ProductRepository.GetAsync(p => p.ProductId == id);
            if (product is null)
                return NotFound("Produto não encontrado");

            product.AddQuantity(quantity);

            var productDto = _mapper.Map<ProductDTO>(product);
            await _uof.CommitAsync();
            return Ok(productDto);
        }

        [HttpDelete("remove-quantity/{id:int}")]
        public async Task<ActionResult<ProductDTO>> RemoveQuantity(int id, int quantity)
        {
            var product = await _uof.ProductRepository.GetAsync(p => p.ProductId == id);
            if (product is null)
                return NotFound("Produto não encontrado");

            product.RemoveQuantity(quantity);
            await _uof.CommitAsync();

            var productDto = _mapper.Map<ProductDTO>(product);
            return Ok(productDto);
        }
    }
}
