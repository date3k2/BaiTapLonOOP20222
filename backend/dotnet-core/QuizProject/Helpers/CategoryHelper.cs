using QuizProject.Helpers;
using QuizProject.Models;

namespace QuizProject.Methods
{
    public class CategoryHelper : ICategoryHelper
    {
        public Dictionary<int, List<int>> GetAdjencyList(List<CategoryRelationship> categoryRelationships)
        {
            var adjencyCategory = new Dictionary<int, List<int>>();
            foreach (var item in categoryRelationships)
            {
                if (adjencyCategory.ContainsKey(item.CategoryParentId))
                    adjencyCategory[item.CategoryParentId].Add(item.CategoryChildId);
                else
                    adjencyCategory[item.CategoryParentId] = new List<int> { item.CategoryChildId };
            }
            return adjencyCategory;
        }

        public void DFS(int u, Dictionary<int, List<int>> adj, Dictionary<int, int> level, List<int> tree)
        {
            foreach (var v in adj[u])
            {
                if (!level.ContainsKey(v))
                {
                    level[v] = level[u] + 1;
                    tree.Add(v);
                    if (adj.ContainsKey(v))
                        DFS(v, adj, level, tree);
                }
            }
        }
    }
}
