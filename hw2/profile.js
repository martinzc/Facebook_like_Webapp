window.onload = function() {
}

function changeValue() {
	var nameVal = document.getElementById("displayName");
	var emailVal = document.getElementById("email");
	var phoneVal = document.getElementById("telephone");
	var zipVal = document.getElementById("zipCode");
	var passwordVal = document.getElementById("password");
	var passwordConfirmationVal = document.getElementById("passwordConfirmation");
	if (nameVal.value != "" && !/^(([A-Za-z0-9 ])*)$/.test(nameVal.value)) {
		alert("The name does not match the coorect pattern");
	} else if (emailVal.value != "" && !/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4})$/.test(emailVal.value)) {
		alert("The email does not match the coorect pattern");
	} else if (phoneVal.value != "" && !/^(\d{3}-\d{3}-\d{4})$/.test(phoneVal.value)) {
		alert("The phone does not match the coorect pattern");
	} else if (zipVal.value != "" && !/^(\d{5})$/.test(zipVal.value)) {
		alert("The zip code does not match the coorect pattern");
	} else if (passwordVal.value != "" && passwordVal.value != passwordConfirmationVal.value) {
		alert("The two passwords do not match");
	} else {
		if (nameVal.value != "") {
			document.getElementById("changingName").innerHTML = nameVal.value;
			nameVal.value = "";
		}
		if (emailVal.value != "") {
			document.getElementById("changingEmail").innerHTML = emailVal.value;
			emailVal.value = "";
		}
		if (phoneVal.value != "") {
			document.getElementById("changingPhone").innerHTML = phoneVal.value;
			phoneVal.value = "";
		}
		if (zipVal.value != "") {
			document.getElementById("changingZip").innerHTML = zipVal.value;
			zipVal.value = "";
		}
		if (passwordVal.value != "") {
			document.getElementById("changingPw").innerHTML = passwordVal.value;
			passwordVal.value = "";
			passwordConfirmationVal.value = "";
		}

	}
}

function checkPassword() {
	var password = document.getElementById('password').value;
	var passwordConfirmation = document.getElementById('passwordConfirmation').value;
	if (password != passwordConfirmation) {
 		window.alert("The two passwords you enter don't match");
		return false;
	} else {
		return true;
	}
}