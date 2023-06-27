namespace QuizProject.Models
{
    public class BaseQuiz
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
    }
}
