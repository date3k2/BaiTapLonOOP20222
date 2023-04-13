using System.Text.Json.Serialization;

namespace QuizProject.Models;

public partial class CategoryRelationship
{
    public Guid CategoryParentId { get; set; }

    public Guid CategoryChildId { get; set; }

    [JsonIgnore]
    public virtual Category CategoryParent { get; set; } = null!;
}
