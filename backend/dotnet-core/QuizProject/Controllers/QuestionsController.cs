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

        private readonly ICategoryHelper _categoryHelper;

        public QuestionsController(QuizProjectContext context, ICategoryHelper categoryHelper)
        {
            _context = context;
            _categoryHelper = categoryHelper;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<List<Question>>> GetQuestions(int categoryId = -1, bool showSubCategory = false)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            if (categoryId == -1)
            {

                return await _context.Questions.ToListAsync();
            }
            return await _context.Questions.Where(q => q.CategoryId == categoryId).ToListAsync();
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

        //// PUT: api/Questions/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutQuestion(Guid id, Question question)
        //{
        //    if (id != question.QuestionId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(question).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!QuestionExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Questions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> ImportQuestionFromFile(int categoryId, IFormFile file)
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
                    return StatusCode(200, new { questionsAndChoices.Item1, questionsAndChoices.Item2 });
                }

            }
            catch (Exception ex)
            {

                return StatusCode(400, ex.Message);
            }
        }

        // DELETE: api/Questions/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteQuestion(Guid id)
        //{
        //    if (_context.Questions == null)
        //    {
        //        return NotFound();
        //    }
        //    var question = await _context.Questions.FindAsync(id);
        //    if (question == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Questions.Remove(question);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}


    }
}
