using System.Text.Json.Serialization;

namespace QuizProject.Models;

public partial class QuestionChoice
{
    public Guid ChoiceId { get; set; }

    public Guid? QuestionId { get; set; }

    public double? ChoiceMark { get; set; }

    public string? ChoiceText { get; set; }

    public string? ChoiceMediaPath { get; set; }

    [JsonIgnore]
    public virtual Question? Question { get; set; }
}
