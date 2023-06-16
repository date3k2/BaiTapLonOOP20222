using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizProject.Helpers;
using QuizProject.Models;

namespace QuizProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly QuizProjectContext _context;

        public QuestionsController(QuizProjectContext context, ICategoryHelper categoryHelper)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult> GetQuestions(int categoryId = 0, bool showSubCategory = false)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            if (categoryId == 0)
            {
                var ques = await _context.Questions.ToListAsync();
                return StatusCode(200, ques);
            }
            var questions = new List<Question>();
            if (showSubCategory)
            {
                var allChildrenId = await _context.CategoryRelationships.Where(e => e.CategoryParentId == categoryId).Select(e => e.CategoryChildId).ToListAsync();
                foreach (var childrenId in allChildrenId)
                {
                    var category = await _context.Categories.FindAsync(childrenId);
                    questions.AddRange(category!.Questions);
                }
            }
            else
            {
                var category = await _context.Categories.FindAsync(categoryId);
                questions.AddRange(category!.Questions);
            }
            return Ok(questions);
        }
        [HttpPost("Single")]
        public async Task<ActionResult<Guid>> PostSingleQuestion(Question question)
        {
            question.QuestionId = Guid.NewGuid();
            foreach (var choice in question.QuestionChoices)
            {
                choice.ChoiceId = Guid.NewGuid();
                choice.QuestionId = question.QuestionId;
            }
            _context.Questions.Add(question);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, question.QuestionId);

            }
            catch (Exception ex)
            {
                return StatusCode(400, ex.Message);
            }
        }

        //// GET: api/Questions/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Question>> GetQuestion(Guid id)
        //{
        //  if (_context.Questions == null)
        //  {
        //      return NotFound();
        //  }
        //    var question = await _context.Questions.FindAsync(id);

        //    if (question == null)
        //    {
        //        return NotFound();
        //    }

        //    return question;
        //}

        // PUT: api/Questions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(Guid id, Question question)
        {
            if (id != question.QuestionId)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(400, e.Message);
            }

            return NoContent();
        }

        /// <summary>
        /// API import câu hỏi từ file .txt và .docx dưới định dạng Aiken format
        /// </summary>
        /// <param name="categoryId"></param>
        /// <param name="file"></param>
        /// <returns>Trả về số câu hỏi được import thành công, hoặc báo lỗi nếu sai định dạng</returns>
        [HttpPost("File")]
        public async Task<ActionResult> ImportQuestionFromFile(IFormFile file, int categoryId = 0)
        {
            try
            {
                var import = new ImportFile();
                var fileStream = file.OpenReadStream();
                if (file.ContentType == "text/plain")
                {
                    var questionsAndChoices = import.ImportFromTXT(fileStream);
                    questionsAndChoices.Item1.ForEach(x => x.CategoryId = categoryId);
                    _context.Questions.AddRange(questionsAndChoices.Item1);
                    _context.QuestionChoices.AddRange(questionsAndChoices.Item2);
                    await _context.SaveChangesAsync();
                    return StatusCode(200, $"Success {questionsAndChoices.Item1.Count} questions.");
                }
                else
                {
                    var questionsAndChoices = import.ImportDocxl(fileStream);
                    questionsAndChoices.Item1.ForEach(x => x.CategoryId = categoryId);
                    _context.Questions.AddRange(questionsAndChoices.Item1);
                    _context.QuestionChoices.AddRange(questionsAndChoices.Item2);
                    await _context.SaveChangesAsync();
                    return StatusCode(200, $"Success {questionsAndChoices.Item1.Count} questions.");
                }

            }
            catch (Exception ex)
            {

                return StatusCode(400, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(Guid id)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
