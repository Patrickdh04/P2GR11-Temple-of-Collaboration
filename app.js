var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var puzzle1Router = require('./routes/puzzle1');
var puzzle2Router = require('./routes/puzzle2');
var puzzle3Router = require('./routes/puzzle3');

var app = express();
var http = require('http');
var server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/puzzle1', puzzle1Router);
app.use('/puzzle2', puzzle2Router);
app.use('/puzzle3', puzzle3Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

/* Hvis man ikke kan få nodemon command - npm run dev, til at virke: 
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});*/

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('puzzleSolved', () => {
    console.log('Puzzle solved!');
    socket.broadcast.emit('forwardToPuzzle3');
  });

  socket.on('refreshPage', () => {
    console.log('Player requested refresh');
    socket.broadcast.emit('refreshPage');
  });
});

module.exports = { app, server, io };
