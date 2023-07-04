using QuizProject.Helpers;

namespace Test
{
    public class Choice: QuizProject.Models.QuestionChoice {
        public Choice(string ChoiceText, double ChoiceMark = 0, string? ChoiceMediaPath = null) {
            this.ChoiceId = Guid.NewGuid();
            this.ChoiceText = ChoiceText;
            this.ChoiceMark = ChoiceMark;
            this.ChoiceMediaPath = ChoiceMediaPath;
        }
    }

    public class Question: QuizProject.Models.Question {
        public Question(string QuestionText, List<Choice> Choices, bool MoreThanOneChoice = false, string? QuestionMediaPath = null) {
            this.QuestionId = Guid.NewGuid();
            this.CategoryId = 0;
            this.QuestionText = QuestionText;
            this.MoreThanOneChoice = MoreThanOneChoice;
            this.QuestionMediaPath = QuestionMediaPath;
            foreach (Choice choice in Choices)
            {
                this.QuestionChoices.Add(choice);
            }
        }
    }

    public class Quiz: QuizProject.Models.Quiz {
        public Quiz(string QuizName, string QuizDescription, List<Question> Questions) {
            this.QuizId = Guid.NewGuid();
            this.QuizName = QuizName;
            this.QuizDescription = QuizDescription;
            foreach (var Question in Questions)
            {
                this.Questions.Add(Question);
            }
        }
    }
    public class TestExport {
        public static void Mainly(string[] args) {
            Quiz quiz = new Quiz(
                QuizName: "Hello, World!",
                QuizDescription: "Nothing",
                Questions: new List<Question>() {
                    new Question(
                        QuestionText: "1+1 bằng mấy?",
                        Choices: new List<Choice>() {
                            new Choice("2", 1),
                            new Choice("3", 0),
                            new Choice("4", 0)
                        }
                    ),
                    new Question(
                        QuestionText: "1+2 bằng mấy?",
                        Choices: new List<Choice>() {
                            new Choice("2", 0),
                            new Choice("3", 0.5),
                            new Choice("4", 0.5)
                        }
                    ),
                    new Question(
                        QuestionText: "1+3 bằng mấy?",
                        Choices: new List<Choice>() {
                            new Choice("2", 0),
                            new Choice("3", 0),
                            new Choice("4", 1)
                        }
                    )
                }
            );
            QuizProject.Helpers.ExportFile helper = new ExportFile();
            string input = Path.Combine(Directory.GetCurrentDirectory(), "Testquiz.md");
            string output = Path.Combine(Directory.GetCurrentDirectory(), "Testquiz.pdf");
            helper.WriteMarkdown(quiz, input);
            Console.WriteLine("Done1");
            helper.MarkdownToPdf(input, output);
            Console.WriteLine("Done2");
            helper.SetPdfPassword(output, "12345678");
    }
}
}