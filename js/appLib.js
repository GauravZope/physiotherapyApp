var appPageHistory=[];


var app = {
    // Application Constructor
    initialize: function() {
		this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		document.addEventListener("deviceready", this.onDeviceReady, false);
    },
	
	onDeviceReady: function() {
   		  if (navigator.notification) { // Override default HTML alert with native dialog
		  window.alert = function (message) {
			  navigator.notification.alert(
				  message,   	 // message
				  null,       	// callback
				  "Alert", 	   // title
				  'OK'        // buttonName
			  );
		  };
	 	}
	}
};

  //Local Database Create,Save,Display

  //Test for browser compatibility

if (window.openDatabase) {
	
	//Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("physiotherapyApp", "0.1", "physiotherapyApp", 1024 * 1024);
	//create All tables using SQL for the database using a transaction
	mydb.transaction(function (t) {
		t.executeSql("CREATE TABLE IF NOT EXISTS userDetails (userid INTEGER PRIMARY KEY ASC,casePaperNo TEXT, firstName TEXT, lastName TEXT, emailid TEXT,status CHAR(1),phoneNo TEXT , addressLine1 TEXT, addressLine2 TEXT, city TEXT, state TEXT, pinCode TEXT, userStatus TEXT, userPassword TEXT)");
		t.executeSql("CREATE TABLE IF NOT EXISTS inactiveUsers (inactiveUsersId INTEGER PRIMARY KEY ASC, firstName TEXT, lastName TEXT, userid INTEGER REFERENCES userDetails(userid))");
		t.executeSql("CREATE TABLE IF NOT EXISTS activeUsers (activeUsersId INTEGER PRIMARY KEY ASC, firstName TEXT, lastName TEXT, userid INTEGER REFERENCES userDetails(userid))");
		t.executeSql("CREATE TABLE IF NOT EXISTS patientTreatmentMst (Id INTEGER PRIMARY KEY ASC, treatmentProtocolId INTEGER REFERENCES treatmentProtocolMst(id), tratmentStatus TEXT, userid INTEGER REFERENCES userDetails(userid))");
		t.executeSql("CREATE TABLE IF NOT EXISTS treatmentProtocolMst (Id INTEGER PRIMARY KEY ASC, treatmentProtocolCode TEXT, treatmentProtocolName TEXT , field1 TEXT, field2 TEXT, field3 TEXT, field4 TEXT, field5 TEXT)");
		
		 mydb.transaction(function (t) {
			t.executeSql("INSERT INTO userDetails (casePaperNo , firstName , lastName , emailid ,status ,phoneNo  , addressLine1 , addressLine2 , city , state , pinCode , userStatus ,userPassword) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", 
						["","John","Doe","johndoe@gmail.com",'1' ,"9876543210","403, Bakers st","","Mumbai","Maharashtra","400007",'D','123456']);	

		});
    });
} else {
    alert("WebSQL is not supported by your browser!");
}



function resetUserSessionDetails(){
	 window.localStorage.removeItem("FirstName");
	 window.localStorage.removeItem("LastName");
	 window.localStorage.removeItem("UserName");
	 window.localStorage.removeItem("Password");
	 window.localStorage.removeItem("EmailId");
	 window.localStorage.removeItem("Address");
	 window.localStorage.removeItem("PhoneNo");
	 window.localStorage.removeItem("State");
	 window.localStorage.removeItem("PinCode");
	 window.localStorage.removeItem("casePaperNo");

}

function setUserSessionDetails(firstName,lastName,userName,password,emailid,addr,phNo,state,pincode,casePaperNo){
	 window.localStorage.setItem("FirstName",firstName);
	 window.localStorage.setItem("LastName",lastName);
	 window.localStorage.setItem("UserName",userName);
	 window.localStorage.setItem("Password",password);
	 window.localStorage.setItem("EmailId",emailid);
	 window.localStorage.setItem("Address",addr);
	 window.localStorage.setItem("PhoneNo",phNo);
	 window.localStorage.setItem("State",state);
	 window.localStorage.setItem("PinCode",pincode);
	 window.localStorage.setItem("casePaperNo",casePaperNo);

	
}

function dropAllTableDetails(){

	mydb.transaction(function(t) {
		t.executeSql("DELETE TABLE currencyMst ");
		t.executeSql("DELETE TABLE accountHeadMst ");
		t.executeSql("DELETE TABLE expNameMst");
		t.executeSql("DELETE TABLE businessExpDetails");
	 });

}

function getUserID() {
	userKey=window.localStorage.getItem("EmployeeId");
	if(userKey==null) return  "";
	else return userKey;
}

function saveRegistrationForm(){
    var formCasePaperNo = document.getElementById('form_casePaperNo').value;
	var formFirst_name = document.getElementById('form_first_name').value;
	var formLast_name = document.getElementById('form_last_name').value;
	var formPhoneNo = document.getElementById('form_phoneNo').value;
	var formEmail = document.getElementById('form_email').value;
	var formCity = document.getElementById('form_City').value;
	var formState = document.getElementById('form_State').value;
	var formPincode = document.getElementById('form_pincode').value;
	var formPassword = document.getElementById('form_password').value;
	var formRetypePassword = document.getElementById('form_RetypePassword').value;
	var formAddressLine1 = document.getElementById('form_AddressLine1').value;
	var formAddressLine2 = document.getElementById('form_AddressLine1').value;
    j('#loading_Cat').show();
	if(mydb){
		 mydb.transaction(function (t) {
					t.executeSql("INSERT INTO userDetails (casePaperNo , firstName , lastName , emailid ,status ,phoneNo  , addressLine1 , addressLine2 , city , state , pinCode , userStatus ,userPassword) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", 
												[formCasePaperNo,formFirst_name,formLast_name,formEmail,'1' ,formPhoneNo,formAddressLine1,formAddressLine2,formCity,formState,formPincode,'P',formPassword]);	

		});
	}
	j('#loading_Cat').hide();
	document.getElementById("syncSuccessMsg").innerHTML = "Expenses added successfully.";
	j('#syncSuccessMsg').hide().fadeIn('slow').delay(500).fadeOut('slow');
}



function getUserDetails(userName , password) {
	console.log(userName);
	if (mydb) {
		mydb.transaction(function (t) {
				t.executeSql("SELECT * FROM userDetails where emailid = '"+userName+"'", [], validateUserCredentials);
			});
		
		if(setTimeout(validatePassword, 1000)){
			return true;
		}else{
			resetUserSessionDetails();
			return false;
		}	
	} else {
		alert("db not found, your browser does not support web sql!");
	}
 }
 function validatePassword(password ){
	var dbPassword = window.localStorage.getItem("Password");
	if( (dbPassword != '' || dbPassword != null) &&  dbPassword == password){
			return true;
		}else{
			resetUserSessionDetails();
			return false;
		}	
 }
 function validateUserCredentials(transaction, results) {	
    if(results.rows.length <= 0){
    	alert("Invalid credentials")
    } else{
	    var row = results.rows.item(0);
		var casePaperNo  = row.casePaperNo ;
		var formFirst_name  = row.firstName ; 
		var formLast_name  = row.lastName ;
		var formEmail  = row.emailid ; 
		var formAddressLine2  = row.status ; 
		var formPhoneNo  = row.phoneNo  ;
		var formAddressLine1  = row.addressLine1 ; 
		var formAddressLine2  = row.addressLine2 ;
		var formAddressLine2  = row.city ;
		var formState  = row.state ; 
		var formPincode  = row.pinCode ;
		var formPassword  = row.userPassword;
		var userStatus = row.userStatus;
		setUserSessionDetails(formFirst_name,formLast_name,formEmail,
							formPassword,formEmail,
							""+formAddressLine1+" "+formAddressLine2+" "+formPincode,
							formPhoneNo,formState,formPincode,casePaperNo);
	}
}	 