const questions = [
    {
        question: "Which state is also known as the “Fruit Bowl” of India?",
        answers: [
            {text: "Jammu and Kashmir", correct: false},
            {text: "Himachal Pradesh", correct: true},
            {text: "Assam", correct: false},
            {text: "Meghalaya", correct: false}
        ]
    },
    {
        question: "Who discovered India?",
        answers: [
            {text: "Vasco da Gama", correct: true},
            {text: "Christopher Columbus", correct: false},
            {text: "James Cook", correct: false},
            {text: "Willem Janszoon", correct: false}
        ]
    },
    {
        question: "Which place in India is also known as the “Land of Rising Sun”?",
        answers: [
            {text: "Mizoram", correct: false},
            {text: "Arunachal Pradesh", correct: true},
            {text: "Assam", correct: false},
            {text: "Meghalaya", correct: false}
        ]
    },
    {
        question: "Which is the national sport of India?",
        answers: [
            {text: "Cricket", correct: false},
            {text: "Football", correct: false},
            {text: "Kabaddi", correct: false},
            {text: "Hockey", correct: true}
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuesIndex = 0;
let score = 0;

function startQuiz() {
    currentQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQues = questions[currentQuesIndex];
    let quesNo = currentQuesIndex + 1;
    questionElement.innerHTML = quesNo + '.' + currentQues.question;

    currentQues.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuesIndex++;
    if(currentQuesIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuesIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();