using DocumentFormat.OpenXml.Office2016.Drawing.Command;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using QuizProject.Models;
using System.Drawing;
using System.Text;

namespace QuizProject.Helpers
{
    public class ImportFile
    {
        public class ParagraphInfo {
            public string? text;
            public byte[]? image;

            public ParagraphInfo(string text, byte[] image) { this.text = text; this.image = image; }
            public ParagraphInfo(string text, Image? image) { 
                this.text = text;
                if (image ==  null) { this.image = null; }
                else using (var stream  = new MemoryStream())
                {
                    image.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                    this.image = stream.ToArray();
                } 
            }
        }
        public (List<Question>, List<QuestionChoice>) ImportFromTXT(Stream file)
        {
            try
            {
                //Bộ đọc dữ liệu
                StreamReader reader = new(file);

                var kit = new AikenHelper();
                while (!reader.EndOfStream)
                {
                    string line = reader.ReadLine()!;
                    HandleLine(kit, line);
                }
                // Xử lý câu hỏi thừa nhưng không đủ lựa chọn ở cuối
                if (kit.Ques.QuestionId != Guid.Empty || kit.Ques.QuestionChoices.Count > 0)
                    throw new Exception($"Error in line: {kit.LineIter}");
                return (kit.Questions, kit.QuestionChoices);

            }

            catch (Exception)
            {
                throw;
            }
            finally
            {
                file.Dispose();
            }
        }
        public (List<Question>, List<QuestionChoice>) ImportDocxl(Stream file)
        {

            using WordprocessingDocument doc = WordprocessingDocument.Open(file, false);
            Body body = doc.MainDocumentPart?.Document.Body!;
            var kit = new AikenHelper();
            // Đọc và in ra nội dung văn bản
            try
            {
                foreach (Paragraph paragraph in body.Elements<Paragraph>())
                {
                    ParagraphInfo info = GetInfo(paragraph, doc);
                    string? paragraphText = info.text;
                    if (paragraphText != "" || (kit.IsNextQuestion && info.image == null)) HandleLine(kit, paragraphText!);          
                    if (info.image != null) HandleImage(kit, info.image);
                }
                // Xử lý câu hỏi thừa nhưng không đủ lựa chọn ở cuối
                if (kit.Ques.QuestionId != Guid.Empty || kit.Ques.QuestionChoices.Count > 0)
                    throw new Exception($"Error in line: {kit.LineIter}");
                return (kit.Questions, kit.QuestionChoices);

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                file.Dispose();
                doc.Dispose();
            }
        }

        static ParagraphInfo GetInfo(Paragraph paragraph, WordprocessingDocument doc)
        {
            StringBuilder sb = new();
            Drawing? image = null;
            ImagePart? img = null;

            foreach (Run run in paragraph.Elements<Run>())
            {
                image = run.Descendants<Drawing>().FirstOrDefault();
                if (image != null)
                {
                    DocumentFormat.OpenXml.Drawing.Graphic? graphic = image.Inline!.Graphic;
                    var imageFirst = graphic!.GraphicData!.Descendants<DocumentFormat.OpenXml.Drawing.Pictures.Picture>().FirstOrDefault();
                    var blip = imageFirst!.BlipFill!.Blip!.Embed!.Value;
                    img = (ImagePart)doc.MainDocumentPart!.GetPartById(blip!);
                    
                }
                string runText = run.InnerText;
                sb.Append(runText);
            }

            Image? bitmap = null;
            if (img != null) bitmap = Image.FromStream(img.GetStream());
            return new ParagraphInfo(sb.ToString(), bitmap);
        }

        //static byte[] GetImage(Paragraph paragraph)
        //{
            
        //}

        public static void HandleLine(AikenHelper kit, string line)
        {
            ++kit.LineIter;
            // Đọc tên câu hỏi
            if (kit.LineInQuestionIter == 0)
            {
                // Lỗi không có tên câu hỏi
                if (line.Trim() == "") throw new Exception($"Không có tên câu hỏi\nError in line: {kit.LineIter}");
                kit.Ques.QuestionId = Guid.NewGuid();
                kit.Ques.QuestionText = line;
                ++kit.LineInQuestionIter;
            }
            else
            //Đã có câu hỏi và đúng định dạng câu trả lời
            if (kit.ChoicePattern.IsMatch(line))
            {
                if (kit.Choices.ContainsKey(line[0])) throw new Exception($"Trùng tên đáp án.\nError in line: {kit.LineIter}");
                ++kit.LineInQuestionIter;
                var choice = new QuestionChoice
                {
                    ChoiceId = Guid.NewGuid(),
                    QuestionId = kit.Ques.QuestionId,
                    ChoiceText = line[3..].TrimEnd(),
                };
                kit.Ques.QuestionChoices.Add(choice);
                kit.Choices[line[0]] = choice.ChoiceText;
            }
            else
            // Answer
            if (kit.AnswerPattern.IsMatch(line))
            {
                if (kit.LineInQuestionIter < 3) throw new Exception($"Không có nhiều hơn hai đáp án để chọn\nError in line: {kit.LineIter}");
                var rightChoice = kit.Choices.TryGetValue(line[8], out var answer);
                if (!rightChoice) throw new Exception($"Error in line: {kit.LineIter}");
                var x = kit.Ques.QuestionChoices.Single(choice => choice.ChoiceText == answer).ChoiceMark = 1;
                kit.Questions.Add(kit.Ques);
                kit.IsNextQuestion = true;
                kit.QuestionChoices.AddRange(kit.Ques.QuestionChoices);
                kit.Ques = new Question();
            }
            else
            // Là dòng xuống dòng khi đã có thể sang câu tiếp
            if (line.Trim() == "")
            {
                if (!kit.IsNextQuestion) throw new Exception($"Error in line: {kit.LineIter}");
                kit.IsNextQuestion = false;
                kit.LineInQuestionIter = 0;
                kit.Choices = new Dictionary<char, string>();
            }
            else throw new Exception($"Error in line: {kit.LineIter}");

        }

        public static void HandleImage(AikenHelper kit, byte[] image)
        {
             if (kit.Ques.QuestionText == "") throw new Exception($"Error in line: {kit.LineIter}"); //Chưa có câu hỏi mà đã có ảnh -> lỗi
             else if (kit.Ques.QuestionChoices.Count == 0)
             {
                if (kit.Ques.QuestionMediaPath == null) kit.Ques.QuestionMediaPath = image.ToString();
                else throw new Exception($"Error in line: {kit.LineIter}"); //Có 2 ảnh = Chưa có choice mà đã có ảnh mà question có ảnh rồi -> lỗi
             }
             else
             {
                if (kit.Ques.QuestionChoices.Last().ChoiceMediaPath == null) kit.Ques.QuestionChoices.Last().ChoiceMediaPath = image.ToString();
                else throw new Exception($"Error in line: {kit.LineIter}"); //2 ảnh cùng 1 choices
             }
             if (image == null) throw new Exception($"Error in line: {kit.LineIter}");
        }
    }
}
