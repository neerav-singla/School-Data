using System.Diagnostics.CodeAnalysis;

namespace School_Data.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Image {  get; set; }
        public int Age { get; set; }
        
        public string? Sex { get; set; }
    }
}
