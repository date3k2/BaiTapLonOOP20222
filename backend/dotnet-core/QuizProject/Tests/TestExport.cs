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
                        QuestionMediaPath: "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAAAAAAVAxSkAAABrUlEQVQ4y+3TPUvDQBgH8OdDOGa+oUMgk2MpdHIIgpSUiqC0OKirgxYX8QVFRQRpBRF8KShqLbgIYkUEteCgFVuqUEVxEIkvJFhae3m8S2KbSkcFBw9yHP88+eXucgH8kQZ/jSm4VDaIy9RKCpKac9NKgU4uEJNwhHhK3qvPBVO8rxRWmFXPF+NSM1KVMbwriAMwhDgVcrxeMZm85GR0PhvGJAAmyozJsbsxgNEir4iEjIK0SYqGd8sOR3rJAGN2BCEkOxhxMhpd8Mk0CXtZacxi1hr20mI/rzgnxayoidevcGuHXTC/q6QuYSMt1jC+gBIiMg12v2vb5NlklChiWnhmFZpwvxDGzuUzV8kOg+N8UUvNBp64vy9q3UN7gDXhwWLY2nMC3zRDibfsY7wjEkY79CdMZhrxSqqzxf4ZRPXwzWJirMicDa5KwiPeARygHXKNMQHEy3rMopDR20XNZGbJzUtrwDC/KshlLDWyqdmhxZzCsdYmf2fWZPoxCEDyfIvdtNQH0PRkH6Q51g8rFO3Qzxh2LbItcDCOpmuOsV7ntNaERe3v/lP/zO8yn4N+yNPrekmPAAAAAElFTkSuQmCC",
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
                            new Choice("3", 1),
                            new Choice("4", 0)
                        }
                    ),
                    new Question(
                        QuestionText: "1+3 bằng mấy?",
                        Choices: new List<Choice>() {
                            new Choice("2", 0, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAAAAAAVAxSkAAABrUlEQVQ4y+3TPUvDQBgH8OdDOGa+oUMgk2MpdHIIgpSUiqC0OKirgxYX8QVFRQRpBRF8KShqLbgIYkUEteCgFVuqUEVxEIkvJFhae3m8S2KbSkcFBw9yHP88+eXucgH8kQZ/jSm4VDaIy9RKCpKac9NKgU4uEJNwhHhK3qvPBVO8rxRWmFXPF+NSM1KVMbwriAMwhDgVcrxeMZm85GR0PhvGJAAmyozJsbsxgNEir4iEjIK0SYqGd8sOR3rJAGN2BCEkOxhxMhpd8Mk0CXtZacxi1hr20mI/rzgnxayoidevcGuHXTC/q6QuYSMt1jC+gBIiMg12v2vb5NlklChiWnhmFZpwvxDGzuUzV8kOg+N8UUvNBp64vy9q3UN7gDXhwWLY2nMC3zRDibfsY7wjEkY79CdMZhrxSqqzxf4ZRPXwzWJirMicDa5KwiPeARygHXKNMQHEy3rMopDR20XNZGbJzUtrwDC/KshlLDWyqdmhxZzCsdYmf2fWZPoxCEDyfIvdtNQH0PRkH6Q51g8rFO3Qzxh2LbItcDCOpmuOsV7ntNaERe3v/lP/zO8yn4N+yNPrekmPAAAAAElFTkSuQmCC"),
                            new Choice("3", 0),
                            new Choice("4", 1)
                        }
                    )
                }
            );
            QuizProject.Helpers.ExportFile helper = new ExportFile();
            string input = Path.Combine(Directory.GetCurrentDirectory(), "Input.md");
            string output = Path.Combine(Directory.GetCurrentDirectory(), "Output.pdf");
            helper.WriteMarkdown(quiz, input);
            helper.MarkdownToPdf(input, output);
            helper.SetPdfPassword(output, "12345678");
    }
}
}