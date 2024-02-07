import '../scss/style.scss';
import data from "../data/data.json" assert { type: "json" };

const questionText = document.querySelector("#question");
const answerText = document.querySelectorAll("#answer");
const scoreQuestion = document.querySelector("#score");
const btnSubmit = document.querySelector("#btn-submit");
const btnStart = document.querySelector("#btn-start");

let askedQuestions = [];

const getRandomQuestion = () =>{
    const availableQuestions = data.filter((_, index) => !askedQuestions.includes(index));

    if (availableQuestions.length === 0) {
        askedQuestions = [];
    }
    const randomQuestionIndex = Math.floor(Math.random() * availableQuestions.length);
    const randomQuestion = availableQuestions[randomQuestionIndex];

    askedQuestions.push(data.indexOf(randomQuestion));

    return randomQuestion;
};


const cheekTrueQuestion = (question,answer) =>{
    return question.options[answer].isCorrect;
};

let selectedAnswerIndex;
let completedScore;
let score;
let currentQuestion;

const handleQuizSubmission = () => {
    if (completedScore <= 10) {
        if (currentQuestion) {
            cheekTrueQuestion(currentQuestion, selectedAnswerIndex) ? score++ : console.log("false");
            completedScore++;
            scoreQuestion.textContent = `Question ${completedScore} of 10`;
        }
        const question = getRandomQuestion();
        if (question) {
            displayQuestion(question);
            currentQuestion = question;
        } else {
            endQuiz();
        }
    } else {
        endQuiz();
    }
};

const startQuiz = () => {
    btnStart.style.display = "none";
    btnSubmit.style.display = "block";
    completedScore = 1;
    scoreQuestion.textContent = `Question ${completedScore} of 10`;
    score = 0;
    //displayQuestion(getRandomQuestion());
    handleQuizSubmission(); 
};

const endQuiz = () => {
    btnStart.style.display = "block";
    btnSubmit.style.display = "none";
    console.log(`Right answer ${score}/10`);
    score = 0;
};

const displayQuestion = (question) => {
    questionText.textContent = question.text;
    question.options.forEach((option, index) => {
        answerText[index].textContent = option.text;
    });
};

answerText.forEach((item,index) =>{
    item.addEventListener("click",() =>{
        answerText.forEach(b => b.classList.remove('active'));
        item.classList.add('active');
        selectedAnswerIndex = index;
    });
})

btnSubmit.addEventListener("click", () => {
    handleQuizSubmission();
    console.log(score);
});

btnStart.addEventListener("click", () => {
    startQuiz();
});