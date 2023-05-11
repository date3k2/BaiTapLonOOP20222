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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK_Categories_CategoryId");
            entity.Property(e => e.CategoryId).ValueGeneratedNever();
            entity.Property(e => e.CategoryInfo)
                .HasMaxLength(200)
                .IsUnicode(true);
            entity.Property(e => e.CategoryId).ValueGeneratedOnAdd();
            entity.Property(e => e.CategoryName)
                .HasMaxLength(50)
                .IsUnicode(true);
        });

        modelBuilder.Entity<CategoryRelationship>(entity =>
        {
            entity.HasKey(e => new { e.CategoryParentId, e.CategoryChildId });

            entity.ToTable("CategoryRelationship");

            entity.HasOne(d => d.CategoryParent).WithOne(p => p.CategoryRelationship)
                .HasForeignKey<CategoryRelationship>(d => d.CategoryParentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CategoryRelationship_CategoryParentId");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.QuestionId).HasName("PK_Questions_QuestionId");

            entity.Property(e => e.QuestionId).ValueGeneratedNever();
            entity.Property(e => e.QuestionCode)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.QuestionName)
                .HasMaxLength(200)
                .IsUnicode(true);

            entity.HasOne(d => d.Category).WithMany(p => p.Questions)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Questions_CategoryId");
        });

        modelBuilder.Entity<QuestionChoice>(entity =>
        {
            entity.HasKey(e => e.ChoiceId).HasName("PK_QuestionChoices_ChoiceId");

            entity.Property(e => e.ChoiceId).ValueGeneratedNever();
            entity.Property(e => e.ChoiceText)
                .HasMaxLength(50)
                .IsUnicode(true);

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionChoices)
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("FK_QuestionChoices_QuestionId");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}