var express = require('express');
var api = express.Router();
var mongo = require('mongodb');
api.get('/',(req,res)=>{});
api.get('/:id',(req,res)=>{});
api.post('/',(req,res)=>{
	var body;
	req
	.on('data', (chunk) => {
  		body+=chunk;
  	})
  	.on('end', () => {
  		body = Buffer.concat(body).toString();
  		console.log(body);
  	});
});
api.put('/:id',(req,res)=>{});
api.delete('/:id',(req,res)=>{});

module.exports = api;