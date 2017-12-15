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
	    <p>Las reuniones del GUL suelen ser los segundos viernes de mes en el despacho. En ellas, además de hablar de los temas que se han ido proponiendo desde la última reunión, aprovechamos para conocernos entre nosotros y desvariar un poco. Después solemos ir a comer y beber algo en algún bar cercano. Para asistir a una reunión simplemente hay que presentarse allí, no hace falta avisar en ningún sitio y todo el mundo en bienvenido.</p>

	    <p>También quedamos de vez en cuando en el despacho para algunas actividades puntuales o cuando tenemos un rato. Si quieres quedar allí manda un correo por la lista a ver si podemos. Si no quieres apuntarte a la lista mándalo a info@gul.uc3m.es</p>
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
