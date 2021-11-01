import express from 'express';
import morgan from 'morgan';
import indexRouter from './controller/index.controller.js';

var app = express();
app.use(morgan("dev"));
app.use(express.json())

app.use('/payments', indexRouter)

const PORT = process.env.PORT || 3098
app.listen(PORT, () => {
    console.log(`payments server started at http://localhost:${PORT}`);
})

