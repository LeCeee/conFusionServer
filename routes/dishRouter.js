const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    res.end('will delete all the dishes for you');
});


dishRouter.route('/:dishId')
.get((req,res,next) => {
    res.end('will get the details of the dish : ' + req.params.dishId + ' to you');
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('post operation not supported on /dishes/'+ req.params.dishId);
})
.put((req,res,next) => {
    res.write('updating the dish: '+ req.params.dishId + '\n');
    res.end('will update the dish: ' + req.body.name + ' with details ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('will delete the dish : ' + req.params.dishId + ' for you');
});


module.exports = dishRouter;