const express = require('express');
const bodyparser = require('body-parser');
const Promotions = require('../model/prmotions');
const promotionsRouter = express.Router();
const authenticate = require('../authenticate');
promotionsRouter.use(bodyparser.json());

promotionsRouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('promotion Created',promotion);        
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);  
    },(err) => next(err))
    .catch( (err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('put method not supported');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) =>{
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

promotionsRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('POST method not supported ');
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
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
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) =>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promotionsRouter;