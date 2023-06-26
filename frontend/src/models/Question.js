export class Question{
    constructor(categoryId, questionCode, questionText, moreThanOneChoice, questionMediaPath, questionChoices) {
        this.categoryId = categoryId
        this.questionCode = questionCode
        this.questionText = questionText
        this.moreThanOneChoice = moreThanOneChoice
        this.questionMediaPath = questionMediaPath
        this.questionChoices = questionChoices
    }
}