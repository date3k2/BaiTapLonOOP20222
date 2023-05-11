using System.Text.Json.Serialization;

namespace QuizProject.Models;

public partial class Question
{
    public Guid QuestionId { get; set; }

    public int CategoryId { get; set; }

    public string QuestionCode { get; set; } = null!;

    public string QuestionName { get; set; } = null!;

    public string? QuestionMediaPath { get; set; }

    [JsonIgnore]
    public virtual Category Category { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<QuestionChoice> QuestionChoices { get; set; } = new List<QuestionChoice>();
}
