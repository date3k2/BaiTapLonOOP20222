using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace QuizProject.Models;

public partial class Category
{
    public Guid CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string? CategoryInfo { get; set; }

    [JsonIgnore]
    public virtual CategoryRelationship? CategoryRelationship { get; set; }

    [JsonIgnore]
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
}


public static class CategoryEndpoints
{
    public static void MapCategoryEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/api/Category", async (QuizProjectContext db) =>
        {
            return await db.Categories.ToListAsync();
        })
        .WithName("GetAllCategorys")
        .Produces<List<Category>>(StatusCodes.Status200OK);

        //routes.MapGet("/api/Category/{id}", async (Guid CategoryId, QuizProjectContext db) =>
        //{
        //    return await db.Categories.FindAsync(CategoryId)
        //        is Category model
        //            ? Results.Ok(model)
        //            : Results.NotFound();
        //})
        //.WithName("GetCategoryById")
        //.Produces<Category>(StatusCodes.Status200OK)
        //.Produces(StatusCodes.Status404NotFound);

        //routes.MapPut("/api/Category/{id}", async (Guid CategoryId, Category category, QuizProjectContext db) =>
        //{
        //    var foundModel = await db.Categories.FindAsync(CategoryId);

        //    if (foundModel is null)
        //    {
        //        return Results.NotFound();
        //    }

        //    db.Update(category);

        //    await db.SaveChangesAsync();

        //    return Results.NoContent();
        //})
        //.WithName("UpdateCategory")
        //.Produces(StatusCodes.Status404NotFound)
        //.Produces(StatusCodes.Status204NoContent);

        //routes.MapPost("/api/Category/", async (Category category, QuizProjectContext db) =>
        //{
        //    db.Categories.Add(category);
        //    await db.SaveChangesAsync();
        //    return Results.Created($"/Categorys/{category.CategoryId}", category);
        //})
        //.WithName("CreateCategory")
        //.Produces<Category>(StatusCodes.Status201Created);


        //routes.MapDelete("/api/Category/{id}", async (Guid CategoryId, QuizProjectContext db) =>
        //{
        //    if (await db.Categories.FindAsync(CategoryId) is Category category)
        //    {
        //        db.Categories.Remove(category);
        //        await db.SaveChangesAsync();
        //        return Results.Ok(category);
        //    }

        //    return Results.NotFound();
        //})
        //.WithName("DeleteCategory")
        //.Produces<Category>(StatusCodes.Status200OK)
        //.Produces(StatusCodes.Status404NotFound);
    }
}