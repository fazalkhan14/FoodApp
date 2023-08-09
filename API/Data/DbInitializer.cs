using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initializer(StoreContext context){
            if(context.Meals.Any()) return;

            var meals = new List<Meal>{
                new Meal{
                    Name = "Sushi",
                    Description = "Finest fish and veggies",
                    Price = 22.99,
                },
                new Meal{

                    Name= "Schnitzel",
                    Description= "A german specialty!",
                    Price= 16.5,
                },
                new Meal{

                    Name= "Barbecue Burger",
                    Description= "American, raw, meaty",
                    Price= 12.99,
                },
                new Meal{
                    Name= "Green Bowl",
                    Description= "Healthy...and green...",
                    Price= 18.99,
                }
            };

            foreach (var meal in meals)
            {
                context.Meals.Add(meal);
            }

            context.SaveChanges();
        }
    }
}