namespace QuizProject.Models
{
    public class QuizUpdate : BaseQuiz
    {
        public List<Guid> ListQuestionId { get; set; } = new List<Guid>();
    }
}
