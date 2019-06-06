"use strict"
const express = require("express");
// const cartitems = require("./cart-items");
const  items= express.Router();
const pool = require("./connection");

function selectTable(res){
    pool.query("select * from shopping_cart order by id").then(result=>res.json(result.rows));
}
//display
items.get("/cartitems",(req,res)=>{
// res.json(cartitems);
selectTable(res);
});
//insert
items.post("/cartitems",(req,res)=>{
    // console.log(req.body);
    // cartitems.push(req.body);
    // res.json(cartitems);
pool.query("insert into shopping_cart (product,price,quantity)values($1::text,$2::int,$3::int)",
    [req.body.product,
    req.body.price,
    req.body.quantity]).then(()=>{
        selectTable(res);
    });
});
//update
items.put("/cartitems/:id",(req,res)=>{
    console.log(req.param.id);
    // console.log(req.body);
    // console.log(req.params.id);
    // cartitems.splice(cartitems.findIndex(element=>element.id === req.params.id),1,req.body);
    // res.json(cartitems);
    pool.query("update shopping_cart set product=$1::text,price =$2::int,quantity=$3::int where id=$4::int",
        [req.body.product,
        req.body.price,
        req.body.quantity,
        Number(req.params.id)
    ]).then(()=>{
        selectTable(res);
    });
});
//delete
items.delete("/cartitems/:id",(req,res)=>{
    // console.log(req.params.id);
    // cartitems.splice(cartitems.findIndex(element=>element.id ===req.params.id),1);
    // res.json(cartitems);
    pool.query("delete from shopping_cart where id=$1::int",[Number(req.params.id)]).then(() =>{
        selectTable(res);
    })
})
module.exports= items;