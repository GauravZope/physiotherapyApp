function validateRegisterForm(){
	var isValidForm = true;
	if(document.getElementById('form_casePaperNo').value == ""){
		j('#form_casePaperNo').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#form_casePaperNo").removeAttr("border-color") 
	}
	if(document.getElementById('form_first_name').value == ""){
		j('#form_first_name').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#form_first_name").removeAttr("border-color") 
	}
	if(document.getElementById('form_last_name').value == ""){
		j('#form_last_name').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#form_last_name").removeAttr("border-color") 
	}
	if(document.getElementById('form_phoneNo').value == ""){
		j('#form_phoneNo').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#form_phoneNo").removeAttr("border-color") 
	}

	if(document.getElementById('form_email').value == ""){
		j('#form_email').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#form_email").removeAttr("border-color") 
	}
	
	if(document.getElementById('form_City').value == ""){
		j('#form_City').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#form_City").removeAttr("border-color") 
	}
	
	if(document.getElementById('form_State').value == ""){
		j('#form_State').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#form_State").removeAttr("border-color") 
	}


	if(document.getElementById('form_pincode').value == ""){
		j('#form_pincode').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#form_pincode").removeAttr("border-color") 
	}

	if(document.getElementById('form_password').value == ""){
		j('#form_password').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#form_password").removeAttr("border-color") 
	}

	if(document.getElementById('form_RetypePassword').value == ""){
		j('#form_RetypePassword').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#form_RetypePassword").removeAttr("border-color")
	}

		return isValidForm;
}



function validateLoginForm(){
	var isValidForm = true;
	if(document.getElementById('userName').value == ""){
		j('#userName').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#userName").removeAttr("border-color") 
	}
	if(document.getElementById('password').value == ""){
		j('#password').css('border-color', 'red');
		isValidForm =  false;
	}else{
		j("#password").removeAttr("border-color") 
	}
	return isValidForm;
}