using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly StoreContext _context;
        public UsersController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers(){
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id){
            return await _context.Users.FindAsync(id);
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] User user){

            if(user != null){
                _context.Users.Add(user);
                _context.SaveChanges();
                return Ok("User Added");
            }
            return Ok("Problem adding User");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id,[FromBody] User user){

            var userObj = await _context.Users.FindAsync(id);
            if(userObj != null && user != null){
                userObj.Name = user.Name;
                userObj.City = user.City;
                userObj.PostalCode = user.PostalCode;
                userObj.street = user.street;
                _context.SaveChanges();
                return Ok("User updated");
            }
            return Ok("Problem updating User");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveUser(int id){

            var userObj = await _context.Users.FindAsync(id);
            if(userObj != null){
                _context.Users.Remove(userObj);
                _context.SaveChanges();
                return Ok("User removed");
            }
            return Ok("Problem removing User");
        }
    }
}