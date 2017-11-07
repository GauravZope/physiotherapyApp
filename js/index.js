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
    
   	var headerBackBtn=defaultPagePath+'categoryMsgPage.html';
	var pageRef=defaultPagePath+'category.html';

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
		headerBackBtn=defaultPagePath+'welcomePage.html';
		pgRef=defaultPagePath+'loginPage.html';
	}
	
	j(document).ready(function() {
		j('#mainHeader').load(headerBackBtn);
			j('#mainContainer').load(pgRef);
			
			j('#mainContainer').on( "swipeleft", openSideMenu );
			j('#mainContainer').swipe({
				swipe:function(event,direction,distance,duration,fingercount){
					switch (direction) {
						case "right":
								goBack();
								break;
						default:

					}
				},
				 threshold:200,
				allowPageScroll:"auto"
			});
	});
	appPageHistory.push(pgRef);
 }
 