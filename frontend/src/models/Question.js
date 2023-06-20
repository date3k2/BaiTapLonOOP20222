export class Question{
    constructor(questionId, categoryId, questionName, questionMediaPath, questionChoices) {
        this.questionId = questionId
        this.categoryId = categoryId
        this.questionName = questionName
        this.questionMediaPath = questionMediaPath
        this.questionChoices = questionChoices
    }
}