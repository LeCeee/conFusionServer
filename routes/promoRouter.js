const express = require('express');
const bodyparser = require('body-parser');
const Promotions = require('../model/prmotions');
const promotionsRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

promotionsRouter.use(bodyparser.json());

promotionsRouter.route('/')
.options(cors.corsWithOptions,(req,res) => { res.sendStatus(200)})

.get(cors.cors,(req,res,next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('promotion Created',promotion);        
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);  
    },(err) => next(err))
    .catch( (err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('put method not supported');
})
.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) =>{
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promotionsRouter.route('/:promoId')
.options(cors.corsWithOptions,(req,res) => { res.sendStatus(200)})

.get(cors.cors,(req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('POST method not supported ');
})
.put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set: req.body
    },{new :true})
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) =>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promotionsRouter;