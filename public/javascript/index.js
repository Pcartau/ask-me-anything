let question = document.getElementById('question');
let askButton = document.getElementById('askButton');
let newAnswer = document.getElementById('newAnswer');
let newAnswerButton = document.getElementById('confirmAnswer');
let answerText = document.getElementById('answer');

async function sendQA(question, answer, route) {
    const rawResponse = await fetch(route, {
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
    let answer = await sendQA(question.value, undefined, '/sendQuestion');
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
    await sendQA(question.value, newAnswer.value, '/createQuestion');
    newAnswer.style.display = "none";
    newAnswerButton.style.display = "none";
    answerText.innerText = "Answer added with success !"
});