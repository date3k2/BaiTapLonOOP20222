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

app.get('/quiz/:quizId', (req, res) => {
    data = require('./data/quiz.json');
    let quizId = req.params.quizId;
    data.forEach(quiz => {
        if(quiz.quizId == quizId) res.json(quiz);
    })
})

app.post('/quiz', (req, res) => {
    res.json("Add new quiz successfully!");
});

app.put('/:quizId', (req, res) => {
    console.log(req.body);
    res.json('Add questions to quiz successfully');
})

// Category

app.get('/Categories', (req, res) => {
    data = require('./data/category.json');
    res.json(data);
});

app.post('/Categories', (req, res) => {
    res.json("Add new category successfully!"); 
 });

 // Question

app.get('/questions', (req, res) => {``
    let categoryId = req.query.categoryId;
    let data = require('./data/questions.json');
    if(categoryId == '1') return res.json(data['Kỹ thuật lập trình']);
    if(categoryId == '2') return res.json(data['Mạng máy tính']);
    if(categoryId == '3') return res.json(data['Tin học đại cương']);
});

app.get('/question', (req, res) => {
    let questionId = req.query.questionID;
    let data = require('./data/questions.json');
    data['Kỹ thuật lập trình'].forEach(item => {
        if(item.questionId == questionId) res.json(item)
    })
    data['Mạng máy tính'].forEach(item => {
        if(item.questionId == questionId) res.json(item)
    })
    data['Tin học đại cương'].forEach(item => {
        if(item.questionId == questionId) res.json(item)
    })
    // res.json(data)
})

app.post('/question', (req, res) => {
    res.json("Add new question successfully!");
});

app.put('/question', (req, res) => {
    res.json("Change question successfully!");
});

// Import 

app.post('/Questions/File', (req, res) => {
    console.log(req.body)
    let message = {
        "type": "success",
        "message": "Upload successfully!"
    };
    res.json(message);
})
