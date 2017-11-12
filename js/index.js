var j = jQuery.noConflict();
var defaultPagePath='app/pages/';
var headerMsg = "Physiotheropy";
//var urlPath = "http://1.255.255.122:8080/TnEV1_0AWeb/WebService/Login/";

j(document).ready(function(){ 
document.addEventListener("deviceready",loaded,false);

});
function loaded() {
                pictureSource=navigator.camera.PictureSourceType;
                destinationType=navigator.camera.DestinationType;
            }
function login()
   {
   	if(document.getElementById("userName")!=null){
    	var userName = document.getElementById("userName").value;
	}else if(document.getElementById("userName")!=null){
		var userName = document.getElementById("userNameId").value;
	}
	var password = document.getElementById("password");
    
	var pageRef=defaultPagePath+'homePage.html';

	j('#loading').show();
   if(userName == 'yashashreezope'){
   		alert("Hello Dr. yashashree Zope. \n  Welcome to Your Physiotheropy App");
				j('#mainHeader').load(headerBackBtn);
				j('#mainContainer').load(pageRef);
      appPageHistory.push(pageRef);
   }else if(userName == 'gauravzope'){
		alert("Hello Mr. Gaurav Zope. \n  Welcome to Your Physiotheropy App");
				j('#mainHeader').load(headerBackBtn);
				j('#mainContainer').load(pageRef);
      appPageHistory.push(pageRef);
   }else{
   		alert("Please follow registration process for new enrollment");
   }


 }


 function toggleSideMenu() {
  	 j("#wrapper").toggleClass("toggled");
  }
  

 function init() {
	var pgRef;
	var headerBackBtn;
	if(window.localStorage.getItem("EmployeeId")!= null){
		if(window.localStorage.getItem("UserStatus")=='Valid'){
			pgRef=defaultPagePath+'category.html';
			headerBackBtn=defaultPagePath+'categoryMsgPage.html';
		}else{
			headerBackBtn=defaultPagePath+'welcomePage.html';
			pgRef=defaultPagePath+'loginPage.html';
		}

	}else{
		headerBackBtn=defaultPagePath+'headerPage.html';
		pgRef=defaultPagePath+'loginPage.html';
	}

	
	j(document).ready(function() {
			j('#header').load(headerBackBtn);
			j('#mainContainer').load(pgRef);
			
			//j('#mainContainer').on( "swipeleft", openSideMenu );
			j('#mainContainer').swipe({
				swipe:function(event,direction,distance,duration,fingercount){
					switch (direction) {
						case "right":
								toggleSideMenu();
								break;
						/*case "left":
								toggleSideMenu();
								break;*/
						default:

					}
				},
				 threshold:200,
				allowPageScroll:"auto"
			});


	});
	appPageHistory.push(pgRef);
 }
 
 function loadPage(id){
 	
 	if(id == 'home'){
 	pgRef=defaultPagePath+'homePage.html';
 	}else if(id == 'makeAppointment'){
 	pgRef=defaultPagePath+'makeAppointmentPage.html';
 	}else if(id == 'logout'){
 	pgRef=defaultPagePath+'logout.html';
 	}else if(id == 'myDetails'){
 	pgRef=defaultPagePath+'myDetails.html';
 	}else{
 		pgRef=defaultPagePath+'loginPage.html';
 	}
	j('#mainContainer').load(pgRef);
	j("#wrapper").toggleClass("toggled");
	appPageHistory.push(pgRef);
 }
function logout(){
	pgRef=defaultPagePath+'loginPage.html';
	j('#mainContainer').load(pgRef);
	appPageHistory.push(pgRef);
}


function login(){
	var status = false;
	var userName = document.getElementById('userName').value  ;
	var userPassword = document.getElementById('password').value;
		console.log(validateLoginForm())
	if(validateLoginForm()){
		console.log("inside og if")
		status = getUserDetails(userName,userPassword);
		console.log("status  "+status);
		if(status){
			pgRef=defaultPagePath+'homePage.html';
			j('#mainContainer').load(pgRef);
			appPageHistory.push(pgRef);
		}else{
			
			alert("Oops something went wrong. Please try again later !!!");
		}
    }else{
    	alert("Please enter user name and password.");
    }
}

function signMeUp(){
	console.log(validateRegisterForm());
	if(validateRegisterForm()){
		console.log("if")
		saveRegistrationForm();

		pgRef=defaultPagePath+'homePage.html';
		j('#mainContainer').load(pgRef);
		appPageHistory.push(pgRef);
    }else{
    	console.log("invalid form........");
    }
}