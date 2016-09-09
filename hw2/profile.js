function changeValue() {


	var nameVal = document.getElementById("displayName");
	var emailVal = document.getElementById("email");
	var phoneVal = document.getElementById("telephone");
	var zipVal = document.getElementById("zipCode");
	var passwordVal = document.getElementById("password");
	var passwordConfirmationVal = document.getElementById("passwordConfirmation");

	// Check the validation of input values
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
		// Change displayed value according to user input
		if (nameVal.value != "") {
			alert("Changing display name from " + document.getElementById("changingName").innerHTML + " to " + nameVal.value)
			document.getElementById("changingName").innerHTML = nameVal.value;
			nameVal.value = "";
		}
		if (emailVal.value != "") {
			alert("Changing email from " + document.getElementById("changingEmail").innerHTML + " to " + emailVal.value)
			document.getElementById("changingEmail").innerHTML = emailVal.value;
			emailVal.value = "";
		}
		if (phoneVal.value != "") {
			alert("Changing phone number from " + document.getElementById("changingPhone").innerHTML + " to " + phoneVal.value)
			document.getElementById("changingPhone").innerHTML = phoneVal.value;
			phoneVal.value = "";
		}
		if (zipVal.value != "") {
			alert("Changing zip code from " + document.getElementById("changingZip").innerHTML + " to " + zipVal.value)
			document.getElementById("changingZip").innerHTML = zipVal.value;
			zipVal.value = "";
		}
		if (passwordVal.value != "") {
			alert("Changing password from " + document.getElementById("changingPw").innerHTML + " to " + passwordVal.value)
			document.getElementById("changingPw").innerHTML = passwordVal.value;
			passwordVal.value = "";
			passwordConfirmationVal.value = "";
		}

	}
}