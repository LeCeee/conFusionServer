const express = require('express');
const bodyparser = require('body-parser');
const Promotions = require('../model/prmotions');
const promotionsRouter = express.Router();
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
.post((req,res,next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('promotion Created',promotion);        
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);  
    },(err) => next(err))
    .catch( (err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('put method not supported');
})
.delete((req,res,next) =>{
    res.end('deleting all the promotions');
});

promotionsRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('getting promotions: ' + req.params.promoId);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST method not supported ');
})
.put((req,res,next) => {
    res.write('updating promotion: '+ req.params.promoId)
    res.end(' with details -> name: ' + req.body.name + ' descriptions: ' + req.body.description);
})
.delete((req,res,next) =>{
    res.end('deleting the promotions:' + req.params.promoId);
});

module.exports = promotionsRouter;