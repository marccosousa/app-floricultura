using API_Floricultura.Domain.DTOs;
using API_Floricultura.Domain.Models;
using API_Floricultura.Repository.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Floricultura.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnityOfWork _uof;
        private readonly IMapper _mapper; 

        public UsersController(IUnityOfWork ouf, IMapper mapper)
        {
            _uof = ouf;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> Get()
        {
            var users = await _uof.UserRepository.GetUsersWithProducts();

            if (users is null) 
            {
                return NotFound();
            }
            var usersDto = _mapper.Map<IEnumerable<UserDTO>>(users);
            return Ok(usersDto);
        }

        [HttpGet("{id}", Name = "ObterUsuario")]
        public async Task<ActionResult<UserDTO>> GetUserById(int id)
        {
            var user = await _uof.UserRepository.GetUserWithProducts(id);

            if (user is null)
                return NotFound();

            var userDto = _mapper.Map<UserDTO>(user);
            return Ok(userDto);
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> Post(RegisterDTO userDto)
        {
            if  (userDto is null)
                return BadRequest();

            var user = _mapper.Map<User>(userDto);
            var newUser = _uof.UserRepository.Create(user);
            await _uof.CommitAsync(); 
            var newUserDto = _mapper.Map<RegisterDTO>(newUser);

            return new CreatedAtRouteResult("ObterUsuario", new {id = newUserDto.UserId}, newUserDto);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<UserDTO>> Put(int id, UserDTO userDto)
        {
            if (id != userDto.UserId)
                return BadRequest();

            var user = _mapper.Map<User>(userDto);
            var userAtt = _uof.UserRepository.Update(user); 
            await _uof.CommitAsync();

            var userAttDto = _mapper.Map<UserDTO>(userAtt);
            return Ok(userAttDto);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<UserDTO>> Delete(int id)
        {
            var user = await _uof.UserRepository.GetAsync(u  => u.UserId == id);
            
            if (user is null)
                return NotFound("Usuario não encontrado");

            var userDelete = _uof.UserRepository.Delete(user);
            await _uof.CommitAsync();

            var userDeleteDto = _mapper.Map<UserDTO>(userDelete);
            return Ok(userDeleteDto);

        }

    }
}
