export class Quiz{
    constructor(QuizName, QuizDescription, totalGrade, timeLimitInSeconds, questions){
        this.QuizName = QuizName
        this.QuizDescription = QuizDescription
        this.timeLimitInSeconds = timeLimitInSeconds
        this.totalGrade = totalGrade
        this.questions = questions
    }
}