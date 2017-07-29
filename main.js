var EPS = 0.001;
var SIZE = 100;
var PLAYER_SIZE = 20;
	
var data = [
	[0, 0, 0, 1, 1, 0],
	[0, 1, 0, 1, 1, 1],
	[0, 0, 0, 0, 0, 0],
	[0, 1, 1, 0, 1, 1],
	[0, 0, 0, 1, 1, 0],
	[0, 1, 1, 1, 1, 0]
];

var pos = {
	x:0.5,
	y:0.5
};

var resolve = function(){
	var isFull = function(i, j){
		if(i < 0 || i >= 6 || j < 0 || j >= 6){
			return true;
		}
		return (data[i][j] === 1);
	};
	var tileI = Math.floor(pos.y);
	var tileJ = Math.floor(pos.x);
	var dx = pos.x*SIZE - tileJ*SIZE;
	var dy = pos.y*SIZE - tileI*SIZE;
	var n, s, e, w, ne, nw, se, sw;
	n = isFull(tileI - 1, tileJ);
	s = isFull(tileI + 1, tileJ);
	w = isFull(tileI, tileJ - 1);
	e = isFull(tileI, tileJ + 1);
	nw = isFull(tileI - 1, tileJ - 1);
	ne = isFull(tileI - 1, tileJ + 1);
	sw = isFull(tileI + 1, tileJ - 1);
	se = isFull(tileI + 1, tileJ + 1);
	var left = 0, top = 0;
	if(dx >= SIZE - PLAYER_SIZE/2){
		left = 2;
	}
	else if(dx > PLAYER_SIZE/2){
		left = 1;
	}
	if(dy >= SIZE - PLAYER_SIZE/2){
		top = 2;
	}
	else if(dy > PLAYER_SIZE/2){
		top = 1;
	}
	if(top === 0 && left === 1 && n){
		//b
		dy = PLAYER_SIZE/2 + EPS;
	}
	else if(top === 1 && left === 2 && e){
		//e
		dx = SIZE - PLAYER_SIZE/2 - EPS;
	}
	else if(top === 2 && left === 1 && s){
		//h
		dy = SIZE - PLAYER_SIZE/2 - EPS;
	}
	else if(top === 1 && left === 0 && w){
		//d
		dx = PLAYER_SIZE/2 + EPS;
	}
	else if(top === 0 && left === 0){
		//a
		if((n && !nw && !w) || (n && nw && !w)){
			dy = PLAYER_SIZE/2 + EPS;
		}
		else if((!n && !nw && w) || (!n && nw && w)){
			dx = PLAYER_SIZE/2 + EPS;
		}
		else if((n && !nw && w) || (n && nw && w)){
			dy = PLAYER_SIZE/2 + EPS;
			dx = PLAYER_SIZE/2 + EPS;
		}
		else if(!n && nw && !w){
			if(dx >= dy){
				dx = PLAYER_SIZE/2 + EPS;
			}
			else{
				dy = PLAYER_SIZE/2 + EPS;
			}
		}
	}
	else if(top === 0 && left === 2){
		//c
		if((n && !ne && !e) || (n && ne && !e)){
			dy = PLAYER_SIZE/2 + EPS;
		}
		else if((!n && !ne && e) || (!n && ne && e)){
			dx = SIZE - PLAYER_SIZE/2 - EPS;
		}
		else if((n && !ne && e) || (n && ne && e)){
			dy = PLAYER_SIZE/2 + EPS;
			dx = SIZE - PLAYER_SIZE/2 - EPS;
		}
		else if(!n && ne && !e){
			if(dx + dy >= SIZE){
				dx = SIZE - PLAYER_SIZE/2 - EPS;
			}
			else{
				dy = PLAYER_SIZE/2 + EPS;
			}
		}
	}
	else if(top === 2 && left === 0){
		//g
		if((s && !sw && !w) || (s && sw && !w)){
			dy = SIZE - PLAYER_SIZE/2 - EPS;
		}
		else if((!s && !sw && w) || (!s && sw && w)){
			dx = PLAYER_SIZE/2 + EPS;
		}
		else if((s && !sw && w) || (s && sw && w)){
			dy = SIZE - PLAYER_SIZE/2 - EPS;
			dx = PLAYER_SIZE/2 + EPS;
		}
		else if(!s && sw && !w){
			if(dx + dy <= SIZE){
				dx = PLAYER_SIZE/2 + EPS;
			}
			else{
				dy = SIZE - PLAYER_SIZE/2 - EPS;
			}
		}
	}
	else if(top === 2 && left === 2){
		//i
		if((s && !se && !e) || (s && se && !e)){
			dy = SIZE - PLAYER_SIZE/2 - EPS;
		}
		else if((!s && !se && e) || (!s && se && e)){
			dx = SIZE - PLAYER_SIZE/2 - EPS;
		}
		else if((s && !se && e) || (s && se && e)){
			dy = SIZE - PLAYER_SIZE/2 - EPS;
			dx = SIZE - PLAYER_SIZE/2 - EPS;
		}
		else if(!s && se && !e){
			if(dx <= dy){
				dx = SIZE - PLAYER_SIZE/2 - EPS;
			}
			else{
				dy = SIZE - PLAYER_SIZE/2 - EPS;
			}
		}
	}
	pos.x = (dx + tileJ*SIZE)/SIZE;
	pos.y = (dy + tileI*SIZE)/SIZE;
};

var init = function(){
	var left = function(){
		pos.x -= 0.075;
		resolve();
	};
	var right = function(){
		pos.x += 0.075;
		resolve();
	};
	var up = function(){
		pos.y -= 0.075;
		resolve();
	};
	var down = function(){
		pos.y += 0.075;
		resolve();
	};
	$("#left").on("click", left);
	$("#right").on("click", right);
	$("#up").on("click", up);
	$("#down").on("click", down);
	
	var $canvas = $("#gameCanvas"); 
	var canvas = $canvas.get(0);
	var ctx = canvas.getContext("2d");
	var renderCanvas = function(){
		ctx.clearRect(0,0,600,600);
		for(var i = 0; i < 6; i++){
			for(var j = 0; j < 6; j++){
				var clr;
				if(data[i][j] === 0){
					clr = "#bbb";
				}
				else{
					clr = "#966";
				}
				ctx.fillStyle = clr;
				ctx.fillRect(j*SIZE, i*SIZE, SIZE, SIZE);
			}	
		}
		ctx.fillStyle = "green";
		ctx.fillRect(pos.x*100 - PLAYER_SIZE/2, pos.y*100 - PLAYER_SIZE/2, PLAYER_SIZE, PLAYER_SIZE);
	};
	function render() {
		renderCanvas();
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
};
$(document).ready(init);