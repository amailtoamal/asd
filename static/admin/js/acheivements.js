var ingred=1;
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

	$("#addIn").click(function(){
		ingred++;
			
		var tmp2="#nm"+parseInt(ingred-1)+"";
		$(tmp2).after("<p><input type='text' class='form-control'  id=\"nm"+ingred+"\">");

	});


});












function m1(){
	$("#titleBarMenu").html('<span id="containerTitleBarNew" onclick="m2()"> <i class="fa fa-file"> </i> View Events');
	$("#mainContents").css({"display":"none"});
	$("#cont2").css({"display":"block"});	
	i2();
}

function m2(){
	$("#titleBarMenu").html('<span id="containerTitleBarNew" onclick="m1()"> <i class="fa fa-file"> </i> New Event');
	
	$("#cont2").css({"display":"none"});
	$("#mainContents").css({"display":"block"});
	

	
}


function i2(){
	t2="";
	var data = new FormData();
    data.append("authToken",readCookie('authToken'));
	$.ajax({
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        url: "/api/admin/viewAchievements",
        success: function(result) {
        		$("#cont2").html("");
        		try{
	        		tobj=JSON.parse(result);
	        		//alert(tobj[0].name);
	        		if(tobj.length==0){
	        			$("#cont2").html('<center> No data found </center>');
	        			return;
	        		}
	        		t1="<table align=center width=50% id='tbl' class='table table-hover dataTable no-footer'><thead><tr><th>Program Name</th><th>Event Name</th><th>Category</th><th>Prize</th><th>Delete</th></tr></thead><tbody></tbody>";
	        		for(i=0;i<tobj.length;i++)
	        			t2=t2+"<tr><td>"+tobj[i].pname+"</td><td>"+tobj[i].ename+"</td><td>"+tobj[i].ecat+"</td><td>"+tobj[i].etype+"</td><td><input type=button value=Delete onclick=del('"+tobj[i]._id+"')></td></tr>"
	        		
	        		t3="</tbody></table>";
	        		$("#cont2").append(t1+t2+t3);
	        	}
	        	catch(e){
	        		snackbar("Somthing went wrong..");
	        	}
	        },
	        error:function(err){
	        	snackbar("Somthing went wrong..");
	        }
	    });



}

function del(id){
	var data = new FormData();
    data.append("authToken",readCookie('authToken'));
    data.append("id",id);

	$.ajax({
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        url: "/api/admin/deleteAchievements",
        success: function(result) {
        		//alert(result);
        		try{
	        		tobj=JSON.parse(result);
	        		snackbar("Deleted succesfully..");
	        		i2();
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











function submit(){
	$(".errorNotif").html("");
	error=0;

	pname=$("#pname").val();
	ename=$("#ename").val();
	etype=$("#etype").val();
	ecat=$("#ecat").val();
	eprize=$("#eprize").val();
	evenue=$("#evenue").val();
	edate=$("#edate").val();
	eremarks=$("#eremarks").val();


	
	if(pname==""){
		$("#pnameError").html("Program name required.");
		$("#pname").focus();
		error=1;
	}
	
	if(ename==""){
		$("#enameError").html("Event name required.");
		$("#ename").focus();
		error=1;
	}

	if(etype==""){
		$("#etypeError").html("Event type required.");
		$("#etype").focus();
		error=1;
	}
	
	if(ecat==""){
		$("#ecatError").html("Event category required.");
		$("#ecat").focus();
		error=1;
	}
	if(eprize==""){
		$("#eprizeError").html("Price obtained required.");
		$("#eprize").focus();
		error=1;
	}
	
	if(evenue==""){
		$("#evenueError").html("Event venue required.");
		$("#evenue").focus();
		error=1;
	}
	if(edate==""){
		$("#edateError").html("Event date required.");
		error=1;
	}
	

	var ing;
	for(var i=1;i<=ingred;i++){
		var t3="nm"+i;
		ing=document.getElementById(t3).value;
		if(ing==""){
			$("#wnameError").html("Winner Name "+i+" required");
			error=1;
		}

	}
	
	if(error==1)
		return;


	var data=new FormData();	
    data.append("authToken",readCookie('authToken'));


	data.append("pname",pname);
	data.append("ename",ename);
	data.append("etype",etype);
	data.append("ecat",ecat);
	data.append("eprize",eprize);
	data.append("evenue",evenue);
	data.append("edate",edate);
	data.append("eremarks",eremarks);



	for(var i=1;i<=ingred;i++){
		var t2="nm"+i;
		var t3="#nm"+i;
		var cc=$(t3).val();
		data.append(t2,cc);
	}

	data.append("no",ingred);
	

    	$.ajax({
        method: "post",
        url: "/api/admin/newAcheivements",
        processData: false,
        contentType: false,
        data: data,
        success: function(result) {
        	//alert(result);
	        	try{
	        			obj=JSON.parse(result);

	        			$("#pname").val("");
						$("#ename").val("");
						$("#etype").val("");
						$("#ecat").val("");
						$("#eprize").val("");
						$("#evenue").val("");
						$("#edate").val("");
						$("#eremarks").val("");
						
						for(var i=1;i<=ingred;i++){
							var t3="#nm"+i;
							$(t3).val("");
						}
						snackbar("Achievement added succesfully");
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