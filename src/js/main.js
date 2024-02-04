import '../scss/style.scss';
import data from "../data/data.json" assert { type: "json" };

const questionText = document.querySelector("#question");
const answerText = document.querySelectorAll("#answer");
const scoreQuestion = document.querySelector("#score");
const btnSubmit = document.querySelector("#btn");

const getRandomQuestion = () =>{
    const randomQuestionIndex = Math.floor(Math.random() * data.length);
    return data[randomQuestionIndex];
};


const cheekTrueQuestion = (question,answer) =>{
    return question.options[answer].isCorrect;
};

let selectedAnswerIndex = 1;
let completedScore = 1;
let score = 1;

answerText.forEach((item,num) =>{
    item.addEventListener("click",() =>{
        answerText.forEach(b => b.classList.remove('active'));
        item.classList.add('active');
        selectedAnswerIndex = num;
    });
})

btnSubmit.addEventListener("click", () => {

    const question = getRandomQuestion();
    questionText.textContent = question.text;

    let i = 0;
    answerText.forEach((item) =>{
        item.textContent = question.options[i++].text;
    })

    if (cheekTrueQuestion(question, selectedAnswerIndex)) {
        score++;
    }
    
    console.log(cheekTrueQuestion(question,selectedAnswerIndex))

    scoreQuestion.textContent = `Question ${completedScore} of 10`;
    answerText.forEach(b => b.classList.remove('active'));
    completedScore++;
});