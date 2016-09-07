window.onload = function() {

	var btn = document.getElementById("clickMe");
	var block = document.getElementById("winMsg");
	btn.style.position = "absolute";

	var moveBtn = function(e) {
		var btnWidth = btn.offsetWidth;
		var windowWidth = window.innerWidth;
		var btnPositionX = parseInt(btn.style.left, 10);
		btn.style.left = (btnPositionX + btnWidth) % (windowWidth - btnWidth) + "px";
	}

	var showWin = function(e) {
		console.log("Clicked");
		if (btn.innerHTML == "Click Me") {
			block.style.display = "inline-block";
			btn.innerHTML = "Play Again";
			btn.removeEventListener("mouseover", moveBtn, false);
		} else {
			block.style.display = "none";
			btn.innerHTML = "Click Me";
			btn.addEventListener("mouseover", moveBtn, false);
		}
	}

	btn.addEventListener("mouseover", moveBtn, false);
	btn.addEventListener("click", showWin, false);

	document.getElementById("canvas").onkeydown = function(e) {
		if (e.keyCode) {
			if (e.keyCode == 16) {
				btn.removeEventListener("mouseover", moveBtn, false);
			} 
		}
	}

	document.getElementById("canvas").onkeyup = function(e) {
		if (e.keyCode) {
			if (e.keyCode == 16) {
				if (btn.innerHTML == "Click Me") {
					btn.addEventListener("mouseover", moveBtn, false);
				}
			} 
		}
	}

}