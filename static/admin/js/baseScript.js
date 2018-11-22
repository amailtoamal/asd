$(function(){
    size=$('#users-device-size').find('div:visible').first().attr('id');
    var navMenuStatus=1; var size;
    var profilePopUpStatus=0;


    if(size=="xs"){
        $("#navMenu").css({left: '-250px'});
        $("body").css({marginLeft: '0px'});
         navMenuStatus=0;
    }
    else{
        $("#navMenu").css({left: '0px'});
        $("body").css({marginLeft: '220px'});
        navMenuStatus=1;
    }


    $(window).resize(function(){
        var size=$('#users-device-size').find('div:visible').first().attr('id');
        if(size=="xs"){
            $("#navMenu").animate({left: '-250px'});
            $("body").animate({marginLeft: '0px'});
             navMenuStatus=0;
        }
        else{
            $("#navMenu").animate({left: '0px'});
            $("body").animate({marginLeft: '220px'});
            navMenuStatus=1;
         }
    });



    $("#toggeleMenu").click(function(){
        size=$('#users-device-size').find('div:visible').first().attr('id');
        if(navMenuStatus==1){
            if(size=="xs"){
                 $("#navMenu").animate({left: '-250px'});
                 $("body").css({marginLeft: '0px'});
                 navMenuStatus=0;
              
            }
            else{
                $("#navMenu").animate({left: '-250px'});
                $("body").animate({marginLeft: '0px'});
                navMenuStatus=0;
            }
        }
        else{
            if(size=="xs"){
                 $("#navMenu").animate({left: '0px'});
                 $("body").css({marginLeft: '0px'});
                 navMenuStatus=1;
                 return;
            }
            else{
                $("#navMenu").animate({left: '0px'});
                $("body").animate({marginLeft: '220px'});
                navMenuStatus=1;
            } 
        }


    });


    $("#userIcon").click(function(){
        if(profilePopUpStatus==1){
            $("#profilePopUp").css({visibility:'hidden'});
            $("#screenMask").css({visibility:'hidden'});
            profilePopUpStatus=0;
        }
        else{
            $("#profilePopUp").css({visibility:'visible'});
            $("#screenMask").css({visibility:'visible'});
            profilePopUpStatus=1;
        }
    });

    $("#screenMask").click(function(){
        $("#profilePopUp").css({visibility:'hidden'});
        $("#screenMask").css({visibility:'hidden'});
        profilePopUpStatus=0;
    });
    $("#logoutBtn").click(function(){
        deleteAllCookies();
        window.location.assign("/admin/login");
    });

});



function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function snackbar(val) {
    var x = document.getElementById("snackbar");
    x.innerHTML=val;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}