import axios from "axios";

const URL = "//localhost:4000";

class apiServices {
    getQuestions(category, doesShowSub) {
        return axios.get(`${URL}/questions?category=${category}&doesShowSub=${doesShowSub}`);
    }

    getCategory(){
        return axios.get(`${URL}/categories`);
    }
    
    getQuestion(questionID) {
        return axios.get(`${URL}/question?questionID=${questionID}`);
    }

    postQuestion(questionFile, questionID) {
        const formData = new FormData();
        formData.append(
            questionFile
        );
        return axios.post(`${URL}/question?questionID=${questionID}`)
    } 

    postQuiz(quizFile){
        const formData = new FormData();

        formData.append(
          "questionFile",
          quizFile
        );

        return axios.post(`${URL}/import`, formData);
    }

    getQuiz(){
        return axios.get(`${URL}/quiz`);
    }

    getQuizQuestion(quizName){
        return axios.get(`${URL}/${quizName}/question`);
    }

    postQuizQuestion(quizName, questionsId){
        return axios.post(`${URL}/${quizName}/question`, questionsId);
    }

    deleteQuizQuestion(quizName, questionsId){
        return axios.delete(`${URL}/${quizName}/question/delete`, questionsId);
    }
}

export default new apiServices();