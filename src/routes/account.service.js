const fs =  require("fs");

class accountStorage{

    dataPath = "/home/michel/Documents/coderhouse/coderhouse-4-2-express-multer/src/routes/account.json"

    saveAccountData(data){
        const stringifyData = JSON.stringify(data);
        fs.writeFileSync(this.dataPath, stringifyData);
    }

    getAccountData(){
        const jsonData = fs.readFileSync(this.dataPath);
        return JSON.parse(jsonData)
    }



}

module.exports = accountStorage;