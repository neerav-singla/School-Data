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
    public class SubjectsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public SubjectsController(DatabaseContext context) 
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetSubjects")]
        public ActionResult GetSubjects()
        {
            try
            {
                var result = _context.Subjects.ToList();
                return Ok(result);
            }
            catch(Exception e) { 
                
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("InsertSubject")]
        public ActionResult InsertSubject(Subjects subject)
        {
            try
            {
                var entry = new Subjects();
                entry.Subject_Name = subject.Subject_Name;
                entry.Class = subject.Class;
                entry.Language = subject.Language;
                _context.Subjects.Add(entry);
                _context.SaveChanges();
                return Ok("Success");
            }
            catch (Exception e) { 
             return BadRequest(e.Message);
            }
        }
    }
}
