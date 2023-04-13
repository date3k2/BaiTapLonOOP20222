﻿using System.Text.Json.Serialization;

namespace QuizProject.Models;

public partial class Question
{
    public Guid QuestionId { get; set; }

    public Guid CategoryId { get; set; }

    public string QuestionCode { get; set; } = null!;

    public string QuestionName { get; set; } = null!;

    public Guid ChoicesId { get; set; }

    [JsonIgnore]
    public virtual Category Category { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<QuestionChoice> QuestionChoices { get; set; } = new List<QuestionChoice>();
}
