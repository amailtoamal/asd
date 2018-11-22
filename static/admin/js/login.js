$(function() {
    $("#loginBtn").click(function() {
        $(".input101").html("");
        var data = new FormData();
        data.append("username", $("#uname").val());
        data.append("password", $("#pwd").val());
        if ($("#uname").val() == "") {
            $(".input101").html("Username required..");
            return;
        } else if ($("#pwd").val() == "") {
            $(".input101").html("Password required..");
            return;
        }
        $.ajax({
            method: "post",
            url: "/api/admin/login",
            data: data,
            processData: false,
            contentType: false,
            success: function(result) {
                var obj = JSON.parse(result);

                if (obj.responseCode == 200) {
                    //if ($(".rememberMe").is(":checked")) {
                    if (true) {
                        var date = new Date();
                        date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
                        document.cookie = "authToken= ;";
                        document.cookie = "authToken=" + obj.authToken + "; expires=" + date.toGMTString();
                    } else {
                        document.cookie = "authToken= ;";
                        document.cookie = "authToken=" + obj.authToken;
                    }
                    window.location.assign("/admin/dashboard");
                } else if (obj.responseCode == 10) {
                    $(".input101").html("Incorrect Username or Password!");
                } else {
                    $(".input101").html("Something went wrong..");
                }
            },
            error: function(error) {
                $(".input101").html("Something went wrong..");
            }
        });

    });
});