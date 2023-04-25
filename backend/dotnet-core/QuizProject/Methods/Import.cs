using Syncfusion.DocIO;
using Syncfusion.DocIO.DLS;
using System.Text.RegularExpressions;
using System.Drawing;

namespace QuizProject.Models;

public class DataAnalystKit
{
    //Bộ đếm
    public int lineIter = 0; //Dòng số mấy
    public short lineInQuestionIter = -1; //Là đáp án thứ bao nhiêu, nếu là 0 thì là câu hỏi
    public int firstChoicePos = 0; //Vị trí của đáp án A trong câu gần nhất
    public bool isNextQuestion = false; //Nếu đã có dấu \n để sang câu mới thì trả về true, sai thì false


    //Chuẩn RegEx cho các dòng
    public Regex ansPattern = new Regex(@"[A-Z]\. .+", RegexOptions.Compiled | RegexOptions.IgnoreCase); //Chuẩn của câu trả lời
    public Regex rightAnsPattern = new Regex(@"ANSWER: .+", RegexOptions.Compiled | RegexOptions.IgnoreCase); //Chuẩn của đáp án

    //Kết quả
    public List<Question> questions = new List<Question>();
    public List<QuestionChoice> choices = new List<QuestionChoice>();
    public Question question = new Question(); //Câu hỏi đang duyệt
}

public partial class Question
{
    //Hằng số cần dùng
    const double RIGHT_ANSWER_MAX = 1;
    //Các lệnh sẽ dùng
    public void ShowQuestion() //In câu hỏi ra định dạng Aiken
    {
        char rightAnswer = 'A';
        Console.WriteLine($"{QuestionName} (hasMedia: {QuestionMediaPath})");
        for (int i = 0; i < QuestionChoices.Count; i++)
        {
            QuestionChoice choice = QuestionChoices.ElementAt<QuestionChoice>(i);
            Console.WriteLine($"{(char)('A' + i)}. {choice.ChoiceText} (hasMedia: {choice.ChoiceMediaPath})");
            if (choice.ChoiceMark == RIGHT_ANSWER_MAX) rightAnswer += (char)i;
        }
        Console.WriteLine(String.Format("ANSWER: {0}", rightAnswer));
        Console.WriteLine("-------------------------***-------------------------");
    }

    static public void ImportFromFile(FileStream file)
    {
        try
        {
            String extension = file.Name.Split('.').Last().ToUpper(); //Tên đuôi file viết hoa
            String method = $"ImportFrom{extension}"; //Tên method sẽ dùng
            typeof(Question).GetMethod(method)?.Invoke(null, new object[] { file });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Lỗi khi truy xuất file " + file.Name);
        }
    }

    static public void ImportFromTXT(FileStream file)
    {
       //Bộ phân tích dữ liệu
        DataAnalystKit kit = new DataAnalystKit();

        //Thuật toán
        try
        {
            //Bộ đọc dữ liệu
            StreamReader reader = new StreamReader(file);

            //Thuật toán đọc định dạng aiken sang định dạng câu hỏi trong CSDL
            while (!reader.EndOfStream)
            {
                string line = reader.ReadLine();
                kit.lineIter++;
                string errorMessage = string.Format("Error in line {0}. Not Aiken Format.", kit.lineIter); //Thông báo lỗi
                //Chưa có câu hỏi
                if (kit.lineInQuestionIter == -1)
                {
                    if (line == "") throw new Exception(errorMessage); //Where is câu hỏi
                    
                    kit.question.QuestionId = Guid.NewGuid(); //Thêm ID mới cho câu
                    kit.question.QuestionName = line;
                    kit.lineInQuestionIter++;
                    continue;
                }
                //Đã có câu hỏi và đúng định dạng câu trả lời
                if (kit.ansPattern.IsMatch(line))
                {
                    if (line[0] - 'A' != kit.lineInQuestionIter++) throw new Exception(errorMessage); //Sai thứ tự
                    
                    QuestionChoice choice = new QuestionChoice(); //Câu trả lời đang đọc
                    choice.ChoiceId = Guid.NewGuid();
                    choice.QuestionId = kit.question.QuestionId;
                    choice.ChoiceMark = 0; //Chưa biết đúng sai nên mặc định là 0
                    choice.ChoiceText = line.Substring(3);
                    choice.ChoiceMediaPath = "";
                    kit.choices.Add(choice);
                    continue;
                }
                //Đã có câu hỏi và đúng định dạng đáp án
                if (kit.rightAnsPattern.IsMatch(line))
                {
                    if (kit.lineInQuestionIter < 2) throw new Exception(errorMessage); //Làm gì đã có 2 đáp án để chọn
                    
                    int rightAnswerPos = kit.firstChoicePos + line["ANSWER: ".Length] - 'A'; //Vị trí đáp án đúng
                    kit.choices[rightAnswerPos].ChoiceMark = RIGHT_ANSWER_MAX; //Đúng 100% nên được gán RIGHT_ANSWER_MAX
                    kit.isNextQuestion = true;
                    kit.questions.Add(kit.question);
                    continue;
                }
                //Là dòng xuống dòng khi đã có thể sang câu tiếp
                if (line == "" && kit.isNextQuestion)
                {
                    kit.question = new Question();
                    kit.firstChoicePos = kit.choices.Count;
                    kit.isNextQuestion = false;
                }

                //Các TH còn lại in lỗi nhá
                else throw new Exception(errorMessage);
            }
            //Xử lý câu hỏi dư
            if (!kit.isNextQuestion && kit.question.QuestionName != "") throw new Exception(string.Format("Error in line {0}. Not Aiken Format.", kit.lineIter));
            //Thuật toán lưu câu hỏi đã định dạng vào CSDL
            foreach (Question ques in kit.questions)
            {
                ques.ShowQuestion();
            }

            //Chỗ này để thông báo thành công cho Front-end nma chưa rõ bên ý lo pop-up ntn
            Console.WriteLine($"Success. Added {kit.questions.Count} questions");
        }

        catch (Exception ex)
        {
            //Chỗ này để thông báo lỗi cho Front-end nma chưa rõ bên ý lo pop-up ntn
            Console.WriteLine(ex.Message);
        }
        finally
        {
            file.Dispose();
        }
    }

    static public void ImportFromDOCX(FileStream file)
    {
        //Mở tài liệu
        WordDocument document = new WordDocument(stream: file, type: FormatType.Docx);
        //Bộ phân tích dữ liệu
        DataAnalystKit kit = new DataAnalystKit();
        //Chõ lưu ảnh
        List<string> imagePaths = new List<string>();

        //Thuật toán đặc thù
        try
        {
            foreach (IEntity entity in document.ChildEntities)
            {
                kit.lineIter++;
                String errorMessage = String.Format("Error in entity {0}. Not Aiken Format.", kit.lineIter); //Thông báo lỗi
                //Nếu là văn bản
                if (entity.EntityType == EntityType.TextRange)
                {
                    WTextRange? text = entity as WTextRange;
                    //Không có text dù rõ ràng nó là TextRange (với TH 2 dấu cách thì nó không coi là 1 entity)
                    if (text != null) throw new Exception(errorMessage);
                    string line = text.Text;
                    if (kit.lineInQuestionIter == -1)
                    {
                        if (line == "") throw new Exception(errorMessage); //Where is câu hỏi

                        kit.question.QuestionId = Guid.NewGuid(); //Thêm ID mới cho câu
                        kit.question.QuestionName = line;
                        kit.lineInQuestionIter++;
                        continue;
                    }
                    //Đã có câu hỏi và đúng định dạng câu trả lời
                    if (kit.ansPattern.IsMatch(line))
                    {
                        if (line[0] - 'A' != kit.lineInQuestionIter++) throw new Exception(errorMessage); //Sai thứ tự

                        QuestionChoice choice = new QuestionChoice(); //Câu trả lời đang đọc
                        choice.ChoiceId = Guid.NewGuid();
                        choice.QuestionId = kit.question.QuestionId;
                        choice.ChoiceMark = 0; //Chưa biết đúng sai nên mặc định là 0
                        choice.ChoiceText = line.Substring(3);
                        choice.ChoiceMediaPath = "";
                        kit.choices.Add(choice);
                        continue;
                    }
                    //Đã có câu hỏi và đúng định dạng đáp án và đã có thể sang câu tiếp
                    if (kit.rightAnsPattern.IsMatch(line))
                    {
                        if (kit.lineInQuestionIter < 2) throw new Exception(errorMessage); //Làm gì đã có 2 đáp án để chọn

                        int rightAnswerPos = kit.firstChoicePos + line["ANSWER: ".Length] - 'A'; //Vị trí đáp án đúng
                        kit.choices[rightAnswerPos].ChoiceMark = RIGHT_ANSWER_MAX; //Đúng 100% nên được gán RIGHT_ANSWER_MAX
                        kit.isNextQuestion = true;
                        kit.questions.Add(kit.question);
                        //Reset từ đầu
                        kit.question = new Question();
                        kit.firstChoicePos = kit.choices.Count;
                        kit.isNextQuestion = false;
                    }

                    //Các TH còn lại in lỗi nhá
                    else throw new Exception(errorMessage);
                }

                else if (entity.EntityType == EntityType.Picture)
                {
                    WPicture? picture = entity as WPicture;
                    string fileName = Path.GetTempFileName();
                    string imageTempPath = String.Format(@"D:\ConsoleApp1\Temporary\img_{0}_{1}_{2}.png", DateTime.Now.ToString("yyyy_MM_dd_HHmmss"), kit.questions.Count, kit.question.QuestionChoices.Count);
                    if (kit.question.QuestionName == "") throw new Exception(errorMessage); //Chưa có câu hỏi mà đã có ảnh -> lỗi
                    else if (kit.question.QuestionChoices.Count == 0)
                    {
                        if (kit.question.QuestionMediaPath == "") kit.question.QuestionMediaPath = imageTempPath;
                        else throw new Exception(errorMessage); //Có 2 ảnh = Chưa có choice mà đã có ảnh mà question có ảnh rồi -> lỗi
                    }
                    else 
                    {
                        if (kit.question.QuestionChoices.Last().ChoiceMediaPath == "") kit.question.QuestionChoices.Last().ChoiceMediaPath = imageTempPath;
                        else throw new Exception(errorMessage); //2 ảnh cùng 1 choices
                    }
  
                    if (picture == null) throw new Exception(errorMessage); //Bằng cách thần kì nào đó ảnh pay acc -> lỗi
                    Bitmap? bmp = new Bitmap(new MemoryStream(picture.ImageBytes));
                    bmp.Save(imageTempPath, System.Drawing.Imaging.ImageFormat.Png);
                    imagePaths.Add(imageTempPath);
                }
            }
            if (kit.question.QuestionName != "") 
                throw new Exception(string.Format("Error in line {0}. Not Aiken Format.", kit.lineIter));
        }

        catch (Exception ex)
        {
            //Xóa hết ảnh của file lỗi
            foreach (string path in imagePaths)
            {
                File.Delete(path);
            }
            //Front-end lo
            Console.WriteLine(ex.Message);
        }

        finally
        {
            file.Dispose();
            document.Dispose();
        }
    }
}

