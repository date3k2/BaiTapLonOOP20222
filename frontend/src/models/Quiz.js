export class Quiz{
    constructor(quizId, quizName, quizDescription, timeLimitInSeconds, showDescription, isShuffle, maxGrade){
        this.quizId = quizId
        this.quizName = quizName
        this.quizDescription = quizDescription
        this.timeLimitInSeconds = timeLimitInSeconds
        this.showDescription = showDescription
        this.isShuffle = isShuffle
        this.maxGrade = maxGrade
    }
}