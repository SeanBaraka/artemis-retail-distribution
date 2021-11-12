import express from 'express';
import morgan from 'morgan';
import indexRouter from './controller/index.controller.js';
import cors from 'cors'
import { Server } from 'socket.io';
import http from 'http'



var app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

const httpserver = http.createServer(app)
const io = new Server(httpserver);

function socketMiddleware(request, response, next) {
    request.io = io
    next();
}

app.use(socketMiddleware);
app.use('/payments', indexRouter)

const PORT = process.env.PORT || 3098
httpserver.listen(PORT, () => {
    io.on('connection', (socket)=> {
        console.log('a new user has connected', socket.id)
    })
    console.log(`payments server started at http://localhost:${PORT}`);
})

