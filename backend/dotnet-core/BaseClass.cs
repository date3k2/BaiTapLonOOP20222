public class Category
{
    public int parentID{get; set;}
    public String name{get; set;}
    public String? info{get; set;}
    public int id{get; set;}

    public Category()
    {
        parentID = 0; //No category
        name = "";
        info = "";
        id = 1; //Default category
    }
}
public class Choice
{
    public String content{get; set;}
    public String? mediaPart{get; set;} //Vị trí lưu ảnh của câu hỏi trong thư mục QMedia
    public float grade{get; set;} //Default import 1 while right answer else 0  

    public Choice()
    {
        content = "";
        mediaPart = "";
        grade = 0;
    }

    public Choice(string Content, string? MediaPart = "", float Grade = 0) //Wrong answer is default
    {
        content = Content;
        mediaPart = MediaPart;
        grade = Grade;
    }

}
public class Question
{
    public Category? category{get; set;}
    public String? id{get; set;}
    public String questionName{get; set;}
    public String questionText{get; set;}
    public String? questionMediaPath{get; set;} //Vị trí lưu ảnh của câu hỏi trong thư mục QMedia
    public int mark {get; set;}
    public List<Choice> choices;

    public Question()
    {
        category = new Category();
        id = ""; //No id for searching now
        questionName = "";
        questionText = "";
        questionMediaPath = "";
        mark = 1;
        choices = new List<Choice>();
    }
}

public class Quiz
{
    String id {get; set;}
    String name {get; set;}
    String? description {get; set;}
    bool descriptionShown {get; set;}
    DateTime? openTime {get; set;} 
    DateTime closeTime {get; set;}
    int totalGrade {get; set;}
    int? timeLimit{get; set;} //tính theo phút 
}