var mongojs = require('mongojs');
var uri = "mongodb://localhost:27017/mongod";
var db = mongojs.connect(uri,["Prayer"]);
var express = require('express');
var gpio =  require('onoff').Gpio;
var usonic = require('r-pi-usonic');
var app = express();
var server = app.listen(8000);
var io = require('socket.io').listen(server);
var date = new Date();
var R2=["00","01","00","11","10",
			"11","10","00","01","00",
			"11","10","11","10"];
var R3=["00","01","00","11","10",
			"11","10","00","01","00",
			"11","10","11","10","00",
			"01","00","11","10",
			"11","10"];
var R4=["00","01","00","11","10",
			"11","10","00","01","00",
			"11","10","11","10","00",
			"01","00","11","10",
			"11","10","00","01","00",
			"11","10","11","10"];

var check=[];
var p;
var time;
var moves;
var count=0;

var starts = 0;
app.use(express.static(__dirname));

app.get('/', function (req, res){
	res.sendfile('./index.html');
});

app.get('/history', function (req, res){
	res.sendfile('./history.html');
});

io.on('connection',function(socket){

	socket.on("start", function (start) {
		starts = 1;

        var old = null;
        var neW = null;
		var i = 0;
			p = start;
			time = date.toString().substring(0,date.toString().indexOf("GMT"));
			moves = new Array();
	setInterval(function(){
	if(starts){

	var CC =  new gpio(22, 'in', 'both');
	var RF =  new gpio(07, 'in', 'both');
	var RC =  new gpio(08, 'in', 'both');
	var RB =  new gpio(25, 'in', 'both');
	var LF =  new gpio(24, 'in', 'both');
	var LC =  new gpio(23, 'in', 'both');
	var LB =  new gpio(18, 'in', 'both');

	var R_sensor;

	var sensor = usonic.createSensor(14, 15, 1000);	
 
	R_sensor = sensor().toFixed(2);

	if (RF.readSync() ||  LF.readSync()  || CC.readSync() )
		neW = '11';
	else if (RC.readSync() || LC.readSync())
		neW = '10';
	else 
	{
		if ( R_sensor < 110 && R_sensor < 1000)
			neW = '01';
		else if ((LB.readSync() || RB.readSync()) && R_sensor < 1000)
			neW = '00';
	}

	
		if(neW == old)
		{

		}else if(neW != null )
		{
			moves[i] = neW;
			if(moves[i] == "00")
				io.emit('moves',"Stand" + "\n");
			else if(moves[i] == "01")
				io.emit('moves',"Bow" + "\n");
			else if(moves[i] == "10")
				io.emit('moves',"Sit" + "\n");
			else if(moves[i] == "11")
				io.emit('moves',"Kneel" + "\n");
			i++;
			old = neW;
		}

	}}, 1000);
			
	});

	socket.on("stop", function (stop) {
        starts = 0;
        if(moves.length != 0)
        {
        	db = mongojs.connect(uri,["Prayer"]);
        	db.Prayer.insert({"P":p.toString(),"Time":time.toString(),"Moves":moves});
        	if (p==1)
        	check=R2;
        	else if (p==3)
        	check=R3;
        	else 
        	check =R4;

        	if (moves.length == check.length){
        	for (var j=0;j<check.length;j++){
        		if (moves[j]==check[j]){
        	       console.log('OK');
        	       count++;
        	   }
        	   else {
        	   	console.log('Incorrect Prayer');
        	   	break;
        	   }	 
			}

		if (count ==check.length)
		{	
			if( p == "1")
			io.emit('moves',"### note : Your Prayer is Fajar and it's correct " + "\n");
		else if ( p == "2")
			io.emit('moves',"### note : Your Prayer is Duhar and it's correct " + "\n");
		else if ( p == "3")
			io.emit('moves',"### note : Your Prayer is Asar and it's correct " + "\n");
		else if ( p == "4")
			io.emit('moves',"### note : Your Prayer is Mughrab and it's correct " + "\n");
		else if ( p == "5")
			io.emit('moves',"### note : Your Prayer is Asha and it's correct " + "\n");
		
		}

			else{
				if( p == "1")
			io.emit('moves',"### note : Your Prayer is Fajar and it's incorrect " + "\n");
		else if ( p == "2")
			io.emit('moves',"### note : Your Prayer is Duhar and it's incorrect " + "\n");
		else if ( p == "3")
			io.emit('moves',"### note : Your Prayer is Asar and it's incorrect " + "\n");
		else if ( p == "4")
			io.emit('moves',"### note : Your Prayer is Mughrab and it's incorrect " + "\n");
		else if ( p == "5")
			io.emit('moves',"### note : Your Prayer is Asha and it's incorrect " + "\n");
	}
	}
        	else{
        					if( p == "1")
			io.emit('moves',"### note : Your Prayer is Fajar and it's incorrect " + "\n");
		else if ( p == "2")
			io.emit('moves',"### note : Your Prayer is Duhar and it's incorrect " + "\n");
		else if ( p == "3")
			io.emit('moves',"### note : Your Prayer is Asar and it's incorrect " + "\n");
		else if ( p == "4")
			io.emit('moves',"### note : Your Prayer is Mughrab and it's incorrect " + "\n");
		else if ( p == "5")
			io.emit('moves',"### note : Your Prayer is Asha and it's incorrect " + "\n");

        	}

        	 
        	db.close();
        }
   });

socket.on("startHistory", function (startHistory){
	var test;
	db = mongojs.connect(uri,["Prayer"]);
	db.Prayer.find({}, function(err, result){
		test = JSON.stringify(result);
		var t1;
		var t2;
		
		while(test.length > 10){
		
		t1 = test.substring(test.indexOf(":"),test.indexOf("_")-2);

		test = test.substring(t1.length);

		t2 = t1.substring(2,3);

		if( t2 == "1")
			 io.emit('history', "Prayer: Fajar.\n");
		else if ( t2 == "2")
			io.emit('history', "Prayer: Duhar.\n");
		else if ( t2 == "3")
			io.emit('history', "Prayer: Asar.\n");
		else if ( t2 == "4")
			io.emit('history', "Prayer: Mughrab.\n");
		else if ( t2 == "5")
			io.emit('history', "Prayer: Asha.\n");

		t1 = t1.substring(t1.indexOf(","));
		t2 = t1.substring(2,t1.indexOf("\","));
		io.emit('history',t2 + "\n");

		t1 = t1.substring(t1.indexOf("\","));
		t1 = t1.substring(3);
		io.emit('history',t1 + "\n");

		test = test.substring(test.indexOf("}"));
		io.emit('history',"-----------------------------------------");
		}
	db.close();
 });
	});
});

console.log('Server running at port 8000');