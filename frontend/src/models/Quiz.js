export class Quiz{
    constructor(quizName, quizDescription, timeLimitInSeconds, showDescription, isShuffle){
        this.quizName = quizName
        this.openTime = null
        this.closeTime = null 
        this.quizDescription = quizDescription
        this.timeLimitInSeconds = timeLimitInSeconds
        this.showDescription = showDescription
        this.isShuffle = isShuffle
    }
}