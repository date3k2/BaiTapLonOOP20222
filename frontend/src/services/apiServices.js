import axios from "axios";

const URL = "//localhost:4000";

class apiServices {
    getQuestions(category, doesShowSub) {
        return axios.get(`${URL}/questions?category=${category}&doesShowSub=${doesShowSub}`);
    }

    getCategory(){
        return axios.get(`${URL}/categories`);
    }
    
    postCategory(categoryFile){
        const formData = new FormData();
        formData.append(
            "categoryFile",
            categoryFile
        );
        return axios.post(`${URL}/category`, formData);
    }

    getQuestion(questionID) {
        return axios.get(`${URL}/question?questionID=${questionID}`);
    }

    putQuestion(questionFile, questionID) {
        return axios.put(`${URL}/question?questionID=${questionID}`, questionFile);
    }

    postQuestion(questionFile) {
        const formData = new FormData();
        formData.append(
            questionFile
        );
        return axios.post(`${URL}/question`)
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
        return axios.get(`${URL}/   ${quizName}/question`);
    }

    postQuizQuestion(quizName, questionsId){
        return axios.post(`${URL}/${quizName}/question`, questionsId);
    }
}

export default new apiServices();