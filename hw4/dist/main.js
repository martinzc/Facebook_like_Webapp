'use strict'

window.onload = function() {
	// Get canvas element and increase its resolution
	const canvas = document.getElementById('snakeCanvas');
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	// Add event listener to the button
	document.getElementById("start").onclick = function() {
		createApp(canvas);
	};
}

function createApp(canvas) {
	const context = canvas.getContext("2d");
	const width = canvas.width;
	const height = canvas.height;
	var timeInterval = 70;
	var squareSize = width / 50;
	var score;
	var time;
	var apple;
	var bomb;
	var bombLst;
	var snakeBodies;
	var direction;
	var interval;
	var globalInterval;
	var lastKeyTime = 0;
	addListeners();
	initApp();

	function initApp() {
		// Disable the button once the game starts
		document.getElementById("start").setAttribute('disabled', true)
		score = 0;
		time = 0;
		timeInterval = 70;
		apple = {x: 0, y: 0};
		bomb = {x: 0, y: 0};
		bombLst = [];
		snakeBodies = [];
		direction = 'right'
   	newSnake();
   	newObstacle(apple);
   	newObstacle(bomb);
   	bombLst.push(bomb);
		globalInterval = clearInterval(globalInterval);
		increaseInterval();
   	globalInterval = setInterval(increaseInterval, 10000)
	}

	function increaseInterval() {
		// Increase the difficulty every 10 seconds
		interval = clearInterval(interval);
		var newbomb = {x: 0, y: 0};
   	newObstacle(newbomb);
   	bombLst.push(newbomb);
		timeInterval -= 5
   	interval = setInterval(drawApp, timeInterval)
	}

	function addListeners() {
		// Add key and button event listeners
		document.addEventListener('keydown', checkKeyEvent, false);
		document.getElementById("left").onclick = function() {
			if (direction != 'right') {
				direction = 'left'; 
			}
		};
		document.getElementById("up").onclick = function() {
			if (direction != 'down') {
				direction = 'up'; 
			}
		};
		document.getElementById("right").onclick = function() {
			if (direction != 'left') {
				direction = 'right'; 
			}
		};
		document.getElementById("down").onclick = function() {
			if (direction != 'up') {
				direction = 'down'; 
			}
		};
	}

	function checkKeyEvent(key) {
		var codeKey = key.keyCode;
		// Disable the default key down event
		key.preventDefault();
		// Set time out to prevent user from clicking two buttons too fast
		if (((new Date()).getTime() - lastKeyTime) > timeInterval) {
			compareKey(codeKey)
			lastKeyTime = new Date().getTime();
		} else {
			setTimeout(function() {
				compareKey(codeKey);
			}, timeInterval*0.5);
			lastKeyTime = new Date().getTime();
		}
		function compareKey(code) {
			switch (code) {
				case 37: 
					if (direction != 'right') {
						direction = 'left'; 
					}
					break; //Left key
				case 38: 
					if (direction != 'down') {
						direction = 'up'; 
					}
					break; //Up key
				case 39:  
					if (direction != 'left') {
						direction = 'right'; 
					}
					break; //Right key
				case 40:  
					if (direction != 'up') {
						direction = 'down'; 
					}
					break; //Down key
				default: break; //Everything else
			}
		}
	}

   function drawApp() {
   	context.clearRect(0, 0, width, height)
   	if (moveSnake()) {
   		time += timeInterval / 1000;
	   	snakeBodies.forEach(function(body) {
	   		drawSnakeBody(body.x, body.y)
	   	})
	   	drawApple(apple.x, apple.y);
	   	bombLst.forEach(function(eachBomb) {
	   		drawBomb(eachBomb.x, eachBomb.y);
	   	})
	   	showScore();
   	}
	}

	function newSnake() {
		snakeBodies = []
		const initHeight = Math.floor((height / squareSize) / 2)
		snakeBodies.push({x: 5, y: initHeight});
		snakeBodies.push({x: 4, y: initHeight});
		snakeBodies.push({x: 3, y: initHeight});
		snakeBodies.push({x: 2, y: initHeight});
		snakeBodies.push({x: 1, y: initHeight});
		snakeBodies.push({x: 0, y: initHeight});
	}

	function newObstacle(obstacle) {
		obstacle.x = Math.floor(Math.random() * 50);
		obstacle.y = Math.floor(Math.random() * (height / squareSize));
		var collide = true;
		while (collide) {
			collide = checkCollideWithSnake(obstacle.x, obstacle.y);
			if (collide = false) {
				collide = checkCollideWithBomb(obstacle.x, obstacle.y);
			}
			if (apple.x == bomb.x && apple.y == bomb.y) {
				collide = true
			}
			if (collide) {
				obstacle.x = Math.floor(Math.random() * 50);
				obstacle.y = Math.floor(Math.random() * (height / squareSize))
			}
		}
	}

	function checkCollideWithSnake(x, y) {
		var collide = false;
		snakeBodies.forEach(function(body) {
			if (x == body.x && y == body.y) {
				collide = true;
			}
		})
		return collide;
	}

	function checkCollideWithBomb(x, y) {
		var collide = false;
		bombLst.forEach(function(eachBomb) {
			if (x == eachBomb.x && y == eachBomb.y) {
				collide = true;
			}
		})
		return collide;
	}

	function drawSnakeBody(x, y) {
		context.fillStyle = 'brown';
		context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize)
		context.strokeStyle = 'black';
		context.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize)
	}

	function drawApple(x, y) {
		context.fillStyle = 'red';
		var centerX = x * squareSize + squareSize / 2
		var centerY = y * squareSize + squareSize / 2
		var radius = squareSize / 2
		context.beginPath()
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'red';
      context.fill();
	}

	function drawBomb(x, y) {
		context.fillStyle = 'black';
		context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize)
	}

	function showScore() {
		context.fillStyle = 'black';
		context.font="15px Verdana";
		var speed = parseInt((70 - timeInterval) / 5)
		var text = "Score: " + score + " Time: " + parseInt(time) + "s" + " Speed: " + speed
		context.fillText(text, 5, height - 5)
	}

	function moveSnake() {
		// Create a new head
		var headX = snakeBodies[0].x
		var headY = snakeBodies[0].y
		if (direction == 'right') {
			headX += 1;
		} else if (direction == 'left') {
			headX -= 1;
		} else if (direction == 'up') {
			headY -= 1;
		} else {
			headY += 1;
		}
		// Check if the new head is out of bounds or it collides with itself or the bomb
		if (headX < 0 || headX + 1 > width / squareSize || headY < 0 || headY + 1 > height / squareSize 
			|| checkCollideWithSnake(headX, headY) || checkCollideWithBomb(headX, headY)) {
			gameOver()
			return false;
		}
		// Check if the snake touches the apple
		if (headX == apple.x && headY == apple.y) {
			score += 1;
			newObstacle(apple);
		} else {
			snakeBodies.pop();
		}
		var newHead = {
			x: headX,
			y: headY
		}
		snakeBodies.unshift(newHead);
		return true;
	}

	function gameOver() {
		// Re-enable the button once the game ends
		document.getElementById("start").removeAttribute('disabled', true);
		context.clearRect(0, 0, width, height);
		interval = clearInterval(interval);
		globalInterval = clearInterval(globalInterval);
		context.fillStyle = 'black';
		context.font="30px Verdana";
		context.fillText("Game Over!", width / 2 - 90, height / 2 - 100);
		context.fillText("Your score is: " + score, width / 2 - 110, height / 2 + 10);
		context.fillText("Your time is: " + parseInt(time) + "s", width / 2 - 110, height / 2 + 40);
		context.font="20px Verdana";
		context.fillText("Click button above to restart", width / 2 - 130, height / 2 + 100);
	}
}
