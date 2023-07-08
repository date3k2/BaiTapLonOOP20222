using QuizProject.Models;
using Aspose.Pdf;
using GroupDocs.Conversion.Options.Convert;
using Aspose.Pdf.Plugins;

namespace QuizProject.Helpers
{
    public class ExportFile
    {
        //private readonly string PACKAGE = "\\documentclass{article}\r\n\r\n" +
        //    "\\usepackage[utf8]{inputenc}\r\n\\usepackage{enumerate}\r\n" +
        //    "\\usepackage[shortlabels]{enumitem}\r\n\r\n" +
        //    "\\usepackage[letterpaper,top=2cm,bottom=2cm,left=3cm,right=3cm,marginparwidth=1.75cm]{geometry}\r\n\r\n" +
        //    "\\usepackage{amsmath}\r\n\\usepackage{graphicx}\r\n\\usepackage[colorlinks=true, allcolors=blue]{hyperref}";

        //public string ToLatex(Quiz quiz)
        //{
        //    string title = $"\\title{{{quiz.QuizName}}}\r\n\\author{{Team OOP chạy dl xuyên hè}}\n";
        //    const string BEGINDOC = "\\begin{document}\r\n\\maketitle\r\n\\begin{enumerate}\n";
        //    const string ENDDOC = "\\end{enumerate}\r\n\\end{document}";

        //    string result = PACKAGE + title + BEGINDOC;
        //    foreach (Question question in quiz.Questions.ToList<Question>())
        //    {
        //        result += "\\item " + ToLatex(question) + "\n";
        //    }
        //    result += ENDDOC;
        //    return result;
        //}

        //public string ToLatex(Question question)
        //{
        //    string result = question.QuestionText + "\n";
        //    string includeGraphic = $"\\includegraphics[width = 0.3\\textwidth]{{{question.QuestionMediaPath}}}\n";
        //    if (question.QuestionMediaPath != null) { result += includeGraphic; }
        //    result += "\\begin{enumerate}[{\\Alph*.}]\n";
        //    List<KeyValuePair<double?, char>> answer = new();
        //    for (int i = 0; i < question.QuestionChoices.Count; i++)
        //    {
        //        QuestionChoice choice = question.QuestionChoices.ElementAt(i);
        //        result += "\\item " + ToLatex(choice) + "\n";
        //        if (choice.ChoiceMark > 0 && choice.ChoiceMark != null) answer.Add(new KeyValuePair<double?, char>(choice.ChoiceMark, (char)('A' + i)));
        //    }
        //    string ans = "";
        //    foreach (var a in answer) {
        //        if (a.Key < 1) ans += String.Format("{0}% {1} ", Math.Round((decimal)(a.Key * 100)), a.Value);
        //        else ans += a.Value;
        //    }
        //    result += $"\\end{{enumerate}}\nANSWER: {ans}";
        //    return result;
        //}

        //public string ToLatex(QuestionChoice choice)
        //{
        //    if (choice.ChoiceMediaPath != null) return $"{choice.ChoiceText}\n\\includegraphics[width = 0.3\\textwidth]{{{choice.ChoiceMediaPath}}}";
        //    else return choice.ChoiceText ?? "<blank>";
        //}

        //public void WriteLatex(Quiz quiz, string path)
        //{
        //    StreamWriter stream = new StreamWriter(path);
        //    stream.Write(ToLatex(quiz));
        //    stream.Close();
        //}

        //public void LatexToPdf(string input, string outputLocation)
        //{
        //    string packageLocation = Path.Combine(Directory.GetCurrentDirectory(), "LatexPackage");

        //    TeXOptions options = TeXOptions.ConsoleAppOptions(TeXConfig.ObjectLaTeX);
        //    options.RequiredInputDirectory = new InputFileSystemDirectory(packageLocation);
        //    options.Interaction = Interaction.NonstopMode;


        //    options.OutputWorkingDirectory = new OutputFileSystemDirectory(outputLocation);
        //    options.SaveOptions = new PdfSaveOptions();
        //    TeXJob job = new TeXJob(input, new PdfDevice(), options);
        //    job.Run();
        //}

        private string ToMarkdown(Quiz quiz)
        {
            string res = $"# {quiz.QuizName}\n##### Team OOP chạy dl xuyên hè\n{quiz.QuizDescription ?? "No description"}  \n";
            foreach (Question question in quiz.Questions)
            {
                res += $"{ToMarkdown(question)}  \n";
            }
            return res;
        }

        private string ToMarkdown(Question question)
        {
            string res = $"{question.QuestionText}  \n";
            if (question.QuestionMediaPath != null) res += $"![ảnh](data:image/png;base64,{question.QuestionMediaPath})";
            List<char> answers = new List<char>();
            for (int i = 0; i < question.QuestionChoices.Count; i++)
            {
                QuestionChoice choice = question.QuestionChoices.ElementAt(i);
                res += $"{(char)(i + 'A')}.{choice.ChoiceText}  \n";
                if (choice.ChoiceMediaPath != null) res += $"![lựa chọn](data:image/png;base64,{choice.ChoiceMediaPath})\n";
                if (choice.ChoiceMark > 0) answers.Add((char)(i + 'A'));
            }
            res += $"ANSWER: {string.Join(", ", answers)}";
            return res;
        }

        public void WriteMarkdown(Quiz quiz, string path)
        {
            StreamWriter stream = new StreamWriter(path);
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
            Aspose.Pdf.Document document = new Aspose.Pdf.Document(output);
            document.Encrypt(password, password, 0, CryptoAlgorithm.AESx256);
            document.Save(output);
        }
    }
}