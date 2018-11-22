$(document).ready(function() {

	initialize();
	//$('#myModal3').modal('show');
    


    $("#submitCategory").click(function(){
    	$(".errorNotif").html("");

    	name=$("#name").val();
    	desc=$("#desc").val();

    	
    	if(name==""){
    		$("#nameError").html("Category name required.");
    		$("#name").focus()
    		return;
    	}
    	

    	var data = new FormData();
    	data.append("authToken",readCookie('authToken'));
    	data.append("name",name);
    	data.append("desc",desc);

    	$.ajax({
        method: "post",
        url: "/api/admin/addStockCategory",
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
	        			$("#name").val("");
	        			$("#desc").val("");
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
        url: "/api/admin/getStockCategories",
        success: function(result) {
        		//alert(result);
        		try{
	        		tobj=JSON.parse(result);

						$("#tableArea").html('<center><table  class="table table-hover" id="data-table" width="100%"><thead><tr><th>Sl. No.</th><th>Name</th><th>Status</th><th>Edit</th><th>Delete</th></tr></thead></table></center><div id="spaceBottom"></div>');



						table=$('#data-table').DataTable({
						  	data: tobj,
						  	"pageLength": 25,
						  	"order": [[ 1, "asc" ]],
						  	responsive: true,
						  	"scrollX": true,
						    columns: [{
						    	 data: "name"
                                },
						        { data: "name" },
						        { data: "status" },
						        { data: "_id" },
						        { data: "_id" }
						    ],
						    columnDefs: [
						    	{ "orderable": false, "targets": [0,3,4] },
							    { targets: 0,
							      render: function (data, type, full, meta) {
							        //var tmp="<a href='view-user.php?id="+data+"' > "+data+"</a>";
							        return data;
							      }
							    },
							    { targets: 2,
							      render: function (data, type, full, meta) {
							      	if(data=="1")
							        	return "Ongoing";
							        else
							        	return "Discontinued";
							       return data;
							      }
							    },{ targets: 3,
							      render: function (data, type, full, meta) {
							        //var tmp="<a href='view-user.php?id="+data+"' > "+data+"</a>";
							        return	"<button onclick=editCat('"+data+"')>Edit</button>";
							      }
							    },{ targets: 4,
							      render: function (data, type, full, meta) {
							        //var tmp="<a href='view-user.php?id="+data+"' > "+data+"</a>";
							        return	"<button onclick=deleteCat('"+data+"')>Delete</button>";
							      }
							    }
							 ]						
						});

						 table.on('order.dt search.dt', function() {
		                    table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function(cell, i) {
		                        cell.innerHTML = i + 1;
		                    });
		                }).draw();
	        		
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
var deleteID,editID;

function editCat(id){
		editID=id;
		var data = new FormData();
    	data.append("authToken",readCookie('authToken'));
    	data.append("id",id);

    	$.ajax({
        method: "post",
        url: "/api/admin/getStockDetail",
        processData: false,
        contentType: false,
        data: data,
        success: function(result) {
	        	try{
	        			obj=JSON.parse(result);
	        			$('#myModal3').modal('show');	
	        			

	        			if(obj[0].status==1){
	        				$("#stat0").prop("checked", true);
	        			}else{
	        				$("#stat1").prop("checked", true);
	        			}
	        			$("#nameEdit").val(obj[0].name);    
	        			$("#descEdit").val(obj[0].description);  	

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


function deleteCat(id){
	deleteID=id;
	$('#myModal2').modal('show');
}


function deleteCatConfirm(){

		var data = new FormData();
    	data.append("authToken",readCookie('authToken'));
    	data.append("id",deleteID);

    	$.ajax({
        method: "post",
        url: "/api/admin/deleteStockCategory",
        processData: false,
        contentType: false,
        data: data,
        success: function(result) {
	        	try{
	        		obj=JSON.parse(result);
	        		if(obj.responseCode=="200"){
	        			initialize();
	        			$('#myModal2').modal('hide');
	        			snackbar("Deleted succesfully");
	        		}
	        		// else if(obj.responseCode=="10"){
	        		// 	snackbar("Already exists");
	        		// }
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
	
}




function saveEditCat(){
		$(".errorNotif").html("");

    	name=$("#nameEdit").val();
    	desc=$("#descEdit").val();

    	
    	if(name==""){
    		$("#nameEditError").html("Category name required.");
    		$("#nameEdit").focus()
    		return;
    	}
    	var data = new FormData();
    	data.append("authToken",readCookie('authToken'));
    	data.append("id",editID);		
    	data.append("name",name);
    	data.append("desc",desc);

    	data.append("status",$("input[name='status']:checked").val());


    	$.ajax({
        method: "post",
        url: "/api/admin/stockEditSave",
        processData: false,
        contentType: false,
        data: data,
        success: function(result) {
        	//alert(result);
	        	try{
	        			obj=JSON.parse(result);		
	        			if(obj.responseCode=="200"){
	        				$('#myModal3').modal('hide');	
	        				initialize();
	        			}  	

	        	}
	        	catch(e){
	        		snackbar("Something went wrong..2");
	        	}
	        	
	        },
	        error: function(err) {
	        	snackbar("Something went wrong..2");
	        }
	    });
}