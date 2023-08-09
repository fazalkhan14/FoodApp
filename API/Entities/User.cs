using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class User
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string street { get; set; }
        public int PostalCode { get; set; }
        public ICollection<Order> Order { get; set; }
        
    }
}