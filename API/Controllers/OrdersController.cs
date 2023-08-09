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
    public class OrdersController : ControllerBase
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders(){
            return await _context.Orders.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id){
            return await _context.Orders.FindAsync(id);
        }

        [HttpPost]
        public IActionResult AddOrder([FromBody] Order order){

            if(order != null){
                _context.Orders.Add(order);
                _context.SaveChanges();
                return Ok("Order Added");
            }

            return Ok("Problem adding Order");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id,[FromBody] Order order){

            var orderObj = await _context.Orders.FindAsync(id);

            if(orderObj != null && order != null){
                orderObj.Amount = order.Amount;
                _context.SaveChanges();
                return Ok("Order Updated");
            }

            return Ok("Problem adding Order");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveOrder(int id){

            var orderObj = await _context.Orders.FindAsync(id);

            if(orderObj != null){
                _context.Orders.Remove(orderObj);
                _context.SaveChanges();
                return Ok("Order Removed");
            }

            return Ok("Problem removing Order");
        }
    }
}