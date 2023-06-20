using System.Text.Json.Serialization;

namespace QuizProject.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string? CategoryInfo { get; set; }

    [JsonIgnore]
    public virtual ICollection<CategoryRelationship> CategoryRelationships { get; set; } = new List<CategoryRelationship>();

    [JsonIgnore]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
