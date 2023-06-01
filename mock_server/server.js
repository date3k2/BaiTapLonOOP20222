let express = require('express');
let cors = require('cors')
let app = express();
let port = process.env.PORT || 4000;

app.use(cors())
app.listen(port);

console.log('RESTful API server started on: ' + port);

app.get('/quiz', (req, res) => {
    data = require('./data/quiz.json');
    res.json(data);
});

app.get('/categories', (req, res) => {
    data = require('./data/category.json');
    res.json(data);
});

app.get('/questions', (req, res) => {
    let category = req.query.category;
    data = require('./data/questions.json')[category];
    res.json(data);
});

app.get('/question', (req, res) => {
    let questionId = req.query.questionID;
    let data = require('./data/questions.json');
    data['Kỹ thuật lập trình'].forEach(item => {
        if(item.id == questionId) res.json(item)
    })
    data['Mạng máy tính'].forEach(item => {
        if(item.id == questionId) res.json(item)
    })
    data['Tin học đại cương'].forEach(item => {
        if(item.id == questionId) res.json(item)
    })
    // res.json(data)
})

app.post('/import', (req, res) => {
    let message = {
        "type": "success",
        "message": "Upload successfully!"
    };
    res.json(message)
})

