
$(document).ready(function() {

	initialize();
	//$('#myModal3').modal('show');
    
});
function m1(){
	$("#titleBarMenu").html('<span id="containerTitleBarNew" onclick="m2()"> <i class="fa fa-file"> </i> Stock List');
	$("#tableArea").html('');
	i2();
}

function m2(){
	$("#titleBarMenu").html('<span id="containerTitleBarNew" onclick="m1()"> <i class="fa fa-file"> </i> Balance Sheet');
	$("#tableArea").html('');
	initialize();
}


var obj1, obj2;
var tt1;
function i2(){
	
	var data = new FormData();
    data.append("authToken",readCookie('authToken'));
	$.ajax({
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        url: "/api/admin/getCat",
        success: function(result) {
        	try{
	        	obj1=JSON.parse(result);
	        	var data2 = new FormData();
			    data2.append("authToken",readCookie('authToken'));
				$.ajax({
			        method: "post",
			        processData: false,
			        contentType: false,
			        data: data2,
			        url: "/api/admin/getBalanceSheet",
			        success: function(result2) {
			        	try{
			        		obj2=JSON.parse(result2);
	        				//alert(result2);

	        				t="<table align=center width=50% class='table table-hover dataTable no-footer'><thead><tr><th>Name</th><th>Remaining</th></thead><tbody>";
	        				for(i=0;i<obj1.length;i++){
	        					t=t+"<tr><td>"+obj1[i].name+"</td><td>"+obj2.val[i]+"</td></tr>"
	        				}
	        				t=t+"</tbody></table>";
	        				$("#tableArea").html(t);
			        	}
			        	catch(e2){
			        		snackbar("Something went wrong..");			        		
			        	}
			        },
			        error: function(e) {
			        	snackbar("Something went wrong..");			        	
        			}
	        	});

	        }
	        catch(err){
	        	snackbar("Something went wrong..");	        	
	        }
	        
        },
         error: function(e) {
         	snackbar("Something went wrong..");         	
         }



    });




}

function initialize(){

	var tobj;
	var data = new FormData();
    data.append("authToken",readCookie('authToken'));
	$.ajax({
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        url: "/api/admin/getStockList",
        success: function(result) {
        		//alert(result);
        		try{
	        		tobj=JSON.parse(result);
	        		if(tobj.length==0){
	        			$("#tableArea").html('<center> No data found </center>');
	        			return;
	        		}
	        			$("#tableArea").html('<center><table  class="table table-hover" id="data-table" width="100%"><thead><tr><th>Product Category</th><th>Invoice No.</th><th>Quantity</th><th>Date</th><th>More Info</th></tr></thead></table></center><div id="spaceBottom"></div>');




						table=$('#data-table').DataTable({
						  	data: tobj,
						  	"pageLength": 25,
						  	"order": [[ 1, "asc" ]],
						  	responsive: true,
						  	"scrollX": true,
						    columns: [
						        { data: "productId" },
						        { data: "invoiceNo" },
						        { data: "qty" },
						        { data: "time" },
						        { data: "_id" },

						    ],
						    columnDefs: [
						    	{ "orderable": false, "targets": [3,4] },
							    { targets: 3,
							      render: function (data, type, full, meta) {
							        t=parseInt(data)/1000;
							        return	absDate(t);
							      }
							    },
							    { targets: 4,
							      render: function (data, type, full, meta) {
							        t="<button onclick=getMoreInfo('"+data+"')>More Info</button>";
							        return t;
							      }
							    }
							 ]						
						});

						
	        		
	        	}
	        	catch(e){
	        		snackbar("No data found..");
	        	}
        },
        error: function(err) {
        	snackbar("Something went wrong..");
        }
    });

}


var iid;

function getMoreInfo(id){
		iid=id;
		//alert(id);
		var data = new FormData();
    	data.append("authToken",readCookie('authToken'));
    	data.append("id",id);
    	

    	$.ajax({
        method: "post",
        url: "/api/admin/getStockDetailSingle",
        processData: false,
        contentType: false,
        data: data,
        success: function(result) {
        	//alert(result);

	        	try{
	        			obj=JSON.parse(result);
	        			$('#myModal').modal('show');
	        			
	        			$("#rcvdFrm").val(obj[0].receivedFrom);    
	        			$("#invno").val(obj[0].invoiceNo);  	
	        			$("#rate").val(obj[0].rate);    
	        			$("#qty").val(obj[0].qty);  
	        			$("#remarks").val(obj[0].remarks);

	        	}
	        	catch(e){
	        		snackbar("Something went wrong..");
	        	}
	        	
	        },
	        error: function(err) {
	        	snackbar("Something went wrong..");
	        }
	    });
	    
}






function submitUpdate(){

	$(".errorNotif").html("");
	error=0;


	receivedFrom=$("#rcvdFrm").val();
	invoiceNo=$("#invno").val();
	rate=$("#rate").val();
	quantity=$("#qty").val();
	remarks=$("#remarks").val();
	

	if(receivedFrom==""){
		$("#rcvdFrmError").html("Received from required.");
		$("#rcvdFrm").focus();
		error=1;
	}
	
	if(invoiceNo==""){
		$("#invnoError").html("Invoice No. required.");
		$("#rateError").focus();
		error=1;
	}
	if(rate==""){
		$("#rateError").html("rate required.");
		$("#rate").focus();
		error=1;
	}

	if(isNaN(rate)){
		$("#rateError").html("Invalid input.");    		
		$("#rate").focus()
		error=1;
    }


	if(quantity==""){
		$("#qtyError").html("Quantity required.");
		$("#qty").focus();
		error=1;
	}

	if(error==1)
		return;



		var data = new FormData();
    	data.append("authToken",readCookie('authToken'));
    	data.append("id",iid);
    	data.append("receivedFrom",receivedFrom);
    	data.append("invoiceNo",invoiceNo);
    	data.append("rate",rate);
    	data.append("qty",quantity);
    	data.append("remarks",remarks);
    	
    	$.ajax({
        method: "post",
        url: "/api/admin/updateStockEditSave",
        processData: false,
        contentType: false,
        data: data,
        success: function(result) {
	        	try{
	        			obj=JSON.parse(result);

	        			$("#rcvdFrm").val("");
						$("#invno").val("");
						$("#rate").val("");
						$("#qty").val("");
						$("#remarks").val("");

						$('#myModal').modal('hide');
						initialize();
						snackbar("Stock updated");
	        	}
	        	catch(e){
	        		snackbar("Something went wrong..");
	        	}
	        	
	        },
	        error: function(err) {
	        	snackbar("Something went wrong..");
	        }
	    });
	
}

















function absDate(time) {
    time = parseInt(time);
    var date = new Date(time * 1000);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayName = days[date.getDay()].toString();



    var yy = date.getFullYear().toString();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //var month = months[date.getMonth()].toString().substr(0, 3);
    var month = date.getMonth()+1;

    //var result = dayName + ", " + month + " " + date.getDate() + " " + " '" + yy;
    var result = date.getDate()+"-" + month + "-" + yy;

    return result;
}

function absTime(time) {
    time = parseInt(time);
    var date = new Date(time * 1000);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayName = days[date.getDay()].toString();


    var yy = date.getFullYear().toString().substr(-2);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = months[date.getMonth()].toString().substr(0, 3);
    var hours = date.getHours();
    suffix = (hours >= 12) ? 'PM' : 'AM';
    hours = ((hours + 11) % 12 + 1);
    if (hours < 10) {
        hours = "0" + hours;
    }
    minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var result = dayName + ", " + month + " " + date.getDate() + " " + " '" + yy + " " + hours + ":" + minutes + " " + suffix;
    return result;
}