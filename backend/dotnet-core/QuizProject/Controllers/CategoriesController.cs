using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizProject.Helpers;
using QuizProject.Models;

namespace QuizProject.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly QuizProjectContext _context;
        private readonly ICategoryHelper _categoryHelper;
        public CategoriesController(QuizProjectContext context, ICategoryHelper categoryHelper)
        {
            _context = context;
            _categoryHelper = categoryHelper;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<List<object>>> GetCategories()
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var ans = new List<object>();
            var categoryRelationships = await _context.CategoryRelationships.ToListAsync();
            var categories = await _context.Categories.Select(c => new { c.CategoryId, c.CategoryName }).ToListAsync();
            var categoryMap = categories.ToDictionary(c => c.CategoryId, c => c.CategoryName);
            var adj = _categoryHelper.GetAdjencyList(categoryRelationships);
            foreach (var item in categoryRelationships)
            {
                var u = item.CategoryParentId;
                if (u == item.CategoryChildId)
                {
                    var level = new Dictionary<int, int>
                    {
                        [u] = 0
                    };
                    var tree = new List<int> { u };
                    _categoryHelper.DFS(u, adj, level, tree);
                    foreach (var i in tree)
                    {
                        var category = new
                        {
                            id = i,
                            name = categoryMap[i],
                            level = level[i]
                        };
                        ans.Add(category);
                    }

                }
            }
            return ans;
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category, int? parentId)
        {
            _context.Categories.Add(category);
            try
            {
                await _context.SaveChangesAsync();
                parentId ??= category.CategoryId;
                _context.CategoryRelationships.Add(new CategoryRelationship { CategoryChildId = category.CategoryId, CategoryParentId = (int)parentId });
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                return BadRequest(e.Message);
            }

            return CreatedAtAction("GetCategory", new { id = category.CategoryId }, category);
        }
    }
}