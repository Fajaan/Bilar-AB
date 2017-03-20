var express 	 = require('express'),
    bodyParser 	 = require('body-parser'),
    connection 	 = require('./connect'),
    mr 		 = require('./miniresto'),
    app		 = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*  #-----------------------------------#  *   *   *   *   *   *   * *                                
*    >>>>> Miniresto's Restful API <<<<<                             *
*       - a lightweight CRUD Module  -                               *
*   #-----------------------------------#                            *  
*                                                                    *
*    > Now with Full CRUD Support                                    *
*    > Full Compatible from Back-to-Frontend's                       *
*    > Simple to use with jQuery or with AngularJS                   *
*                                                                    *
*                                                                    *
*    Why use Miniresto?                                              *
*       ¬ Automatic loading of mongoose models                       *
*       ¬ Makes Boilerplating Easy with Existing DB's                *
*       ¬ Designed to setup Front-N-Backend fast & easy              *
*       ¬ Save,Get,Insert or Delete DB Documents "without" Querys    *
*       ¬ Spend time on other colmplex tasks                         *
*                                                                    *
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *  * */



app.get('/',function (req,res) {
    res.sendFile('./www/index.html', {'root': __dirname});
    console.log("welcome " + req.ip + " - " + new Date());
    // res.json("miniresto Demo App");
});

app.get('/:model',function (req,res) {
	return mr.find(req,res);
});

app.get('/:model/info',function (req,res) {
    return mr.showInfo(req,res);
})
app.get('/:model/:id',function (req,res) {
    return mr.findById(req,res);
});

app.get('/:model/index/:index',function (req,res) {
	return mr.findByIndex(req,res);
});

app.get('/:model/select/:item',function (req,res) {
	return mr.findSelected(req,res);
});

//
// New Crud Helper Functions
//

app.post('/:model',function (req,res) {
    return mr.save(req,res);
});

app.put('/:model/:id',function (req,res) {
    return mr.update(req,res);
});

app.delete('/:model/:id',function (req,res) {
    return mr.delete(req,res);
});


var port = 3000;
app.listen(port,function () {
	console.log("Server started on port","\x1b[32m", port,"\x1b[0m");	
	new connection('bilverkstadDB');
});
