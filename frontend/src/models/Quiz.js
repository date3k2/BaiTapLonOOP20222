export class Quiz{
    constructor(QuizId, QuizName, QuizDescription, totalGrade, timeLimitInSeconds, questions){
        this.QuizId = QuizId
        this.QuizName = QuizName
        this.QuizDescription = QuizDescription
        this.timeLimitInSeconds = timeLimitInSeconds
        this.totalGrade = totalGrade
        this.questions = questions
    }
}