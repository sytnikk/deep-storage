let validation = module.exports;

validation.isEmail = function(email) {
	const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return regexp.test(email);
}

validation.isPassword = function(password) {
	//Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
	const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

	return regexp.test(password);
}

validation.localValidate = (email, password) => {
	console.log(this.isEmail(email))
	console.log(this.isPassword(password))
}