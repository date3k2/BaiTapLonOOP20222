using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizProject.Models;

namespace QuizProject.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly QuizProjectContext _context;

        public QuizController(QuizProjectContext context)
        {
            _context = context;
        }

        // GET: api/Quiz
        [HttpGet]
        public async Task<IActionResult> GetAllQuizzesName()
        {
            if (_context.Quizzes == null)
            {
                return NotFound();
            }
            return StatusCode(200, await _context.Quizzes.Select(q => new { q.QuizId, q.QuizName }).ToListAsync());
        }

        // GET: api/Quiz/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz>> GetQuiz(Guid id)
        {
            if (_context.Quizzes == null)
            {
                return NotFound();
            }
            var quiz = await _context.Quizzes.FindAsync(id);

            if (quiz == null)
            {
                return NotFound();
            }

            return quiz;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuiz(Guid id, QuizUpdate quizUpdate)
        {
            if (id != quizUpdate.QuizId)
            {
                return BadRequest();
            }

            var existingQuiz = await _context.Quizzes.FindAsync(id);

            if (existingQuiz == null)
            {
                return NotFound();
            }

            // Cập nhật các thuộc tính của Quiz
            existingQuiz.QuizName = quizUpdate.QuizName;
            existingQuiz.QuizDescription = quizUpdate.QuizDescription;
            existingQuiz.OpenTime = quizUpdate.OpenTime;
            existingQuiz.CloseTime = quizUpdate.CloseTime;
            existingQuiz.TimeLimitInSeconds = quizUpdate.TimeLimitInSeconds;
            existingQuiz.ShowDescription = quizUpdate.ShowDescription;
            existingQuiz.IsShuffle = quizUpdate.IsShuffle;
            existingQuiz.MaxGrade = quizUpdate.MaxGrade;

            // Thay đổi các câu hỏi trong Quiz
            var deleteQuery = $"DELETE FROM QuizQuestion WHERE QuizId = '{id}'";
            await _context.Database.ExecuteSqlRawAsync(deleteQuery);

            foreach (var questionId in quizUpdate.ListQuestionId)
            {
                var insertQuery = $"INSERT INTO QuizQuestion (QuizId, QuestionId) VALUES ('{id}', '{questionId}')";
                await _context.Database.ExecuteSqlRawAsync(insertQuery);
            }
            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception)
            {

                throw;
            }
            return NoContent();
        }


        // POST: api/Quiz
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Quiz>> PostQuiz(Quiz quiz)
        {
            if (_context.Quizzes == null)
            {
                return Problem("Entity set 'QuizProjectContext.Quizzes' is null.");
            }

            quiz.QuizId = Guid.NewGuid();

            // Thêm Quiz vào DbContext
            _context.Entry(quiz).State = EntityState.Added;

            // Đánh dấu các câu hỏi đã tồn tại là Unchanged
            foreach (var question in quiz.Questions)
            {
                _context.Entry(question).State = EntityState.Unchanged;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(400, ex.Message);
            }

            return CreatedAtAction("GetQuiz", new { id = quiz.QuizId }, quiz);
        }


        // DELETE: api/Quiz/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz(Guid id)
        {
            if (_context.Quizzes == null)
            {
                return NotFound();
            }
            var quiz = await _context.Quizzes.FindAsync(id);
            if (quiz == null)
            {
                return NotFound();
            }

            _context.Quizzes.Remove(quiz);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuizExists(Guid id)
        {
            return (_context.Quizzes?.Any(e => e.QuizId == id)).GetValueOrDefault();
        }
    }
}
