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
	const adminRouter = require("./router/AdminRouter");
	const userRouter = require("./router/UserRouter");
	const classUserRouter = require("./router/ClassUserRouter");
    const classTutorRouter = require("./router/ClassTutorRouter");
    const userShareClassRouter = require("./router/UserShareClassRouter");
    const paymentRouter = require("./router/PaymentRouter");
	app.use('/subject', subjectRouter);
	app.use('/tutor', tutorRouter);
	app.use('/class-info', classInfoRouter);
	app.use('/admin',adminRouter);
	app.use('/user',userRouter); 
	app.use('/class-user', classUserRouter);
    app.use('/class-tutor', classTutorRouter);
    app.use('/user-share', userShareClassRouter);
    app.use('/payment', paymentRouter);
	const multer = require('multer')
    const fs = require('fs')
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
    const upload = multer({
        storage: storage,
        limits: { fileSize: 10000000, files: 1 },
        fileFilter: (req, file, callback) => {
            var filename = file.originalname.toLowerCase();

            if (!filename.match(/\.(jpg|jpeg|png|webp  )$/)) {

                return callback(new Error('Only Images are allowed !'), false)
            }

            callback(null, true);
        }
    }).single('myImg')


    app.post('/upload', (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                res.status(400).json({ message: err.message })
            } else {
                if(req.file){
                    let path = `/uploads/${req.file.filename}`
                    path = "https://8081" + path
                    res.status(200).json({ message: 'Image Uploaded Successfully !', path: path })
                }else{
                    console.log("Lỗi")
                }
                
            }
        })
    })

    var serviceAccount = require("../firebase-adminsdk.json");
    var admin = require("firebase-admin")
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://datn-d7317.firebaseio.com"
    });
   
    app.post('/push', function (req, res, next) {
        
        var registerToken = "c4G70JnHUu4:APA91bGzzStCtQf-3wURaPze1L6CFcM--E3Jca00kcCm474OfuFdtnro-X7cSHvGBIGeKAoVAtt-7uaRnBfqS4mLeuKZA7OPfTxkzRkvkRNzgSNO-1R-JUoZX8bBEocFtzW_hlUzl4df";
        var payload = {
            notification: {
                title: "This is a Notification",
                body: "This is the body of the notification message."
            }
        };

        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
        // admin.messaging().sendToDevice(registerToken, payload, options)
        //     .then(function (response) {
        //         MyUtil.handleSuccess(response, res)
        //         })
        //     .catch(function (error) {
        //         MyUtil.handleError({message:"error"}, res)
        //     });

        admin.messaging().sendToTopic('test', payload, options).then(function (response) {
            return res.json({ message: 'Push Success!' });
          }).catch(function (error) {
            console.log("Error sending message:", error);
            return res.json({ message: 'Push Fail!' });
          })
    });
    var path = require("path");
    app.use("/uploads", express.static(path.join(__dirname, '../uploads')));
	app.listen('8081', ()=>{
		console.log('hello')
	})
	
});

