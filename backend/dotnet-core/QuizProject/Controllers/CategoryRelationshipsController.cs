//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using QuizProject.Models;

//namespace QuizProject.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CategoryRelationshipsController : ControllerBase
//    {
//        private readonly QuizProjectContext _context;

//        public CategoryRelationshipsController(QuizProjectContext context)
//        {
//            _context = context;
//        }

//        // GET: api/CategoryRelationships
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<CategoryRelationship>>> GetCategoryRelationships()
//        {
//            if (_context.CategoryRelationships == null)
//            {
//                return NotFound();
//            }
//            return await _context.CategoryRelationships.ToListAsync();
//        }

//        [HttpGet("GetParent")]
//        public async Task<Category> GetCategory(int id)
//        {
//            CategoryRelationship x = _context.CategoryRelationships.Where(p => p.CategoryParentId == 16 &&
//            p.CategoryChildId == 16).Single();
//            return x!.CategoryParent;
//        }

//    }
//}
