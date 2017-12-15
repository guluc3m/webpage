 function banner() {
	code = 0;
	//Comentar la linea de debajo para que no haya banner
         thetimer = setTimeout("banneraux()", 100);
 }
function banneraux(){
         thetimer = setTimeout("banneraux()", 5000);
	 /*
	 En cada apartado del switch indicar el enlace y la imagen.Cada caso debe ser un numero consecutivo, y la parte default es el ultimo banner del ciclo que se muestre, para añadir otro copiar el 0 y cambiar lo necesario
	 */
	 switch (code){
       /*  case 0:
                document.getElementById("banner").href="http://wiki.gul.es/doku.php?id=pagina_introduccion_en_getafe";
                document.getElementById("banner").innerHTML='<img height="60" width="468" src="banner-curso-introduccion3.jpg" alt="Anuncio curso de introduccion en Getafe"/>';
                code = code + 1;
		break;
         case 1:
                document.getElementById("banner").href="http://www.gul.es/doku.php?id=pagina_introduccion_en_leganes";
                document.getElementById("banner").innerHTML='<img height="60"  width="468"src="banner-curso-introduccion-lega.png" alt="Anuncio curso de introduccion en Leganés"/>';
                code = code + 1;
		break;
         default:
                document.getElementById("banner").href="http://gul.uc3m.es";
                document.getElementById("banner").innerHTML='<img height="60"  width="468"src="banner-install.png" alt="GUL Banner"/>';
                code=0;
         }*/
}
