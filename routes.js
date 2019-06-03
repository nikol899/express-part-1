"use strict"
const express = require("express");
const cartitems = require("./cart-items");
const  items= express.Router();

items.get("/cartitems",(req,res)=>{
res.json(cartitems);
});

items.post("/cartitems",(req,res)=>{
    console.log(req.body);
    cartitems.push(req.body);
    res.json(cartitems);
});

items.put("/cartitems/:id",(req,res)=>{
    console.log(req.body);
    console.log(req.params.id);
    cartitems.splice(cartitems.findIndex(element=>element.id === req.params.id),1,req.body);
    res.json(cartitems);
});
items.delete("/cartitems/:id",(req,res)=>{
    console.log(req.params.id);
    cartitems.splice(cartitems.findIndex(element=>element.id ===req.params.id),1);
    res.json(cartitems);
})
module.exports= items;