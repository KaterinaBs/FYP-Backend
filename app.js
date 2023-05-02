// Imports-------------------------------
import express from 'express';
import cors from 'cors';
import homeworkRouter from './routers/homework-router.js';
import assignmentsRouter from './routers/assignments-router.js'
import modulesRouter from './routers/modules-router.js';
import announcementsRouter from'./routers/announcements-router.js';
import teachersRouter from './routers/users-router.js';

//Configure express app------------------
const app = new express();
//Confgure middleware--------------------
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/homework',homeworkRouter)
app.use('/api/assignments',assignmentsRouter)
app.use('/api/modules',modulesRouter)
app.use('/api/announcements',announcementsRouter)
app.use('/api/teachers',teachersRouter)
//Start server---------------------------
const PORT = process.env.PORT || 5000;//define port variable if process.env.PORT is not set use 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));// ask server to start running 



