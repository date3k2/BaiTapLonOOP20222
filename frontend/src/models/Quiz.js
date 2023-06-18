export class Quiz{
    constructor(QuizId, QuizName, QuizDescription, totalGrade, timeLimitInSeconds){
        this.QuizId = QuizId
        this.QuizName = QuizName
        this.QuizDescription = QuizDescription
        this.timeLimitInSeconds = timeLimitInSeconds
        this.totalGrade = totalGrade
    }
}