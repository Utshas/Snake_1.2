//settings

var snakeX = 2;
var snakeY = 2;
var height = 20;
var width = 20;
var interval = 100;
//
var tailX = [snakeX];
var tailY = [snakeY];
var fx;
var fy;
var fbx;
var fby;
var running = false;
var gameOver = false;
var direction = -3; //up = 0 down = -1, left = 1, right=2
var ini;
var score = 0;
var increment = 1;
var timeBonus=rand(5, 8);
/**
entry point of the game
*/
function run(){

	init();

	ini = setInterval(gameLoop, interval);
}
function init()
{
	createMap();
	createSnake();
	createFruite();
}

function createMap(){

	document.write("<table>");

	for(var y=0; y<=height; y++)
	{
		document.write("<tr>");
			for(var x=0; x<=width; x++)
			{
				if(x==width || x==0 || y==0 || y==height){
					document.write("<td class='wall' id='"+x+"-"+y+"'></td>");
				}
				else{
					document.write("<td class='blank' id='"+x+"-"+y+"'></td>");
				}

			}
		document.write("</tr>");
	}
	document.write("</table>");
}
function createSnake(){
	set(snakeX,snakeY,"snake");
}
function rand(min, max)
{
	return Math.floor(Math.random()*(max-min)+min);
}
function getType(x,y)
{
	return get(x,y).getAttribute("class");
}
function createFruite(){
	var found = false;
	while(!found){
		var fruitX = rand(1, width-1);
		var fruitY = rand(1, height-1);
		if(getType(fruitX, fruitY) == "blank")
			found=true;
	}
	set(fruitX, fruitY, "fruit");
	fx=(fruitX);
	fy=(fruitY);
	timeBonus--;
	if(timeBonus == 0)
	{
		createBonusFruite();
		setTimeout(destroyBonus, 4500);
	}
}
function createBonusFruite(){
	var foundBonus = false;
	while(!foundBonus){
		var fruitBonusX = rand(1, width-1);
		var fruitBonusY = rand(1, height-1);
		if(getType(fruitBonusX, fruitBonusY) == "blank")
			foundBonus=true;
	}
	set(fruitBonusX, fruitBonusY, "fruitBonus");
	fbx=(fruitBonusX);
	fby=(fruitBonusY);
	timeBonus=rand(6, 11);
}
window.addEventListener("keypress",function key(){
	var key = event.keyCode;
	if(direction != -1 && (key == 119 || key ==87))
		direction = 0;
	else if(direction != 0 && (key == 115 || key == 83))
	{
		direction =-1;
	}
	else if(direction != 2 && (key == 97 || key == 65))
	{
		direction = 1;
	}
	else if(direction != 1 && (key == 100 || key ==68))
	{
		direction = 2;
	}
	if(!running)
		running = true;
	else if(key == 32)
		running = false;

});

function gameLoop()
{
	if(running && !gameOver)
	{
		update();
	}
	else if(gameOver)
	{
		clearInterval(ini);
	}
} 

function update()
{
	set(fx, fy, "fruit");
		updateTail();
	set(tailX[length], tailY[length], "blank");

		if(direction == 0)
			snakeY--;
		else if (direction == -1)
			snakeY++;
		else if (direction == 1)
			snakeX--;
		else if(direction == 2)
			snakeX++;
		set(snakeX, snakeY, "snake");
		for(var i = tailX.length-1; i>=0; i--)
		{
			if(snakeX == tailX[i] && snakeY == tailY[i])
			{
				gameOver=true;
				alert("score: "+score);
		
				break;
			}
		}
		if(snakeX == fx && snakeY == fy)
		{
			createFruite();
			length+=increment;
			score+=increment;
			document.getElementById("score").innerHTML="Score: "+score;
		}

		if(snakeX == fbx && snakeY == fby)
		{	
			set(fbx, fby, "snake");
			fbx=100;
			fby=100;
			length+=increment;
			score+=5;
			document.getElementById("score").innerHTML="Score: "+score;
		}

		if(snakeX == 0 || snakeY == 0 || snakeX == width || snakeY == height)
		{
			gameOver = true;
			alert("score: "+score);
		}
}

function destroyBonus()
{
	if(fbx!=100)
	{
		set(fbx, fby, "blank");
		fbx=100;
		fby=100;
	}
}

function updateTail()
{
	for(var i = length; i>0; i--)
	{
		tailX[i] = tailX[i-1];
		tailY[i] = tailY[i-1];
	}
	tailX[0] = snakeX;
	tailY[0] = snakeY;

}
function get(x,y)
{
	return document.getElementById(x+"-"+y);
}
function set(x,y,value)
{
	get(x,y).setAttribute("class",value);
}
run();