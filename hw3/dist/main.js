window.onload = function() {
}

function populateText() {
}

function populatePicture() {
	imgLinkList = ["img/dog1.jpeg", "img/dog2.jpeg", "img/dog3.jpeg", "img/dog4.jpeg", "img/dog5.jpeg"];
}

function updateStatus() {
	var textChange = document.getElementById("updateStatus").value;
	document.getElementById("status").innerHTML = "Status: <br>" + textChange;
	document.getElementById("updateStatus").value = '';
}

function clearNewPost() {
	document.getElementById("newPost").value = '';
}
