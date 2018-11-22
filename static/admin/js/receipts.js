$(document).ready(function() {


	var date = new Date();
     $('[data-toggle="datepicker"]').datepicker({
         autoHide: true,
         zIndex: 2048,
         format: 'dd-mm-yyyy',
         startView: 2
     });
     $('[data-toggle="datepicker"]').datepicker('setStartDate', '01-01-1900');
     $('[data-toggle="datepicker"]').datepicker('setEndDate', date);


	initialize();
	//$('#myModal3').modal('show');
    


    $("#submit").click(function(){
    	$(".errorNotif").html("");
    	error=0;

    	item=$("#item").val();
    	rno=$("#rno").val();
    	date=$("#date").val();
    	amount=$("#amount").val();
    	remarks=$("#remarks").val();

    	
    	if(item==""){
    		$("#itemError").html("Item required.");
    		$("#item").focus()
    		error=1;
    	}
    	if(rno==""){
    		$("#rnoError").html("Receipt no. required.");
    		$("#rno").focus()
    		error=1;
    	}
    	if(date==""){
    		$("#dateError").html("Date required.");
    		$("#date").focus()
    		error=1;
    	}
    	if(amount==""){
    		$("#amountError").html("Amount required.");
    		$("#amount").focus()
    		error=1;
    	}
    	if(isNaN(amount)){
    		$("#amountError").html("Invalid input.");    		
    		$("#amount").focus()
    		error=1;
    	}

    	if(error==1){
    		return;
    	}

    	var data = new FormData();
    	data.append("authToken",readCookie('authToken'));
    	data.append("item",item);
    	data.append("rno",rno);
    	data.append("date",date);
    	data.append("amount",amount);
    	data.append("remarks",remarks);


    	$.ajax({
        method: "post",
        url: "/api/admin/addReceipts",
        processData: false,
        contentType: false,
        data: data,
        success: function(result) {

	        	//alert(result);
	        	try{
	        		obj=JSON.parse(result);
	        		if(obj.responseCode=="200"){
	        			initialize();
	        			$('#myModal').modal('hide');
	        			$("#item").val("");
				    	$("#rno").val("");
				    	$("#date").val("");
				    	$("#amount").val("");
				    	$("#remarks").val("");
	        			snackbar("Added succesfully");
	        		}
	        		else if(obj.responseCode=="10"){
	        			snackbar("Already exists");
	        		}
	        		else{
	        			snackbar("Something went wrong..");
	        		}
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
        url: "/api/admin/viewReceipts",
        success: function(result) {
        		//alert(result);
        		try{
	        		tobj=JSON.parse(result);

						$("#tableArea").html('<center><table  class="table table-hover" id="data-table" width="100%"><thead><tr><th>Item</th><th>Receipt No</th><th>Amount</th><th>Date</th><th>Delete</th></tr></thead></table></center><div id="spaceBottom"></div>');



						table=$('#data-table').DataTable({
						  	data: tobj,
						  	"pageLength": 25,
						  	"order": [[ 1, "asc" ]],
						  	responsive: true,
						  	"scrollX": true,
						    columns: [{
						    	 data: "item"
                                },
						        { data: "rno" },
						        { data: "amount" },
						        { data: "date" },
						        { data: "_id" }
						    ],
						    columnDefs: [
						    	{ "orderable": false, "targets": [4] },
							   { targets: 4,
							      render: function (data, type, full, meta) {
							        //var tmp="<a href='view-user.php?id="+data+"' > "+data+"</a>";
							        return	"<button onclick=deleteR('"+data+"')>Delete</button>";
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


function deleteR(id){
	var data = new FormData();
    data.append("authToken",readCookie('authToken'));
    data.append("id",id);

	$.ajax({
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        url: "/api/admin/deleteReceipts",
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