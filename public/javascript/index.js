let DOM = {
    question : document.getElementById('question'),
    askButton : document.getElementById('askButton'),
    newAnswer : document.getElementById('newAnswer'),
    newAnswerButton : document.getElementById('confirmAnswer'),
    answerText : document.getElementById('answer')
};

function sendQA(question, answer, route) {
    return rawResponse = fetch(route, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: question,
            answer: answer
        })
    })
    .then(response => response.json());
};

askButton.addEventListener("click", () => {
    sendQA(question.value, undefined, '/sendQuestion')
    .then(answer => {
        DOM.answerText.innerText = answer ? answer : "No answer found ! You can provide an answer to the question";
        DOM.newAnswer.style.display = answer ? "none" : "flex";
        DOM.newAnswerButton.style.display = answer ? "none" : "flex";
    })
});

DOM.newAnswerButton.addEventListener("click", async () => {
    await sendQA(question.value, newAnswer.value, '/createQuestion');
    DOM.newAnswer.style.display = "none";
    DOM.newAnswerButton.style.display = "none";
    DOM.answerText.innerText = "Answer added with success !"
});