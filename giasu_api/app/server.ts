import * as express from 'express';
import * as bodyParser from "body-parser";
import {createConnection, Connection} from "typeorm";

createConnection().catch(e => console.log(e)).then((e) =>{
	const app = express();
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader('Access-Control-Allow-Credentials','true');
        next();
    });
	app.get("/", (req, res)=>{
		res.send("sssssss")
	})
	const subjectRouter = require("./router/SubjectRouter");
	const tutorRouter = require("./router/TutorRouter");
	const classInfoRouter = require("./router/ClassInfoRouter");
	const tutorLoginRouter = require("./router/TutorLoginRouter");
	const userRouter = require("./router/UserRouter");
	const classUserRouter = require("./router/ClassUserRouter");
	const classTutorRouter = require("./router/ClassTutorRouter")
	app.use('/subject', subjectRouter);
	app.use('/tutor', tutorRouter);
	app.use('/class-info', classInfoRouter);
	app.use('/tutor-login',tutorLoginRouter);
	app.use('/user',userRouter); 
	app.use('/class-user', classUserRouter);
	app.use('/class-tutor', classTutorRouter);
	app.listen('8081', ()=>{
		console.log('hello')
	})
});

