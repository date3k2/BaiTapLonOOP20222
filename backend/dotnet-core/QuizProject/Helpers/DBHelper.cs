using Microsoft.EntityFrameworkCore;
using QuizProject.Models;

namespace QuizProject.Helpers
{
    public class DBHelper
    {
        private readonly QuizProjectContext _context;
        private readonly ICategoryHelper _categoryHelper;

        public DBHelper(QuizProjectContext context, ICategoryHelper categoryHelper)
        {
            _context = context;
            _categoryHelper = categoryHelper;
        }

        public async Task<List<object>> GetCategoriesFromDB()
        {
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
                    var level = new Dictionary<int, int> { [u] = 0 };
                    var tree = new List<int> { u };
                    _categoryHelper.DFS(u, adj, level, tree);

                    foreach (var i in tree)
                    {
                        var cat = await _context.Categories.FindAsync(i);
                        var category = new
                        {
                            id = i,
                            name = categoryMap[i],
                            level = level[i],
                            numberOfQuestions = cat!.Questions.Count
                        };
                        ans.Add(category);
                    }
                }
            }
            return ans;
        }
    }
}
