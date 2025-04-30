// Your code goes here:
// 1. Load the current question and display options
// 2. Handle user's answer click
// 3. Move to next question when Next button is clicked
// 4. Show score at the end and allow restart

// Hints:
// - Use document.getElementById or querySelector
// - Loop through quizData array
// - Add/remove DOM elements dynamically
// - Use event listeners to respond to user actions


const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "jQuery", "CSS"],
    answer: "CSS"
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<script>", "<js>", "<javascript>"],
    answer: "<script>"
  }
];
//let currentQuestion = 0

const questionText = document.getElementById("question")
const optionsText = document.getElementById("options")

document.getElementById('nextBtn').addEventListener('click', () => {
    document.body.appendChild(newElm1);
    document.body.appendChild(newElm2);
    document.body.appendChild(newElm3);
});

let i = 0;
function addText(question, options, answer){
  i += 1;
  questionText.innerHTML = quizData[i].question;
  optionsText.innerHTML =  `
  <button>${quizData[i].options[0]}</button>
  <button>${quizData[i].options[1]}</button>
  <button>${quizData[i].options[2]}</button>`
  }

//function loadQuestion(){
//  const current = quizData[currentQuestion]
// questionEL.innerText = current.question

//  current.options.forEach(el => {
//    const li = document.createElement("li")
//    li.innerText = el
//    optionsEL.appendChild(li)
//  })

//}  
//loadQuestion()