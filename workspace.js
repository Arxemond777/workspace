var express = require('express');

/*
 * Сервер
 *
 */
var app = express();

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => console.log(`Server runing in port ${app.get('port')}`));

// Прокидываем static
app.use(express.static(__dirname + '/web/public'));

// Routing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/web/public/html/index.html');
});

// 404
app.use((req, res) => {
    res.status(404);
    res.send('404');
});

// 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.send('500');
});