import axios from "axios";

const URL = "//localhost:4000";

class apiServices {
    getQuestions(category, doesShowSub) {
        return axios.get(`${URL}/questions?category=${category}&doesShowSub=${doesShowSub}`);
    }

    getCategory(){
        return axios.get(`${URL}/categories`);
    }
    
    postCategory(categoryData){
        return axios.post(`${URL}/category`, categoryData);
    }

    getQuestion(questionID) {
        return axios.get(`${URL}/question?questionID=${questionID}`);
    }

    putQuestion(questionData, questionID) {
        return axios.put(`${URL}/question?questionID=${questionID}`, questionData);
    }

    postQuestion(questionData) {
        return axios.post(`${URL}/question`, questionData)
    } 

    postImportQuestions(ImportQuestionsFile){
        const formData = new FormData();
        formData.append(
          "questionFile",
          ImportQuestionsFile
        );
        return axios.post(`${URL}/import`, formData);
    }
    postQuiz(quizData) {
        return axios.post(`${URL}/quiz`, quizData);
    }

    getAllQuiz(){
        return axios.get(`${URL}/quiz`);
    }

    getQuiz(quizId){
        return axios.get(`${URL}/quiz/${quizId}`)
    }

    putQuiz(quizId, quizData){
        return axios.post(`${URL}/${quizId}/`, quizData);
    }
}

export default new apiServices();