using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizProject.Migrations
{
    /// <inheritdoc />
    public partial class InitDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "-1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CategoryInfo = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories_CategoryId", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Quiz",
                columns: table => new
                {
                    QuizId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuizName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    QuizDescription = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    OpenTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CloseTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TimeLimitInSeconds = table.Column<int>(type: "int", nullable: true),
                    ShowDescription = table.Column<bool>(type: "bit", nullable: false),
                    IsShuffle = table.Column<bool>(type: "bit", nullable: false),
                    MaxGrade = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quiz_QuizId", x => x.QuizId);
                },
                comment: "Bảng câu hỏi");

            migrationBuilder.CreateTable(
                name: "CategoryRelationship",
                columns: table => new
                {
                    CategoryParentId = table.Column<int>(type: "int", nullable: false),
                    CategoryChildId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryRelationship", x => new { x.CategoryParentId, x.CategoryChildId });
                    table.ForeignKey(
                        name: "FK_CategoryRelationship_CategoryParentId",
                        column: x => x.CategoryParentId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    QuestionCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuestionText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoreThanOneChoice = table.Column<bool>(type: "bit", nullable: false),
                    QuestionMediaPath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions_QuestionId", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_Questions_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuestionChoices",
                columns: table => new
                {
                    ChoiceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ChoiceMark = table.Column<double>(type: "float", nullable: true, defaultValueSql: "((0))"),
                    ChoiceText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChoiceMediaPath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionChoices_ChoiceId", x => x.ChoiceId);
                    table.ForeignKey(
                        name: "FK_QuestionChoices_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "QuestionId");
                });

            migrationBuilder.CreateTable(
                name: "QuizQuestion",
                columns: table => new
                {
                    QuizId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizQuestion", x => new { x.QuizId, x.QuestionId });
                    table.ForeignKey(
                        name: "FK_QuizQuestion_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "QuestionId");
                    table.ForeignKey(
                        name: "FK_QuizQuestion_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quiz",
                        principalColumn: "QuizId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuestionChoices_QuestionId",
                table: "QuestionChoices",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_CategoryId",
                table: "Questions",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizQuestion_QuestionId",
                table: "QuizQuestion",
                column: "QuestionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryRelationship");

            migrationBuilder.DropTable(
                name: "QuestionChoices");

            migrationBuilder.DropTable(
                name: "QuizQuestion");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Quiz");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
