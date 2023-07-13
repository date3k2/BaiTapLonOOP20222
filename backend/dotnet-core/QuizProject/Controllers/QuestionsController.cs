﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizProject.Helpers;
using QuizProject.Models;

namespace QuizProject.Controllers
{
    [Route("api/v1/[controller]")]
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
        public async Task<ActionResult> GetQuestions(int categoryId = 0, bool showSubCategory = false)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            if (categoryId == 0)
            {
                var ques = await _context.Questions.Where(e => e.CategoryId == 0).ToListAsync();
                return StatusCode(200, ques);
            }
            var questions = new List<Question>();
            // Cây chứa các categoryId
            var tree = new List<int> { categoryId };
            if (showSubCategory)
            {
                var categoryRelationships = await _context.CategoryRelationships.ToListAsync();
                var adj = _categoryHelper.GetAdjencyList(categoryRelationships);

                var level = new Dictionary<int, int>
                {
                    [categoryId] = 0
                };

                _categoryHelper.DFS(categoryId, adj, level, tree);
            }
            foreach (var catId in tree)
            {
                var category = await _context.Categories.FindAsync(catId);
                questions.AddRange(category!.Questions);
            }

            return Ok(questions);
        }


        [HttpPost("Single")]
        public async Task<ActionResult<Guid>> PostSingleQuestion(Question question)
        {
            question.QuestionId = Guid.NewGuid();
            short countChoice = 0;
            foreach (var choice in question.QuestionChoices)
            {
                choice.ChoiceId = Guid.NewGuid();
                choice.QuestionId = question.QuestionId;
                if (choice.ChoiceMark != 0)
                    ++countChoice;
            }
            if (countChoice > 1)
                question.MoreThanOneChoice = true;
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

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(Guid id)
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

            return question;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(Guid id, Question question)
        {
            if (id != question.QuestionId)
            {
                return BadRequest();
            }

            var existingQuestion = await _context.Questions.FindAsync(id);
            //.Include(q => q.QuestionChoices)
            //.FirstOrDefaultAsync(q => q.QuestionId == id);

            if (existingQuestion == null)
            {
                return NotFound();
            }

            // Cập nhật các thuộc tính của Question
            existingQuestion.CategoryId = question.CategoryId;
            existingQuestion.QuestionCode = question.QuestionCode;
            existingQuestion.QuestionText = question.QuestionText;
            existingQuestion.MoreThanOneChoice = question.MoreThanOneChoice;
            existingQuestion.QuestionMediaPath = question.QuestionMediaPath;

            // Xóa các QuestionChoice không còn tồn tại trong Question mới
            var removedChoices = existingQuestion.QuestionChoices
                .Where(c => !question.QuestionChoices.Any(newC => newC.ChoiceId == c.ChoiceId))
                .ToList();
            _context.QuestionChoices.RemoveRange(removedChoices);

            // Cập nhật hoặc thêm các QuestionChoice mới
            foreach (var choice in question.QuestionChoices)
            {
                if (choice.ChoiceId != null)
                {
                    var existingChoice = existingQuestion.QuestionChoices
                        .FirstOrDefault(c => c.ChoiceId == choice.ChoiceId);

                    existingChoice!.ChoiceText = choice.ChoiceText;
                    existingChoice!.ChoiceMark = choice.ChoiceMark;
                    existingChoice!.ChoiceMediaPath = choice.ChoiceMediaPath;

                }

                else
                {
                    choice.ChoiceId = Guid.NewGuid();
                    existingQuestion.QuestionChoices.Add(choice);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return StatusCode(400, e.Message);
            }

            return Ok("Done");
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
