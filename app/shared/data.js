import axios from "axios";

export default class QuizData {
    constructor(){

    }

    getQuiz() {
        return axios.get("/api/quiz/play");
    }

    saveQuiz(newQuiz){
        return axios.post("/api/quiz/add", newQuiz);
    }
}