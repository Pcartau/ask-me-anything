const questionAnswer = require(`${process.env.PWD}/src/dbModel.js`);

async function createQuestion(question, answer) {
    let checker = await questionAnswer.findOne({question: question});
    if (!checker) {
        var newQuestionAnswer = new questionAnswer({
            question: question,
            answer: answer
        });
        return newQuestionAnswer.save((err) => {
            if (err) return console.error(err);
        });
    } else {
        return ;
    }
}

async function findQuestion(question) {
    let answer = await questionAnswer.findOne({question: question});
    if (answer) {
        return answer.answer;
    } else {
        return "";
    }
}

module.exports = function(app) {

    app.get('/', (req, res) => {
      res.sendFile(`${process.env.PWD}/views/index.html`);
    });

    app.post('/sendQuestion', async (req, res) => {
        let question = req.body.question.replace("?", '').trim().toLowerCase().replace(/\s\s+/g, ' ').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let answer = await findQuestion(question);
        res.json(answer);
    });

    app.post('/createQuestion', async(req, res) => {
        let question = req.body.question.replace("?", '').trim().toLowerCase().replace(/\s\s+/g, ' ').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        await createQuestion(question, req.body.answer);
        res.json("Answer added with sucess !");
    })
}
