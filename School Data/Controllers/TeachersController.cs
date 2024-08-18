
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using School_Data.Models;


namespace School_Data.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {

        private readonly DatabaseContext _context;

        public TeachersController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetTeacher")]
        public ActionResult GetTeacher()
        {
            try
            {
                var result = _context.Teachers.ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("InsertTeacher")]
        public ActionResult InsertTeacher(Teacher teacher)
        {
            try
            {
                var entry = new Teacher();
                entry.Name = teacher.Name;
                entry.Age = teacher.Age;
                entry.Image = teacher.Image ?? "NA";
                entry.Sex = teacher.Sex;
                _context.Teachers.Add(entry);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        } 
    }
}
