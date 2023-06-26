import axios from "axios";

const URL = "https://localhost:7114/api/v1";
//const URL = "//localhost:4000";

class apiServices {
    getQuestions(category, doesShowSub) {
        return axios.get(`${URL}/Questions?categoryId=${category}&showSubCategory=${doesShowSub}`);
    }

    getCategory(){
        return axios.get(`${URL}/Categories`);
    }
    
    postCategory(parentId, categoryData){
        return axios.post(`${URL}/Categories?parentId=${parentId}`, categoryData);
    }

    getQuestion(questionID) {
        return axios.get(`${URL}/Questions/${questionID}`);
    }

    putQuestion(questionData, questionID) {
        return axios.put(`${URL}/Questions/${questionID}`, questionData);
    }

    postQuestion(questionData) {
        return axios.post(`${URL}/Questions/Single`, questionData)
    } 

    postImportQuestions(categoryId, ImportQuestionsFile){
        const formData = new FormData();
        formData.append(
            "file",
            ImportQuestionsFile
        )
        return axios.post(`${URL}/Questions/File?categoryId=${categoryId}`, formData);
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
        return axios.put(`${URL}/${quizId}`, quizData);
    }
}

export default new apiServices();