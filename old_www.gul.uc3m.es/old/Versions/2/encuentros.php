<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml10-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?
$home = ".";
include("functions.php");
head($home, "GUL: Encuentros");
?>
<body>
    <div id="page">
        <div id="header">
	    <? title($home); ?>
        </div><!--End of "header"-->
        <div id="left">
	        <? menu($home); ?>
        </div><!--End of "left"-->
        
        <div id="right">
            <div id="content">
	    <h3>Encuentros</h3>
	    <p>Las reuniones del GUL suelen ser los segundos viernes de mes en el despacho. En ellas, adem�s de hablar de los temas que se han ido proponiendo desde la �ltima reuni�n, aprovechamos para conocernos entre nosotros y desvariar un poco. Despu�s solemos ir a comer y beber algo en alg�n bar cercano. Para asistir a una reuni�n simplemente hay que presentarse all�, no hace falta avisar en ning�n sitio y todo el mundo en bienvenido.</p>

	    <p>Tambi�n quedamos de vez en cuando en el despacho para algunas actividades puntuales o cuando tenemos un rato. Si quieres quedar all� manda un correo por la lista a ver si podemos. Si no quieres apuntarte a la lista m�ndalo a info@gul.uc3m.es</p>
            </div><!--End of "content"-->
            <div id="publicidad">
	         <? publicidad($home); ?>
	    </div>
        </div><!--End of "right"-->
        <div id="footer">
	    <? footer($home); ?>
        </div><!--End of "footer"-->
    </div><!--End of "page"-->
</body>
</html>
