var ingred = 1;
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

    $("#addIn").click(function() {
        ingred++;
        var tmp = "#in" + parseInt(ingred - 1) + "";
        $(tmp).after("<p><input type='file' accept='image/*' class='form-control'  id=\"in" + ingred + "\" placeholder=\"Ingeredient " + ingred + "\">");
    });


});

function m1() {
    $("#titleBarMenu").html('<span id="containerTitleBarNew" onclick="m2()"> <i class="fa fa-file"> </i> View Events');
    $("#mainContents").css({ "display": "none" });
    $("#cont2").css({ "display": "block" });
    i2();
}

function m2() {
    $("#titleBarMenu").html('<span id="containerTitleBarNew" onclick="m1()"> <i class="fa fa-file"> </i> New Event');

    $("#cont2").css({ "display": "none" });
    $("#mainContents").css({ "display": "block" });



}


function i2() {
	t2="";
    var data = new FormData();
    data.append("authToken", readCookie('authToken'));
    $.ajax({
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        url: "/api/admin/viewEvents",
        success: function(result) {
            $("#cont2").html("");
            try {
                tobj = JSON.parse(result);
                //alert(tobj[0].name);
                if (tobj.length == 0) {
                    $("#cont2").html('<center> No data found </center>');
                    return;
                }
                t1 = "<table align=center width=50% id='tbl' class='table table-hover dataTable no-footer'><thead><tr><th>Photo Name</th><th>Delete</th></tr></thead><tbody></tbody>";
                for (i = 0; i < tobj.length; i++)
                    t2 =t2+ "<tr><td>" + tobj[i].name + "</td><td><input type=button value=Delete onclick=del('" + tobj[i]._id + "')></td></tr>"

                t3 = "</tbody></table>";
                $("#cont2").append(t1 + t2 + t3);
            } catch (e) {
                snackbar("Somthing went wrong..");
            }
        },
        error: function(err) {
            snackbar("Somthing went wrong..");
        }
    });



}

function del(id) {
    var data = new FormData();
    data.append("authToken", readCookie('authToken'));
    data.append("id", id);

    $.ajax({
        method: "post",
        processData: false,
        contentType: false,
        data: data,
        url: "/api/admin/deleteEvent",
        success: function(result) {
            //alert(result);
            try {
                tobj = JSON.parse(result);
                snackbar("Deleted succesfully..");
                i2();
            } catch (e) {
                snackbar("Something went wrong..");
            }
        },
        error: function(err) {
            snackbar("Something went wrong..");
        }
    });
}

function submitEvent() {
    $(".errorNotif").html("");
    error = 0;

    evtName = $("#evtTtl").val();
    evtDate = $("#dobBtn").val();
    evtDesc = $("#evtDesc").val();


    if (evtName == "") {
        $("#evtTtlError").html("Event name required.");
        $("#evtName").focus();
        error = 1;
    }

    if (evtDate == "") {
        $("#evtDateError").html("Event date required.");
        error = 1;
    }

    var ing;
    for (var i = 1; i <= ingred; i++) {
        var t3 = "in" + i;
        ing = document.getElementById(t3).value;
        if (ing == "") {
            $("#evtPhotosError").html("Photo " + i + " required");
            error = 1;
            return;
        }
    }

    if (error == 1)
        return;


    var data = new FormData();
    data.append("authToken", readCookie('authToken'));
    data.append("title", evtName);
    data.append("desc", evtDesc);
    data.append("date", evtDate);
    data.append("pNo", ingred);
    for (var i = 1; i <= ingred; i++) {
        var t2 = "p" + i;
        var t3 = "#in" + i;
        var cc = $(t3).prop("files")[0];
        data.append(t2, cc);
    }


    $.ajax({
        method: "post",
        url: "/api/admin/newEvent",
        processData: false,
        contentType: false,
        data: data,
        success: function(result) {
            //alert(result);
            try {
                obj = JSON.parse(result);

                $("#evtTtl").val("");
                $("#dobBtn").val("");
                $("#evtDesc").val("");
                for (var i = 1; i <= ingred; i++) {
                    var t3 = "#in" + i;
                    var cc = $(t3).val("");
                }
                snackbar("Event data added succesfully");
            } catch (e) {
                snackbar("Something went wrong..");
            }

        },
        error: function(err) {
            snackbar("Something went wrong..");
        }
    });

}