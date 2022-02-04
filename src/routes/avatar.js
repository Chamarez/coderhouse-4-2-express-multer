const express = require("express");
const avatarRoutes = express.Router();
const multer = require("multer");
const accountStorage = require("./account.service")

const app = express();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/home/michel/Documents/coderhouse/coderhouse-4-2-express-multer/src/routes/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +'.jpg')
    }
  })
  

  var upload = multer({storage:storage})

  avatarRoutes.post('/profile/', upload.single('avatar'), function (req, res, next) {
      const file = req.file;
      const accountId = req.body.id

    if(!file || !accountId){
        const error = new Error("plase upload a file for a user")
        error.httpStatusCode = 400
        return next(error)
    }


    const accountService = new accountStorage();
    const userList = accountService.getAccountData();

    userList[accountId].file = file.path;

    accountService.saveAccountData(userList),
    res.send(file)

  })


module.exports = avatarRoutes;