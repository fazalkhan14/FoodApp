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
    public class MealsController : ControllerBase
    {
        private readonly StoreContext _context;
        public MealsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Meal>>> GetMeals(){
            return await _context.Meals.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Meal>> GetMeal(int id){
            return await _context.Meals.FindAsync(id);
        }

        [HttpPost]
        public IActionResult AddMeal([FromBody] Meal meal){

            if(meal != null){
                _context.Meals.Add(meal);
                _context.SaveChanges();
                return Ok("Meal Added");
            }

            return Ok("Problem adding Meal");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMeal(int id,[FromBody] Meal meal){

            var mealObj = await _context.Meals.FindAsync(id);

            if(mealObj != null && meal != null){
                mealObj.Name = meal.Name;
                mealObj.Description = meal.Description;
                mealObj.Price = meal.Price;
                _context.SaveChanges();
                return Ok("Meal Updated");
            }

            return Ok("Problem adding Meal");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveMeal(int id){

            var mealObj = await _context.Meals.FindAsync(id);

            if(mealObj != null){
                _context.Meals.Remove(mealObj);
                _context.SaveChanges();
                return Ok("Meal Removed");
            }

            return Ok("Problem removing Meal");
        }
    }
}