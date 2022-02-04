const express = require("express");
const accountRoutes = express.Router();
const fs = require("fs");
const accountStorage = require("./account.service");
const accountService = new accountStorage();
const dataPath = accountService.dataPath;



accountRoutes.post("/account/add-account", (req, res)=>{
    const existAccounts = accountService.getAccountData();
    const newAccountId = Math.floor(Math.random()*9000);
    existAccounts[newAccountId]= req.body;
    accountService.saveAccountData(existAccounts)
    res.send({sucess:true, msg:"account added succesfully"})
})

accountRoutes.get("/account/list", (req, res)=>{
    const accounts = accountService.getAccountData();
    res.send(accounts)
})

accountRoutes.get("/account/by-id/", (req, res)=>{
    const accounts = accountService.getAccountData();
    console.log(accounts)
    fs.readFile(dataPath, 'utf-8', (err, data)=>{
        const accountId = req.body.id;
        res.send(accounts[accountId])
    },true);
})


accountRoutes.delete("/account/delete/:id", (req, res)=>{
    fs.readFile(dataPath, 'utf-8', (err, data)=>{
        const existAccounts = accountService.getAccountData();
        const userId = req.params["id"];
        delete existAccounts[userId];
        accountService.saveAccountData(existAccounts);

        res.send(`accounts with id ${userId} has been deleted`)
    },true);
})


accountRoutes.delete("/account/edit/:id", (req, res)=>{
    fs.readFile(dataPath, 'utf-8', (err, data)=>{
        const existAccounts = accountService.getAccountData();
        const userId = req.params["id"];
        existAccounts[userId] = req.body;
        accountService.saveAccountData(existAccounts);

        res.send(`accounts with id ${userId} has been edited`)
    },true);
})


module.exports = accountRoutes