$(document).ready(function() {

	initialize();
	//$('#myModal3').modal('show');
    
    var date = new Date();
     $('[data-toggle="datepicker"]').datepicker({
         autoHide: true,
         zIndex: 2048,
         format: 'dd-mm-yyyy',
         startView: 2
     });
     $('[data-toggle="datepicker"]').datepicker('setStartDate', '01-01-1900');
     $('[data-toggle="datepicker"]').datepicker('setEndDate', date);




    $("#submit").click(function(){
    	$(".errorNotif").html("");

    	error=0;
    	item=$("#item").val();
    	vno=$("#vno").val();
    	date=$("#date").val();
    	amount=$("#amount").val();
    	pto=$("#pto").val();
    	purpose=$("#purpose").val();
    	remarks=$("#remarks").val();



    	
    	if(item==""){
    		$("#itemError").html("Item required.");
    		$("#item").focus();
    		error=1;
    	}
    	if(vno==""){
    		$("#vnoError").html("Voucher no. required.");
    		$("#vno").focus();
    		error=1;
    	}
    	if(date==""){
    		$("#dateError").html("Date required.");
    		$("#date").focus();
    		error=1;
    	}
    	if(amount==""){
    		$("#amountError").html("Amount required.");
    		$("#amount").focus();
    		error=1;
    	}
    	if(isNaN(amount)){
    		$("#amountError").html("Invalid input.");    		
    		$("#amount").focus();
    		error=1;
    	}
    	if(pto==""){
    		$("#ptoError").html("Paid to required.");
    		$("#pto").focus();
    		error=1;
    	}
    	if(purpose==""){
    		$("#purposeError").html("Purpose required.");
    		$("#purpose").focus();
    		error=1;
    	}
    	if(error==1){
    		return;
    	}



		var data = new FormData();
    	data.append("authToken",readCookie('authToken'));
    	data.append("item",item);
    	data.append("vno",vno);
    	data.append("date",date);
    	data.append("amount",amount);
    	data.append("pto",pto);
    	data.append("name",name);
    	data.append("purpose",purpose);
    	data.append("remarks",remarks);

    	$.ajax({
        method: "post",
        url: "/api/admin/addVouchers",
        processData: false,
        contentType: false,
        data: data,
        success: function(result) {

	        	//alert(result);
	        	try{
	        		obj=JSON.parse(result);
	        			$('#myModal').modal('hide');
				    	$("#item").val("");
				    	$("#vno").val("");
				    	$("#date").val("");
				    	$("#amount").val("");
				    	$("#pto").val("");
				    	$("#purpose").val("");
				    	$("#remarks").val("");
	        			snackbar("Added succesfully");
	        		
	        	}
	        	catch(e){
	        		snackbar("Something went wrong..");
	        	}
	        	
	        },
	        error: function(err) {
	        	snackbar("Something went wrong..");
	        }
	    });

	});



});

function initialize(){
	var tobj;
	var data = new FormData();
    data.append("authToken",readCookie('authToken'));
	$.ajax({
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        url: "/api/admin/viewVouchers",
        success: function(result) {
        		//alert(result);
        		try{
	        		tobj=JSON.parse(result);

						$("#tableArea").html('<center><table  class="table table-hover" id="data-table" width="100%"><thead><tr><th>Item</th><th>Voucher No</th><th>Amount</th><th>Date</th><th>Delete</th></tr></thead></table></center><div id="spaceBottom"></div>');



						table=$('#data-table').DataTable({
						  	data: tobj,
						  	"pageLength": 25,
						  	"order": [[ 1, "asc" ]],
						  	responsive: true,
						  	"scrollX": true,
						    columns: [{
						    	 data: "item"
                                },
						        { data: "vno" },
						        { data: "amount" },
						        { data: "date" },
						        { data: "_id" }
						    ],
						    columnDefs: [
						    	{ targets: 4,
							      render: function (data, type, full, meta) {
							        //var tmp="<a href='view-user.php?id="+data+"' > "+data+"</a>";
							        return	"<button onclick=deleteV('"+data+"')>Delete</button>";
							      }
							    }
							 ]						
						});

	        		
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


function deleteV(id){
	var data = new FormData();
    data.append("authToken",readCookie('authToken'));
    data.append("id",id);

	$.ajax({
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        url: "/api/admin/deleteVouchers",
        success: function(result) {
        		//alert(result);
        		try{
	        		tobj=JSON.parse(result);
	        		snackbar("Deleted succesfully..");
	        		initialize();
	        	}
	        	catch(e){
	        		snackbar("Something went wrong..");
	        	}
		},
		error: function(err){
			snackbar("Something went wrong..");
		}
	});
}