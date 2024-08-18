using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace School_Data.Models
{
    public class Student
    {

        [Key]
        public int Roll_Number { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
        public string? Class { get; set; }
        public string? Image { get; set; }
        public string? Sex { get; set; }
       
    }
}
