import '../scss/style.scss';
import data from "../data/data.json" assert { type: "json" };

const questionText = document.querySelector("#question");
const answerText = document.querySelectorAll("#answer");
const scoreQuestion = document.querySelector("#score");
const btnSubmit = document.querySelector("#btn-submit");
const btnStart = document.querySelector("#btn-start");
const startPanel = document.querySelector('#app-start');
const appQuestion = document.querySelector('#app-content');
const appAnswers = document.querySelector('#app-answers');
const themeSwitch = document.querySelector('#themeSwitch');
const msgError = document.querySelector('.error-massg');

let askedQuestions = [];
let selectedAnswerIndex;
let completedScore;
let score;
let currentQuestion;

const rightAnswer = (score) => {

    if(score > 1 && score < 5){
        return `You got ${score} right answers. Maybe another time. Try again.`
    }else if(score >= 5 && score < 8 ){
        return `You got ${score} right answers. It's not that bad. Try again.`
    }else if (score >= 8 && score <= 10){
        return `You got ${score} right answers. It's great to keep it that way.`
    }else{
        return  `You got ${score} right answers. Don't worry, try again.`
    }
}

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

const handleIncorrectAnswer = () => {
    console.log("false");
    //Some active for fail answer
};

const updateScoreQuestion = () => {
    scoreQuestion.textContent = `Question ${completedScore} of 10`;
};


const clearActiveAnswer = () => {
    answerText.forEach(answer => answer.classList.remove('active'));
};

const handleQuizSubmission = () => {
    if (completedScore <= 10) {
        if (currentQuestion) {
            if (selectedAnswerIndex !== null && selectedAnswerIndex !== undefined) {
                cheekTrueQuestion(currentQuestion, selectedAnswerIndex) ? score++ : handleIncorrectAnswer();
                completedScore++;
                updateScoreQuestion();
            } else {
                msgError.style.display = 'block';
                
                setTimeout(() => {
                    msgError.style.display = 'none';
                }, 3000);
                return;
            }
        }
        const question = getRandomQuestion();
        if (question) {
            displayQuestion(question);
            currentQuestion = question;
            clearActiveAnswer();
            selectedAnswerIndex = null;
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
    appQuestion.style.display = "block";
    appAnswers.style.display = "block";
    startPanel.style.display = "none";

    score = 0;
    completedScore = 1;
    updateScoreQuestion();
    handleQuizSubmission();
};

const endQuiz = () => {
    btnStart.style.display = "block";
    btnSubmit.style.display = "none";
    appQuestion.style.display = "none";
    appAnswers.style.display = "none";
    startPanel.style.display = "block";
    startPanel.textContent =  rightAnswer(score);
    completedScore = 0;
    score = 0; 
    currentQuestion = null; 
    askedQuestions = []; 
};

const displayQuestion = (question) => {
    questionText.textContent = question.text;
    question.options.forEach((option, index) => {
        answerText[index].textContent = option.text;
    });
};

answerText.forEach((item,index) =>{
    item.addEventListener("click",() =>{
        clearActiveAnswer();
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

themeSwitch.addEventListener("click", () => {
    const currentTheme = document.body.className;
    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';
    } else {
        document.body.className = 'light-theme';
    }
});