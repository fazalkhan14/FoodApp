using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Order
    {
        public int OrderID { get; set; }
        public int Amount { get; set; }
        public int MealID { get; set; }
        public Meal Meal { get; set; }
        public int UserID { get; set; }
        public User User { get; set; }
    }
}