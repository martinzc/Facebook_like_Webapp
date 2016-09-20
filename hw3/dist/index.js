window.onload = function() {
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth()+1;
	var thisYear = today.getFullYear();
	var minYear = thisYear - 120;
	var maxYear = thisYear - 18;
	if(date<10){
	     date='0'+date
	 } 
	 if(month<10){
	     month='0'+month
	 } 
	maxDate = maxYear + '-' + month + '-' + date;
	minDate = minYear + '-' + 01 + '-' + 01;
	document.getElementsByName('birthday')[0].setAttribute("max", maxDate);
	document.getElementsByName('birthday')[0].setAttribute("min", minDate);		
}

function ValidateLogIn() {
	var username = document.getElementsByName('usernameLogIn')[0].value;
	var password = document.getElementsByName('passwordLogIn')[0].value;
	if (username == '') {
		window.alert('Please fill up the user name')
	} else if (password == '') {
		window.alert('Please fill up the password')
	} else {
		window.open('main.html', '_self', false);
	}
}

function ValidateSignUp() {
	if (checkAge() && checkPassword()) {
		return true;
	} else {
		return false;
	}
}

function checkAge() {
	var dateOfBirth=new Date(document.getElementsByName("birthday")[0].value);
	var ageDiffMs = Date.now() - dateOfBirth.getTime();
	var ageDate = new Date(ageDiffMs);
	var age = Math.abs(ageDate.getUTCFullYear() - 1970);
	if (age < 18) {
 		window.alert("User must be 18 years of age or older");
		return false;
	} else {
		return true;
	}
}

function checkPassword() {
	var password = document.getElementsByName('password')[0].value;
	var passwordConfirmation = document.getElementsByName('passwordConfirmation')[0].value;
	if (password != passwordConfirmation) {
 		window.alert("The two passwords you enter don't match");
		return false;
	} else {
		return true;
	}
}