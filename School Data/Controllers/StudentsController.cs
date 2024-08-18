using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using School_Data.Models;

namespace School_Data.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {

        private readonly DatabaseContext _context;

        public StudentsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("GetStudent")]
        public ActionResult GetStudent(StudentFilter filter)
        {
            try
            {
                var result = _context.Students.ToList();
                if (filter.Name == "" && filter.Class == "")
                {
                    return Ok(result);
                }
                else
                {
                    var r = new List<Student>();
                    var filterName = filter.Name!;
                    if (filterName != "" || filterName != null)
                    {
                        r = result.Where(x => x.Name!.Contains(filterName)).ToList();
                    }
                    if (filter.Class != "" || filter.Class != null)
                    {
                        r = r.Where(x => x.Class == filter.Class).ToList();
                    }
                    return Ok(r);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("InsertStudent")]
        public ActionResult InsertStudent(Student student)
        {
            try
            {
                var entry = new Student();
                entry.Name = student.Name;
                entry.Age = student.Age;
                entry.Image = student.Image ?? "NA";
                entry.Sex = student.Sex;
                entry.Class = student.Class;
                _context.Students.Add(entry);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        
        }
    }
}
