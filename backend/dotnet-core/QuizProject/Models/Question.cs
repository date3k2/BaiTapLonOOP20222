using System.Text.Json.Serialization;

namespace QuizProject.Models;

public partial class Question
{
    public Guid QuestionId { get; set; }

    public int CategoryId { get; set; }

    public string? QuestionCode { get; set; }

    public string QuestionText { get; set; } = null!;

    public bool MoreThanOneChoice { get; set; } = false;

    public string? QuestionMediaPath { get; set; }

    public virtual ICollection<QuestionChoice> QuestionChoices { get; set; } = new List<QuestionChoice>();

    [JsonIgnore]
    public virtual Category? Category { get; set; }

    [JsonIgnore]
    public virtual ICollection<Quiz> Quizzes { get; set; } = new List<Quiz>();
}
