'use strict'


var createSun = function(canvas) {
	var c = canvas.getContext("2d");

	// Draw circle
   setInterval(drawSun, 100);
   var position = {x: 10, y: 50}

   function drawSun() {
		c.clearRect(0, 0, sunCanvas.width, sunCanvas.height)
		c.fillStyle = 'yellow';
		c.beginPath(); 
		c.arc(position.x, position.y, 10, 0, Math.PI * 2, true);    
		c.fill();
		c.closePath(); 
		position.x = (position.x + 5) % canvas.width;
		position.y = (position.y + 1);
		if (position.x == 0) {
			position.y = 50;
		}
	}
}

var createCar = function(canvas) {
	var c = canvas.getContext("2d");

	// Draw circle

	var img = new Image;
	var position;
	img.onload = function(){
   	position = {x: 10, y: canvas.height/2 - img.height}
		setInterval(drawCar, 100);
	};
	img.src = "http://res.freestockphotos.biz/pictures/15/15685-illustration-of-a-red-cartoon-car-pv.png";
	img.width = 50;
	img.height = 50;

   function drawCar() {
		c.clearRect(0, 0, sunCanvas.width, sunCanvas.height)
		c.drawImage(img, position.x, position.y + 15, img.width, img.height)
		position.x = (position.x + 10) % canvas.width;
	}
}

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange']

	// Information of buildings built
	var buildings = []

	// Add click event for buildings
	var canvasDiv = document.getElementById('allCanvas')
	canvasDiv.addEventListener('click', function(event) {
		var x = event.pageX,
		  y = event.pageY - 50;

		// Collision detection between clicked offset and element.
		buildings.forEach(function(building) {
		  if (y >= building.y && y <= building.y + building.height 
		      && x >= building.x && x <= building.x + building.width) {
		      c.fillStyle= building.color;
		   	var addedHeight = building.height / 10;
				c.fillRect(building.x, building.y - addedHeight, building.width, addedHeight);
				c.fillStyle="yellow"
				for (var y_window = building.y - floorSpacing; y_window > building.y - addedHeight; y_window -= floorSpacing + windowHeight) {
					for (var x_window = windowSpacing; x_window < building.width - windowWidth; x_window += windowSpacing + windowWidth) {
						if (Math.floor(Math.random() * 2) == 0) {
							c.fillRect(building.x + x_window, y_window - windowHeight, windowWidth, windowHeight)
						}
					}
				}
				building.y = building.y - addedHeight;
				building.height = building.height + addedHeight;
			}
		});

	}, true);

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2

		c.fillStyle= blgColors[ Math.floor(Math.random()*blgColors.length)]
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		buildings.push({color: c.fillStyle, x: x0, y: floor - blgHeight, width: blgWidth, height: blgHeight})
		c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				if (Math.floor(Math.random() * 2) == 0) {
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
		}

	}

	return {
		build: build
	}
}

window.onload = function() {
	var app = createApp(document.getElementById('pageCanvas'))
	var sunApp = createSun(document.getElementById('sunCanvas'))
	var carApp = createCar(document.getElementById('carCanvas'))
	document.getElementById("build").onclick = app.build
}
