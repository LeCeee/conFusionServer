const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('will send all the leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete((req,res,next) => {
    res.end('will delete all the leaders for you');
});


leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    res.end('will get the details of the leader : ' + req.params.leaderId + ' to you');
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('post operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req,res,next) => {
    res.write('updating the leader: '+ req.params.leaderId + '\n');
    res.end('will update the leader: ' + req.body.name + ' with details ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('will delete the leader : ' + req.params.leaderId + ' for you');
});


module.exports = leaderRouter;