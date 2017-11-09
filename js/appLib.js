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
		t.executeSql("CREATE TABLE IF NOT EXISTS userDetails (userid INTEGER PRIMARY KEY ASC, firstName TEXT, lastName TEXT, status CHAR(1),phoneNo TEXT , addressLine1 TEXT, addressLine2 TEXT, city TEXT, state TEXT, pinCode TEXT, userStatus TEXT)");
		t.executeSql("CREATE TABLE IF NOT EXISTS inactiveUsers (inactiveUsersId INTEGER PRIMARY KEY ASC, firstName TEXT, lastName TEXT, userid INTEGER REFERENCES userDetails(userid)");
		t.executeSql("CREATE TABLE IF NOT EXISTS activeUsers (activeUsersId INTEGER PRIMARY KEY ASC, firstName TEXT, lastName TEXT, userid INTEGER REFERENCES userDetails(userid)");
		t.executeSql("CREATE TABLE IF NOT EXISTS patientTreatmentMst (Id INTEGER PRIMARY KEY ASC, treatmentProtocolId INTEGER REFERENCES treatmentProtocolMst(id), tratmentStatus TEXT, userid INTEGER REFERENCES userDetails(userid)");
		t.executeSql("CREATE TABLE IF NOT EXISTS treatmentProtocolMst (Id INTEGER PRIMARY KEY ASC, treatmentProtocolCode TEXT, treatmentProtocolName TEXT , field1 TEXT, field2 TEXT, field3 TEXT, field4 TEXT, field5 TEXT");
    });
} else {
    alert("WebSQL is not supported by your browser!");
}

//function to remove a employeeDetails from the database, passed the row id as it's only parameter
function saveBusinessDetails(status){
	exceptionMessage='';
	if (mydb) {
		//get the values of the text inputs
        var exp_date = document.getElementById('expDate').value;
		var exp_from_loc = document.getElementById('expFromLoc').value;
		var exp_to_loc = document.getElementById('expToLoc').value;
		var exp_narration = document.getElementById('expNarration').value;
		var exp_unit = document.getElementById('expUnit').value;
		var way_points = document.getElementById('wayPointunitValue').value;
		var exp_amt = document.getElementById('expAmt').value;
		var entitlement_exceeded=exceptionStatus;
		exceptionStatus="N";
		var acc_head_id;
		var acc_head_val;
		var exp_name_id;
		var exp_name_val;
		var currency_id;
		var currency_val;
        var locaton_id;
        var location_val;
		var file;
		if(j("#accountHead").select2('data') != null){
			acc_head_id = j("#accountHead").select2('data').id;
			acc_head_val = j("#accountHead").select2('data').name;
		}else{
			acc_head_id = '-1';
		}
		
		if(j("#expenseName").select2('data') != null){
			exp_name_id = j("#expenseName").select2('data').id;
			exp_name_val = j("#expenseName").select2('data').name;
		}else{
			exp_name_id = '-1';
		}	
		
		if(j("#currency").select2('data') != null){
			currency_id = j("#currency").select2('data').id;
			currency_val = j("#currency").select2('data').name;
		}else{
			currency_id = '-1';
		}
        
        if(j("#location").select2('data') != null){
			locaton_id = j("#location").select2('data').id;
			location_val = j("#location").select2('data').name;
		}else{
			locaton_id = '-1';
		}
		
		if(fileTempGalleryBE ==undefined || fileTempGalleryBE ==""){
		
		}else{
			file = fileTempGalleryBE;
		}
		
		if(fileTempCameraBE ==undefined || fileTempCameraBE ==""){
		
		}else{
			file = fileTempCameraBE; 
		}
		
		if(validateExpenseDetails(exp_date,exp_from_loc,exp_to_loc,exp_narration,exp_unit,exp_amt,acc_head_id,exp_name_id,currency_id,locaton_id)){
		 
		j('#loading_Cat').show();			  
		  
		  if(file ==undefined){
		  	file="";
			}
			
		  mydb.transaction(function (t) {
				t.executeSql("INSERT INTO businessExpDetails (expDate, accHeadId,expNameId,expFromLoc, expToLoc, expNarration, expUnit,expAmt,currencyId,isEntitlementExceeded,busExpAttachment,wayPointunitValue,locationId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
											[exp_date,acc_head_id,exp_name_id,exp_from_loc, exp_to_loc,exp_narration,exp_unit,exp_amt,currency_id,entitlement_exceeded,file,way_points,locaton_id]);
								
				if(status == "0"){
				
					document.getElementById('expDate').value ="";
					document.getElementById('expFromLoc').value = "";
					document.getElementById('expToLoc').value = "";
					document.getElementById('expNarration').value = "";
					document.getElementById('expUnit').value ="";
					document.getElementById('wayPointunitValue').value = "";
					document.getElementById('expAmt').value = "";
					smallImageBE.style.display = 'none';
					smallImageBE.src = "";
					j('#errorMsgArea').children('span').text("");
					j('#accountHead').select2('data', '');
					j('#expenseName').select2('data', '');
                    j('#location').select2('data', '');
					//j('#currency').select2('data', '');
					j('#loading_Cat').hide();
					document.getElementById("syncSuccessMsg").innerHTML = "Expenses added successfully.";
					j('#syncSuccessMsg').hide().fadeIn('slow').delay(300).fadeOut('slow') ;
					resetImageData();
					//createBusinessExp();
				}else{
					viewBusinessExp();
				}
			});
		
		}else{
			return false;
		}
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


function fetchExpenseClaim() {
	
	mytable = j('<table></table>').attr({ id: "source",class: ["table","table-striped","table-bordered"].join(' ') });
	var rowThead = j("<thead></thead>").appendTo(mytable);
	var rowTh = j('<tr></tr>').attr({ class: ["test"].join(' ') }).appendTo(rowThead);
	
	j('<th></th>').text("Date").appendTo(rowTh);
	j('<th></th>').text("Expense Name").appendTo(rowTh);
	j('<th></th>').text("Narration From/To Loc").appendTo(rowTh); 	
	j('<th></th>').text("Amt").appendTo(rowTh);
	var cols = new Number(5);
	 
	mydb.transaction(function(t) {
		var headerOprationBtn;
      t.executeSql('SELECT * FROM businessExpDetails INNER JOIN expNameMst ON businessExpDetails.expNameId =expNameMst.id INNER JOIN currencyMst ON businessExpDetails.currencyId =currencyMst.currencyId INNER JOIN accountHeadMst ON businessExpDetails.accHeadId =accountHeadMst.accountHeadId;', [],
		 function(transaction, result) {
		  if (result != null && result.rows != null) {
			  
			for (var i = 0; i < result.rows.length; i++) {
				
				var row = result.rows.item(i);
				var shrinkFromTo;
				var newDateFormat = reverseConvertDate(row.expDate.substring(0,2))+"-"+row.expDate.substring(3,5)+" "+row.expDate.substring(6,10); 
				
				if(window.localStorage.getItem("MobileMapRole") == 'true')
				{
					if(row.expFromLoc != '' && row.expToLoc != '')
					{
						var shrinkNarration = row.expNarration.substring(0,row.expNarration.indexOf("--"))
						srinckFromTo = row.expFromLoc.substring(0,row.expFromLoc.indexOf(","))+"/"+row.expToLoc.substring(0,row.expToLoc.indexOf(","));
						srinckFromTo = srinckFromTo.concat("...");
					}
				}
				
				var rowss = j('<tr></tr>').attr({ class: ["test"].join(' ') }).appendTo(mytable);
		
		        	j('<td></td>').attr({ class: ["expDate"].join(' ') }).text(newDateFormat).appendTo(rowss);	
		        	j('<td></td>').attr({ class: ["expName"].join(' ') }).text(row.expName).appendTo(rowss);	
				if(window.localStorage.getItem("MobileMapRole") == 'true')
				{
					if(row.expFromLoc != '' && row.expToLoc != '')
					{
						j('<td></td>').attr({ class: ["expNarration"].join(' ') }).html('<p>'+shrinkNarration+'</br>'+srinckFromTo+ '</P>').appendTo(rowss);
					}
					else
					{
						j('<td></td>').attr({ class: ["expNarration"].join(' ') }).html('<p>'+row.expNarration+'</br>'+row.expFromLoc+""+row.expToLoc+ '</P>').appendTo(rowss);
					}
				}
				else
				{
					if(row.expFromLoc != '' && row.expToLoc != '')
					{
						j('<td></td>').attr({ class: ["expNarration"].join(' ') }).html('<p>'+row.expNarration+'</br>'+row.expFromLoc+"/"+row.expToLoc+ '</P>').appendTo(rowss);	
					}else{
						j('<td></td>').attr({ class: ["expNarration"].join(' ') }).html('<p>'+row.expNarration+'</br>'+row.expFromLoc+""+row.expToLoc+ '</P>').appendTo(rowss);
					}		
				}
				
				if(row.busExpAttachment.length == 0){
				j('<td></td>').attr({ class: ["expAmt"].join(' ') }).html('<p>'+row.expAmt+' '+row.currencyName+'</P>').appendTo(rowss); 	
				}else{
				j('<td></td>').attr({ class: ["expAmt"].join(' ') }).html('<p>'+row.expAmt+' '+row.currencyName+'</P><img src="images/attach.png" width="25px" height="25px">').appendTo(rowss); 
				}
				j('<td></td>').attr({ class: ["expDate1","displayNone"].join(' ') }).text(row.expDate).appendTo(rowss);
				j('<td></td>').attr({ class: ["expFromLoc1","displayNone"].join(' ') }).text(row.expFromLoc).appendTo(rowss);
				j('<td></td>').attr({ class: ["expToLoc1","displayNone"].join(' ') }).text(row.expToLoc).appendTo(rowss);
				j('<td></td>').attr({ class: ["expNarration1","displayNone"].join(' ') }).text(row.expNarration).appendTo(rowss);
				j('<td></td>').attr({ class: ["expAmt1","displayNone"].join(' ') }).text(row.expAmt).appendTo(rowss);
				j('<td></td>').attr({ class: ["busAttachment","displayNone"].join(' ') }).text(row.busExpAttachment).appendTo(rowss);
				j('<td></td>').attr({ class: ["accHeadId","displayNone"].join(' ') }).text(row.accHeadId).appendTo(rowss);			
				j('<td></td>').attr({ class: ["expNameId","displayNone"].join(' ') }).text(row.expNameMstId).appendTo(rowss); 				
				j('<td></td>').attr({ class: ["expUnit","displayNone"].join(' ') }).text(row.expUnit).appendTo(rowss); 				
				j('<td></td>').attr({ class: ["currencyId","displayNone"].join(' ') }).text(row.currencyId).appendTo(rowss); 				
				j('<td></td>').attr({ class: ["accountCodeId","displayNone"].join(' ') }).text(row.accCodeId).appendTo(rowss);		
				//j('<td></td>').attr({ class: ["expName","displayNone"].join(' ') }).text(row.expName).appendTo(rowss);		
				j('<td></td>').attr({ class: ["busExpId","displayNone"].join(' ') }).text(row.busExpId).appendTo(rowss);
				j('<td></td>').attr({ class: ["isErReqd","displayNone"].join(' ') }).text(row.isErReqd).appendTo(rowss);
				j('<td></td>').attr({ class: ["ERLimitAmt","displayNone"].join(' ') }).text(row.limitAmountForER).appendTo(rowss);
				j('<td></td>').attr({ class: ["isEntitlementExceeded","displayNone"].join(' ') }).text(row.isEntitlementExceeded).appendTo(rowss);
				j('<td></td>').attr({ class: ["wayPoint","displayNone"].join(' ') }).text(row.wayPointunitValue).appendTo(rowss);
                j('<td></td>').attr({ class: ["locationId","displayNone"].join(' ') }).text(row.locationId).appendTo(rowss);
			}	
					
			j("#source tr").click(function(){ 
				headerOprationBtn = defaultPagePath+'headerPageForBEOperation.html';
				if(j(this).hasClass("selected")){ 
				var headerBackBtn=defaultPagePath+'headerPageForBEOperation.html';
					j(this).removeClass('selected');
					j('#mainHeader').load(headerBackBtn);
				}else{
				if(j(this).text()=='DateExpense NameNarration From/To LocAmt'){
					
				}else{
					j('#mainHeader').load(headerOprationBtn);
					j(this).addClass('selected');
				}					
				}								
			});
			}
		 });
	 });	 
	 mytable.appendTo("#box");		 
 }

 function onloadExpense() {
	if (mydb) {
		mydb.transaction(function (t) {
				t.executeSql("SELECT * FROM accountHeadMst", [], getAccHeadList);
				t.executeSql("SELECT * FROM currencyMst", [], getCurrencyList);
				t.executeSql("SELECT * FROM expNameMst", [], getExpNameList);
                t.executeSql("SELECT * FROM locationMst", [], getLocationList);
			});
	} else {
		alert("db not found, your browser does not support web sql!");
	}
 }
 	

 function onloadTravelData() {
	if (mydb) {
		mydb.transaction(function (t) {
				t.executeSql("SELECT * FROM travelModeMst", [], fetchTravelModeList);
				t.executeSql("SELECT * FROM travelCategoryMst", [], fetchTrvlCategoryList);
				t.executeSql("SELECT * FROM cityTownMst", [], fetchCityTownList);
				t.executeSql("SELECT * FROM travelTypeMst", [], fetchTrvlTypeList);
				t.executeSql("SELECT * FROM travelAccountHeadMst where processId=3", [], getTrAccHeadList);
			});
	} else {
		alert("db not found, your browser does not support web sql!");
	}
 }



function resetUserSessionDetails(){
	 window.localStorage.removeItem("TrRole");
	 window.localStorage.removeItem("EmployeeId");
	 window.localStorage.removeItem("FirstName");
	 window.localStorage.removeItem("LastName");
	 window.localStorage.removeItem("GradeID");
	 window.localStorage.removeItem("BudgetingStatus");
	 window.localStorage.removeItem("UnitId");	
	 window.localStorage.removeItem("UserName");
	 window.localStorage.removeItem("Password");
	 window.localStorage.removeItem("MobileMapRole");
         window.localStorage.removeItem("EaInMobile");
	 dropAllTableDetails();
}

function setUserSessionDetails(val,userJSON){
	 window.localStorage.setItem("TrRole",val.TrRole);
	 window.localStorage.setItem("EmployeeId",val.EmpId);
	 window.localStorage.setItem("FirstName",val.FirstName);
	 window.localStorage.setItem("LastName",val.LastName);
	 window.localStorage.setItem("GradeID",val.GradeID);
	 window.localStorage.setItem("BudgetingStatus",val.BudgetingStatus);
	 window.localStorage.setItem("UnitId",val.UnitId);
        //For Mobile Google Map Role Start
	 if(val.hasOwnProperty('MobileMapRole')){
		window.localStorage.setItem("MobileMapRole",val.MobileMapRole);
	 }else{
		window.localStorage.setItem("MobileMapRole",false); 
	 }
	 //End
    //For EA in mobile
    if(!val.hasOwnProperty('EaInMobile')){
      window.localStorage.setItem("EaInMobile",false);
    }else{
     window.localStorage.setItem("EaInMobile",val.EaInMobile); 
    } 
    //End
	 window.localStorage.setItem("UserName",userJSON["user"]);
	 window.localStorage.setItem("Password",userJSON["pass"]);
	
}

function setUserStatusInLocalStorage(status){
	window.localStorage.setItem("UserStatus",status);
}
function setUrlPathLocalStorage(url){
	window.localStorage.setItem("urlPath",url);
}
function dropAllTableDetails(){

	mydb.transaction(function(t) {
		t.executeSql("DELETE TABLE currencyMst ");
		t.executeSql("DELETE TABLE accountHeadMst ");
		t.executeSql("DELETE TABLE expNameMst");
		t.executeSql("DELETE TABLE businessExpDetails");
		t.executeSql("DELETE TABLE walletMst");
		t.executeSql("DELETE TABLE travelModeMst");
		t.executeSql("DELETE TABLE travelCategoryMst ");
		t.executeSql("DELETE TABLE cityTownMst");
		t.executeSql("DELETE TABLE travelTypeMst");
		t.executeSql("DELETE TABLE travelAccountHeadMst");
		t.executeSql("DELETE TABLE travelExpenseNameMst");
		t.executeSql("DELETE TABLE travelSettleExpDetails");
		t.executeSql("DELETE TABLE travelRequestDetails");
	 });

}

function getUserID() {
	userKey=window.localStorage.getItem("EmployeeId");
	if(userKey==null) return  "";
	else return userKey;
}

function getCurrencyDBTravel(travelRequestId){
 if (mydb) {
	      //Get all the employeeDetails from the database with a select statement, set outputEmployeeDetails as the callback function for the executeSql command
        mydb.transaction(function (t) {
        t.executeSql("select travelDomOrInter from travelRequestDetails where travelRequestId="+travelRequestId, [],fetchTravelDomOrInterDate);
        	
			});
    } else {
        alert("db not found, your browser does not support web sql!");
    }	
}
