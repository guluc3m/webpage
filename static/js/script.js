
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
    //console.log("Altura original del cliente: "+originalHeight);
    //console.log("Altura del nav: "+offset);
    //console.log("Altura tras restarle el nav: "+newHeight);
    $("#what-is-gul-section").css("height",newHeight);

    /* ====== CHANGE NAV COLOR ON SCROLL ====== */

    $(window).scroll(function() {
        if ($(document).scrollTop() > 700) {
            $('.navbar').addClass('goDown');
            $('.navbar').removeClass('bg-light');
            //console.log("Ha bajado");
        } else {
            $('.navbar').removeClass('goDown');
            $('.navbar').addClass('bg-light');
            //console.log("Ha subido");
        }
      });


    /* ====== MAKE DIVS APPEAR ON SCROLL ====== */
    
    $(window).scroll(function(){
        if ($(document).scrollTop() > newHeight/2) {
            $( '.text-content' ).removeClass( 'animate__backOutDown' ).show().addClass( ' animate__backInDown' );
            $( '.img-content' ).removeClass( 'animate__backOutDown' ).show().addClass( ' animate__backInUp' );
        } else {
            $( '.text-content' ).removeClass( ' animate__backInDown' ).addClass( 'animate__backOutDown' );
            $( '.img-content' ).removeClass( ' animate__backInUp' ).addClass( 'animate__backOutDown' );
        }
    });

});
