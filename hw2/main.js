var tablePicList = [];
var imgLinkList = [];
var interval1;
var interval2;
var interval3;
var interval4;
var interval5;

window.onload = function() {
	populateText();
	populatePicture();
}

function populateText() {
	var text1 = '<h2>LABRADOR RETRIEVER</h2><p>The Labrador Retriever is a strongly built, medium-sized, short-coupled, dog possessing a sound, athletic, well-balanced conformation that enables it to function as a retrieving gun dog; the substance and soundness to hunt waterfowl or upland game for long hours under difficult conditions; the character and quality to win in the show ring; and the temperament to be a family companion. Physical features and mental characteristics should denote a dog bred to perform as an efficient Retriever of game with a stable temperament suitable for a variety of pursuits beyond the hunting environment. The most distinguishing characteristics of the Labrador Retriever are its short, dense, weather resistant coat; an "otter" tail; a clean-cut head with broad back skull and moderate stop; powerful jaws; and its "kind," friendly eyes, expressing character, intelligence and good temperament.</p>';
	var text2 = '<h2>GERMAN SHEPHERD DOG</h2><p>The first impression of a good German Shepherd Dog is that of a strong, agile, well muscled animal, alert and full of life. It is well balanced, with harmonious development of the forequarter and hindquarter. The dog is longer than tall, deep-bodied, and presents an outline of smooth curves rather than angles. It looks substantial and not spindly, giving the impression, both at rest and in motion, of muscular fitness and nimbleness without any look of clumsiness or soft living. The ideal dog is stamped with a look of quality and nobility - difficult to define, but unmistakable when present. Secondary sex characteristics are strongly marked, and every animal gives a definite impression of masculinity or femininity, according to its sex.</p>';
	var text3 = '<h2>GOLDEN RETRIEVER</h2><p>A symmetrical, powerful, active dog, sound and well put together, not clumsy nor long in the leg, displaying a kindly expression and possessing a personality that is eager, alert and self-confident. Primarily a hunting dog, he should be shown in hard working condition. Overall appearance, balance, gait and purpose to be given more emphasis than any of his component parts. Faults-Any departure from the described ideal shall be considered faulty to the degree to which it interferes with the breed\'s purpose or is contrary to breed character.</p>';
	var text4 = '<h2>BULLDOG</h2><p>The perfect Bulldog must be of medium size and smooth coat; with heavy, thick-set, low-swung body, massive short-faced head, wide shoulders and sturdy limbs. The general appearance and attitude should suggest great stability, vigor and strength. The disposition should be equable and kind, resolute and courageous (not vicious or aggressive), and demeanor should be pacific and dignified. These attributes should be countenanced by the expression and behavior.</p>';
	var tableText1 = document.getElementById("text1");
	var tableText2 = document.getElementById("text2");
	var tableText3 = document.getElementById("text3");
	var tableText4 = document.getElementById("text4");
	tableText1.innerHTML = text1;
	tableText2.innerHTML = text2;
	tableText3.innerHTML = text3;
	tableText4.innerHTML = text4;
}

function populatePicture() {
	imgLinkList = ["img/dog1.jpeg", "img/dog2.jpeg", "img/dog3.jpeg", "img/dog4.jpeg", "img/dog5.jpeg"];
	tablePicList.push(document.getElementById("picture1"));
	tablePicList.push(document.getElementById("picture2"));
	tablePicList.push(document.getElementById("picture3"));
	tablePicList.push(document.getElementById("picture4"));
	interval1 = shufflePic(0);
	interval2 = shufflePic(1);
	interval3 = shufflePic(2);
	interval4 = shufflePic(3);
}

function shufflePic(index) {
		// Interval is a random number from 1000 to 4000 milliseconds
		var randomInterval = Math.random() * 3000 + 1000
		var picIndex = 0;
		// Set an interval that loops through the picture list and sets different pictures
		var interval = window.setInterval(function() {
			var pic = tablePicList[index];
			pic.innerHTML = '<img src="' + imgLinkList[picIndex] + '" width=100%>';
			picIndex++;
			if (picIndex >= imgLinkList.length) { picIndex = 0; }
		}, randomInterval);
		return interval;
	}

function toggleButton(button) {
	if (button.innerHTML == "Pause") {
		button.innerHTML = "Resume";
		// Pause specific picutre from changing
		switch(button.value) {
		    case "0":
		        window.clearInterval(interval1);
		        break;
		    case "1":
		        window.clearInterval(interval2);
		        break;
		    case "2":
		        window.clearInterval(interval3);
		        break;
		    case "3":
		        window.clearInterval(interval4);
		        break;
		    default:
		        break;
		}
	} else {
		button.innerHTML = "Pause";
		// Resume specific picture that has been paused
		switch(button.value) {
		    case "0":
		        interval1 = shufflePic(0);
		        break;
		    case "1":
		        interval2 = shufflePic(1);
		        break;
		    case "2":
		        interval3 = shufflePic(2);
		        break;
		    case "3":
		        interval4 = shufflePic(3);
		        break;
		    default:
		        break;
		}
	}
}
