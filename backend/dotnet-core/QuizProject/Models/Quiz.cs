namespace QuizProject.Models;

/// <summary>
/// Bảng câu hỏi
/// </summary>
public partial class Quiz
{
    public Guid QuizId { get; set; }

    public string QuizName { get; set; } = null!;

    public string? QuizDescription { get; set; }

    public DateTime? OpenTime { get; set; }

    public DateTime? CloseTime { get; set; }

    public int? TimeLimitInSeconds { get; set; }

    public bool ShowDescription { get; set; } = false;

    public bool IsShuffle { get; set; } = false;


    public double MaxGrade { get; set; } = 10;

    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
