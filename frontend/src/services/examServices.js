class ExamService{
    finishExam({answer}){
        totalMark = 0
        answer.forEach(item => {
            item.forEach(i => totalMark += i.choiceMark)
        });
        return totalMark;
    }
}

export default new ExamService();