import {user} from '../entities/user';
import {tutor_login} from '../entities/tutor_login';
import {admin} from '../entities/admin';
import * as bcrypt from "bcrypt";
var jwt = require('jsonwebtoken');
var config = require('../config/token');

export const MyUtil = {
    handleError: (error, res) => {
        res.send({ code: "error", message: error.message })
        res.end();
    },
    handleErrorFunction: (err) => { console.log("Error") },
    handleSuccess: (data, res) => {
        res.send({ code: "success", data: data ? data : {} })
    },
    getToken: (user: user) => {
        if (!user) {
            console.log("User is not existed!")
            return null;
        }
        var token = jwt.sign({ id: user.idUser }, config.secret, {
            expiresIn: config.expires // expires in 24 hours
        });
        return token;
    },
    getTokenAdmin: (admin: admin) => {
        if (!admin) {
            console.log("Admin is not existed!")
            return null;
        }
        var token = jwt.sign({ id: admin.idAdmin }, config.secret, {
            expiresIn: config.expires // expires in 24 hours
        });
        return token;
    },
    getTokenTutor: (tutor: tutor_login) => {
        if (!tutor) {
            console.log("Tutor is not existed!")
            return null;
        }
        var token = jwt.sign({ id: tutor.idTutorLogin }, config.secret, {
            expiresIn: config.expires // expires in 24 hours
        });
        return token;
    },
    getHashPass: (pass: string) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt)
        return hash
    },
    checkPass: (newPass: string, pass: string) => {
        var res = bcrypt.compareSync(newPass, pass) 
        return res;
    },
    getUserIdByToken: (token: string) => {
        var user_account_id = 0;
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    console.log(err.message)
                }
                else {
                    console.log(decoded)
                    user_account_id = decoded.id
                }
            });
        }
        return user_account_id;
    },
    getAdminIdByToken: (token: string) => {
        var user_account_id = 0;
        if (token) {
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    console.log(err.message)
                }
                else {
                    console.log(decoded)
                    user_account_id = decoded.id
                }
            });
        }
        return user_account_id;
    }
}