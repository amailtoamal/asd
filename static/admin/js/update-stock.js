$(document).ready(function() {
	initialize();
});

function initialize(){
	var data = new FormData();
    data.append("authToken",readCookie('authToken'));
	$.ajax({
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        url: "/api/admin/getStockCategoryNames",
        success: function(result) {
        	

        	try{
        		obj=JSON.parse(result);
        		for(var i=0;i<obj.length;i++){
        			
						$("#productListText").append("<option value='"+obj[i]._id+"'>"+obj[i].name+"</option>");
        		}
        		

        	}
        	catch(e){
        		snackbar("Something went wrong.. 1");
        	}
        },
        error:function(err) {
        	snackbar("Something went wrong.. 2");
        }
    });

}

function submitUpdate(){

	$(".errorNotif").html("");
	error=0;

	productName=$("#productListText").val();
	productId=$("option[value='"+productName+"']").html();	
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
    	data.append("productName",productName);
    	data.append("productId",productId);
    	data.append("receivedFrom",receivedFrom);
    	data.append("invoiceNo",invoiceNo);
    	data.append("rate",rate);
    	data.append("qty",quantity);
    	data.append("remarks",remarks);

    	$.ajax({
        method: "post",
        url: "/api/admin/updateStock",
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