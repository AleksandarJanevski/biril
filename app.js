const express = require('express');
const mongoose = require('mongoose');
const location = require('./const/database');
const bereal = require('./controllers/BeRealController');
const view = require('./controllers/viewController');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'))

mongoose.connect(location.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Successfull Connection to Database'))
    .catch(() => console.log('Error Connecting to Database'));

app.get('/api/v1/feed', bereal.getAll);
app.get('/api/v1/feed:id', bereal.getOne);
app.patch('/api/v1/feed:id', bereal.updateUser);
app.post('/api/v1/feed:id', bereal.createUser);
app.delete('/api/v1/feed', bereal.deleteUser);
app.get('/form', view.getForm);
app.post('/form', view.createUser);
app.get('/feed', view.getView);
app.get('/feed/:id', view.getOneView);
app.post('/feed', view.postComment);
app.post('/feed/delete/:id', view.deleteUser);
app.post('/feed/:id/:comment', view.deleteComment);
app.post('/feed/:id', view.updateUser);
app.post('/feed', view.sortView);


app.listen(location.port, err => {
    if (err) console.log(err);
    console.log('Service Successfully started on port ' + location.port);
});
