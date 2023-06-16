let express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
let app = express();
let port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(multer().array());
app.use(express.static('public'));
app.listen(port);

console.log('RESTful API server started on: ' + port);

// Quiz

app.get('/quiz', (req, res) => {
    data = require('./data/quiz.json');
    res.json(data);
});

app.get('/quiz/:quizName', (req, res) => {
    data = require('./data/quiz.json');
    let quizName = req.params.quizName;
    data.forEach(quiz => {
        if(quiz.quizName == quizName) res.json(quiz);
    })
})

app.post('/quiz', (req, res) => {
    res.json("Add new quiz successfully!");
});

app.post('/:quizName/questions', (req, res) => {
    res.json('Add questions to quiz successfully');
})

// Category

app.get('/categories', (req, res) => {
    data = require('./data/category.json');
    res.json(data);
});

app.post('/category', (req, res) => {
    res.json("Add new category successfully!"); 
 });

 // Question

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

app.post('/questions', (req, res) => {
    res.json("Add new question successfully!");
});

app.put('/question', (req, res) => {
    res.json("Change question successfully!");
});

// Import 

app.post('/import', (req, res) => {
    let message = {
        "type": "success",
        "message": "Upload successfully!"
    };
    res.json(message);
})
