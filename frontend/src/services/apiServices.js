import axios from "axios";

const URL = "//localhost:4000";

class apiServices {
    getQuestions(category, doesShowSub) {
        return axios.get(`${URL}/questions?category=${category}&doesShowSub=${doesShowSub}`);
    }

    getCategory(){
        return axios.get(`${URL}/categories`);
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
}

export default new apiServices();