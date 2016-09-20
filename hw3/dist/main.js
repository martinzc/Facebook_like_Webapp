function updateStatus() {
	var textChange = document.getElementById("updateStatus").value;
	// Update the stats if the user inputs something
	if (textChange != '') {
		document.getElementById("status").innerHTML = "Status: <br>" + textChange;
		document.getElementById("updateStatus").value = '';
	} else {
		alert('Please input something in the text area')
	}
}

function clearNewPost() {
	document.getElementById("newPost").value = '';
}
