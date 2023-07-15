using Aspose.Pdf;
using GroupDocs.Conversion.Options.Convert;
using QuizProject.Models;

namespace QuizProject.Helpers
{
    public class ExportFile
    {
        private string ToMarkdown(Quiz quiz)
        {
            string res = $"# {quiz.QuizName}\n## Team OOP chạy dl xuyên hè\n{quiz.QuizDescription ?? "No description"}  \n\n";
            int i = 1;
            foreach (Question question in quiz.Questions)
            {
                res += $"### Câu {i}.{ToMarkdown(question)}  \n";
                i++;
            }
            return res;
        }

        private string ToMarkdown(Question question)
        {
            string res = $"{question.QuestionText}  \n";
            Console.WriteLine(res.Contains("$media$"));
            if (question.QuestionMediaPath != null && isPng(question.QuestionMediaPath))
            {
                if (res.Contains("$media$\n")) res = res.Replace("$media$", $"![ảnh]({question.QuestionMediaPath}) \\");
                else if (res.Contains("$media$")) res = res.Replace("$media$", $"![ảnh]({question.QuestionMediaPath})");
                else res += $"![ảnh]({question.QuestionMediaPath})\\\n";
            }
            if (res.Contains("$media$")) res = res.Replace("$media$", $"");
            List<char> answers = new List<char>();
            for (int i = 0; i < question.QuestionChoices.Count; i++)
            {
                QuestionChoice choice = question.QuestionChoices.ElementAt(i);
                res += $"{(char)(i + 'A')}.{choice.ChoiceText}  \n";
                if (choice.ChoiceMediaPath != null && isPng(choice.ChoiceMediaPath))
                {
                    if (res.Contains("$media$\n")) res = res.Replace("$media$", $"\n![ảnh]({choice.ChoiceMediaPath}) \\");
                    else if (res.Contains("$media$")) res = res.Replace("$media$", $"\n![ảnh]({choice.ChoiceMediaPath})");
                    else res += $"![ảnh]({choice.ChoiceMediaPath})\\\n";
                }
                if (res.Contains("$media$")) res = res.Replace("$media$", $"");
                if (choice.ChoiceMark > 0) answers.Add((char)(i + 'A'));
            }
            res += $"ANSWER: {string.Join(", ", answers)}";
            return res;
        }

        private bool isPng(string? base64)
        {
            if (base64 == null) return false;
            string[] infoImage = base64.Split(';')[0].Split('/');
            return infoImage[0] == "data:image" && infoImage[1] != "gif";
        }

        public void WriteMarkdown(Quiz quiz, string path)
        {
            StreamWriter stream = new(path);
            stream.Write(ToMarkdown(quiz));
            stream.Close();
        }

        public void MarkdownToPdf(string input, string output)
        {

            using (var converter = new GroupDocs.Conversion.Converter(input))
            {
                var options = new PdfConvertOptions();
                converter.Convert(output, options);
            }
        }

        public ExportFile() { }

        //Set password: document: Not encrypted pdf -> encrypted pdf
        public void SetPdfPassword(string output, string password)
        {
            Aspose.Pdf.Document document = new(output);
            document.Encrypt(password, password, 0, CryptoAlgorithm.AESx256);
            document.Save(output);
        }
    }
}