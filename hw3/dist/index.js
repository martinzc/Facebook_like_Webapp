window.onload = function() {
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth()+1;
	var thisYear = today.getFullYear();
	// The user has to be less than 120 years old
	var minYear = thisYear - 120;
	// The user has to be at least 18 years old
	var maxYear = thisYear - 18;
	if(date<10){
	     date='0'+date
	 } 
	 if(month<10){
	     month='0'+month
	 } 
	maxDate = maxYear + '-' + month + '-' + date;
	minDate = minYear + '-' + 01 + '-' + 01;
	// Set the maximum and minimum date of the birthday
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
	var password = document.getElementsByName('password')[0].value;
	var passwordConfirmation = document.getElementsByName('passwordConfirmation')[0].value;
	if (password != passwordConfirmation) {
 		window.alert("The two passwords you enter don't match");
		return false;
	} else {
		return true;
	}
}