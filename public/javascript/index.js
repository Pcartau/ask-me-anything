let question = document.getElementById('question');
let askButton = document.getElementById('askButton');
let newAnswer = document.getElementById('newAnswer');
let newAnswerButton = document.getElementById('confirmAnswer');
let answerText = document.getElementById('answer');


async function checkValue (question) {    
    const rawResponse = await fetch('/sendQuestion', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({question: question})
    });
    const response = await rawResponse.json();
    return (response);
};

async function createQuestion (question, answer) {    
    const rawResponse = await fetch('/createQuestion', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: question,
            answer: answer
        })
    });
    const response = await rawResponse.json();
    return (response);
};

askButton.addEventListener("click", async () => {
    let answer = await checkValue(question.value);
    if (answer) {
        answerText.innerText = answer;
        newAnswer.style.display = "none";
        newAnswerButton.style.display = "none";
    } else {
        answerText.innerText = "No answer found ! You can provide an answer to the question";
        newAnswer.style.display = "flex";
        newAnswerButton.style.display = "flex";
    }
});

newAnswerButton.addEventListener("click", async () => {
    await createQuestion(question.value, newAnswer.value);
    newAnswer.style.display = "none";
    newAnswerButton.style.display = "none";
    answerText.innerText = "Answer added with success !"
});