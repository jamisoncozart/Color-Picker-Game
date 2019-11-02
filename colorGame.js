var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			if(this.textContent === "Easy"){
				numSquares = 3;
			} else if(this.textContent === "Medium"){
				numSquares = 6;
			} else {
				numSquares = 9;
			}
			//short-from of if/else statement
			this.textContent === "Easy" ? numSquares = 3: 
			this.textContent === "Medium" ? numSquares = 6: numSquares = 9;
			reset();
		})
	}
	for(var i = 0; i < squares.length; i++){
		//Add click listeners to squares
		squares[i].addEventListener("click", function(){
			//Grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to picked Color
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?";
			}
			else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!"
			}
		});
	};
	reset();
}

function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color form array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares on page
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	};
	//clear message
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = "steelBlue";
}

resetButton.addEventListener("click", function(){
	//generate all new colors
	reset();

})

colorDisplay.textContent = pickedColor;

function changeColors(color){
	//loop through all squares
	for(var i = 0; i < colors.length; i++){
		//change each color to match correct color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into array
		arr.push(randomColor());
	}
	//return array
	return arr;
}

function randomColor() {
	//pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}