using Aspose.TeX.IO;
using Aspose.TeX.Presentation.Image;
using Aspose.TeX.Presentation.Pdf;
using Aspose.TeX;
using QuizProject.Models;
using Aspose.Pdf;
using System.Text;
using PdfSaveOptions = Aspose.TeX.Presentation.Pdf.PdfSaveOptions;

namespace QuizProject.Helpers
{
    public class ExportFile
    {
        private readonly string PACKAGE = "\\documentclass{article}\r\n\r\n" +
            "\\usepackage[utf8]{inputenc}\r\n\\usepackage{enumerate}\r\n" +
            "\\usepackage[shortlabels]{enumitem}\r\n\r\n" +
            "\\usepackage[letterpaper,top=2cm,bottom=2cm,left=3cm,right=3cm,marginparwidth=1.75cm]{geometry}\r\n\r\n" +
            "\\usepackage{amsmath}\r\n\\usepackage{graphicx}\r\n\\usepackage[colorlinks=true, allcolors=blue]{hyperref}";

        public string ToLatex(Quiz quiz)
        {
            string title = $"\\title{{{quiz.QuizName}}}\r\n\\author{{Team OOP chạy dl xuyên hè}}\n";
            const string BEGINDOC = "\\begin{document}\r\n\\maketitle\r\n\\begin{enumerate}\n";
            const string ENDDOC = "\\end{enumerate}\r\n\\end{document}";

            string result = PACKAGE + title + BEGINDOC;
            foreach (Question question in quiz.Questions.ToList<Question>())
            {
                result += "\\item " + ToLatex(question) + "\n";
            }
            result += ENDDOC;
            return result;
        }

        public string ToLatex(Question question)
        {
            string result = question.QuestionText + "\n";
            string includeGraphic = $"\\includegraphics[width = 0.3\\textwidth]{{{question.QuestionMediaPath}}}\n";
            if (question.QuestionMediaPath != null) { result += includeGraphic; }
            result += "\\begin{enumerate}[{\\Alph*.}]\n";
            List<KeyValuePair<double?, char>> answer = new();
            for (int i = 0; i < question.QuestionChoices.Count; i++)
            {
                QuestionChoice choice = question.QuestionChoices.ElementAt(i);
                result += "\\item " + ToLatex(choice) + "\n";
                if (choice.ChoiceMark > 0 && choice.ChoiceMark != null) answer.Add(new KeyValuePair<double?, char>(choice.ChoiceMark, (char)('A' + i)));
            }
            string ans = "";
            foreach (var a in answer) {
                if (a.Key < 1) ans += String.Format("{0}% {1} ", Math.Round((decimal)(a.Key * 100)), a.Value);
                else ans += a.Value;
            }
            result += $"\\end{{enumerate}}\nANSWER: {ans}";
            return result;
        }

        public ExportFile() {}

        public string ToLatex(QuestionChoice choice)
        {
            if (choice.ChoiceMediaPath != null) return $"{choice.ChoiceText}\n\\includegraphics[width = 0.3\\textwidth]{{{choice.ChoiceMediaPath}}}";
            else return choice.ChoiceText ?? "<blank>";
        }

        public void WriteLatex(Quiz quiz, string path)
        {
            StreamWriter stream = new StreamWriter(path);
            stream.Write(ToLatex(quiz));
            stream.Close();
        }

        public void LatexToPdf(string input, string outputLocation)
        {
            string packageLocation = Path.Combine(Directory.GetCurrentDirectory(), "LatexPackage");

            TeXOptions options = TeXOptions.ConsoleAppOptions(TeXConfig.ObjectLaTeX);
            options.RequiredInputDirectory = new InputFileSystemDirectory(packageLocation);
            options.Interaction = Interaction.NonstopMode;
            
            
            options.OutputWorkingDirectory = new OutputFileSystemDirectory(outputLocation);
            options.SaveOptions = new PdfSaveOptions();
            TeXJob job = new TeXJob(input, new PdfDevice(), options);
            job.Run();
        }

        public void SetPdfPassword(string output, string password)
        {
            Document document = new Document(output);
            document.Encrypt(password, password, 0, CryptoAlgorithm.AESx256);
            document.Save(output);
        }
    }
}
