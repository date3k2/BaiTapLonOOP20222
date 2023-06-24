export class Question{
    constructor(questionId, categoryId, questionCode, questionText, moreThanOneChoice, questionMediaPath, questionChoices) {
        this.questionId = questionId
        this.categoryId = categoryId
        this.questionCode = questionCode
        this.questionText = questionText
        this.moreThanOneChoice = moreThanOneChoice
        this.questionMediaPath = questionMediaPath
        this.questionChoices = questionChoices
    }
}