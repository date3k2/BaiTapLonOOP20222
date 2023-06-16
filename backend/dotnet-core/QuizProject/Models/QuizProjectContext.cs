using Microsoft.EntityFrameworkCore;

namespace QuizProject.Models;

public partial class QuizProjectContext : DbContext
{
    public QuizProjectContext()
    {
    }

    public QuizProjectContext(DbContextOptions<QuizProjectContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<CategoryRelationship> CategoryRelationships { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<QuestionChoice> QuestionChoices { get; set; }

    public virtual DbSet<Quiz> Quizzes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK_Categories_CategoryId");
            entity.Property(e => e.CategoryInfo).HasMaxLength(200);
            entity.Property(e => e.CategoryName).HasMaxLength(50);
        });

        modelBuilder.Entity<CategoryRelationship>(entity =>
        {
            entity.HasKey(e => new { e.CategoryParentId, e.CategoryChildId });

            entity.ToTable("CategoryRelationship");

            entity.HasOne(d => d.CategoryParent).WithMany(p => p.CategoryRelationships)
                .HasForeignKey(d => d.CategoryParentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CategoryRelationship_CategoryParentId");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PK_Questions_QuestionId");

            entity.HasIndex(e => e.CategoryId, "IX_Questions_CategoryId");

            entity.Property(e => e.QuestionId).ValueGeneratedNever();

            entity.HasOne(d => d.Category).WithMany(p => p.Questions)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Questions_CategoryId");
        });

        modelBuilder.Entity<QuestionChoice>(entity =>
        {
            entity.HasKey(e => e.ChoiceId).HasName("PK_QuestionChoices_ChoiceId");

            entity.HasIndex(e => e.QuestionId, "IX_QuestionChoices_QuestionId");

            entity.Property(e => e.ChoiceId).ValueGeneratedNever();
            entity.Property(e => e.ChoiceMark).HasDefaultValueSql("((0))");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionChoices)
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("FK_QuestionChoices_QuestionId");
        });

        modelBuilder.Entity<Quiz>(entity =>
        {
            entity.HasKey(e => e.QuizId).HasName("PK_Quiz_QuizId");

            entity.ToTable("Quiz", tb => tb.HasComment("Bảng câu hỏi"));

            entity.Property(e => e.QuizId).ValueGeneratedNever();
            entity.Property(e => e.QuizDescription).HasMaxLength(200);
            entity.Property(e => e.QuizName).HasMaxLength(100);

            entity.HasMany(d => d.Questions).WithMany(p => p.Quizzes)
                .UsingEntity<Dictionary<string, object>>(
                    "QuizQuestion",
                    r => r.HasOne<Question>().WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_QuizQuestion_QuestionId"),
                    l => l.HasOne<Quiz>().WithMany()
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_QuizQuestion_QuizId"),
                    j =>
                    {
                        j.HasKey("QuizId", "QuestionId");
                        j.ToTable("QuizQuestion");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
