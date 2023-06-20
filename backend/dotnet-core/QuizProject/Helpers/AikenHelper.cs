using QuizProject.Models;
using System.Text.RegularExpressions;

namespace QuizProject.Helpers
{
    public class AikenHelper
    {
        //Đếm dòng
        public int LineIter = 0;

        //Là đáp án thứ bao nhiêu, nếu là 0 thì là câu hỏi
        public short LineInQuestionIter = 0;

        public bool IsNextQuestion = false;

        // Regex cho lựa chọn
        public Regex ChoicePattern = new($@"[A-Z]\. \S.*", RegexOptions.Compiled | RegexOptions.IgnoreCase);

        // Regex cho đáp án
        public Regex AnswerPattern = new(@"ANSWER: [A-Z]", RegexOptions.Compiled | RegexOptions.IgnoreCase);

        //Kết quả
        public Dictionary<char, string> Choices = new();
        public List<Question> Questions = new();
        public Question Ques = new Question(); //Câu hỏi đang duyệt
        public List<QuestionChoice> QuestionChoices = new();
    }
}
