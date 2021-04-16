
$(document).ready(function(){


    /* ====== OFFSET HEIGHT FUNCTION ====== */

    function offsetNav(){
        var navbar = document.getElementById("navbar");
        var offset = navbar.offsetHeight;
        return offset;
    }

    var originalHeight = window.innerHeight;
    var offset = offsetNav();
    var newHeight = originalHeight - offset;
    console.log(originalHeight);
    console.log(offset);
    console.log(newHeight);
    $("#what-is-gul-section").css("height",newHeight);

});
