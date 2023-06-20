using System.Text.Json.Serialization;

namespace QuizProject.Models;

public partial class CategoryRelationship
{
    public int CategoryParentId { get; set; }

    public int CategoryChildId { get; set; }

    [JsonIgnore]
    public virtual Category CategoryParent { get; set; } = null!;
}
