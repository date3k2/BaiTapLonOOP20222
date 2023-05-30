import axios from "axios";

const URL = "https://9333b960-135e-48a2-9e3d-de1f194dd3d3.mock.pstmn.io";

class apiServices {
    getQuestions(category, doesShowSub) {
        return axios.get(`${URL}/question?category=${category}&doesShowSub=${doesShowSub}`);
    }

    getCategory(){
        return axios.get(`${URL}/category`);
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
        return axios.get(`${URL}/quiz`)
    }
}

export default new apiServices();