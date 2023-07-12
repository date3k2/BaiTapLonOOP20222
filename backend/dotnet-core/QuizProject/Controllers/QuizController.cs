using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizProject.Helpers;
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

            if (quiz.IsShuffle)
            {
                Random random = new();
                quiz.Questions = quiz.Questions.OrderBy(x => random.Next()).ToArray();
                foreach (var question in quiz.Questions)
                {
                    question.QuestionChoices = question.QuestionChoices.OrderBy(x => random.Next()).ToArray();
                }
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
        [HttpPost("Export")]
        public async Task<IActionResult> ExportQuiz(Guid quizId, string? password)
        {
            var quiz = _context.Quizzes.Find(quizId)!;
            var exp = new ExportFile();
            string desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
            string input = Path.Combine(desktopPath, "Input.md");
            string output = Path.Combine(desktopPath, $"{quiz.QuizName}.pdf");
            exp.WriteMarkdown(quiz, input);
            exp.MarkdownToPdf(input, output);
            if (password != null)
            {
                exp.SetPdfPassword(output, password);
            }
            return StatusCode(201, output);
        }

        private bool QuizExists(Guid id)
        {
            return (_context.Quizzes?.Any(e => e.QuizId == id)).GetValueOrDefault();
        }
    }
}
