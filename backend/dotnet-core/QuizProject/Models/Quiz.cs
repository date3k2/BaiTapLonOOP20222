namespace QuizProject.Models;

/// <summary>
/// Bảng câu hỏi
/// </summary>
public partial class Quiz : BaseQuiz
{
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}
