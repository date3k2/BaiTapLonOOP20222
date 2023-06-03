using QuizProject.Models;
using System.Text.RegularExpressions;

namespace QuizProject.Helpers
{
    public class AikenHelper
    {
        public int LineIter = 0; //Dòng số mấy
        public short LineInQuestionIter = 0; //Là đáp án thứ bao nhiêu, nếu là 0 thì là câu hỏi
        public bool IsNextQuestion = false;

        //Chuẩn RegEx cho các dòng
        public Regex ChoicePattern = new($@"[A-Z]\. \S.*", RegexOptions.Compiled | RegexOptions.IgnoreCase); //Chuẩn của câu trả lời

        public Regex AnswerPattern = new(@"ANSWER: [A-Z]", RegexOptions.Compiled | RegexOptions.IgnoreCase); //Chuẩn của đáp án

        //Kết quả
        public Dictionary<char, string> Choices = new();
        public List<Question> Questions = new();
        public Question Ques = new Question(); //Câu hỏi đang duyệt
        public List<QuestionChoice> QuestionChoices = new();
    }
}
