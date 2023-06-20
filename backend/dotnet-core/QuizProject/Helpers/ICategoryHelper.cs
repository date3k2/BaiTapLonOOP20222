using QuizProject.Models;

namespace QuizProject.Helpers
{
    public interface ICategoryHelper
    {
        public Dictionary<int, List<int>> GetAdjencyList(List<CategoryRelationship> categoryRelationships);
        public void DFS(int u, Dictionary<int, List<int>> adj, Dictionary<int, int> level, List<int> tree);
    }
}
