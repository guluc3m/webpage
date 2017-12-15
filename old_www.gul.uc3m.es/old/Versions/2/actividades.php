<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml10-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?
$home = ".";
include("functions.php");

head($home,"GUL: Actividades")
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
<h3>Lista de correo</h3>
<p>La principal actividad del GUL y donde se nota su vitalidad es la lista de correo, donde cualquiera puede apuntarse y participar preguntando dudas, contest�ndolas, proponiendo actividades, ayudando a llevarlas a cabo o proponiendo ideas. En resumen, se habla de casi cualquier cosa que se pueda considerar interesante en un grupo as�.</p>

<h3>Cursos de noviembre y marzo.</h3>
<p>Cada a�o, en noviembre y marzo, se preparan unas jornadas que suelen consistir en cursos/charlas de dos horas en torno a temas de software libre, utilizaci�n y configuraci�n de servidores y aplicaciones concretas, desarrollo, lenguajes de programaci�n y pr�cticamente cualquier tema relacionado del que alguien quiera un curso o est� dispuesto a darlo. Las presentaciones y el video y el audio de algunos de ellos est�n en nuestro wiki.</p>

<h3>Monogr�ficos</h3>
<p>Nos dimos cuenta que con los cursos de dos horas a veces no podamos mostrar todo lo que quer�amos y creamos los monogr�ficos. Esto son cursos la duraci�n y fechas las fija el ponente, a partir de ah� el grupo trata de poner todos lo medios necesarios para su desarrollo.</p>

<h3>Install party</h3>
<p>Una �install party� es una fiesta de instalaci�n, reuni�n de instalaci�n o como quieras llamarlo. El grupo solicita un espacio por un d�a e instala distribuciones de software libre a quien trae su ordenador. Es una forma de estar a lado de la gente en el momento de instalaci�n, de forma bastante informal, y que no tenga tanto miedo. Estamos organizando una al a�o, pero se puede cambiar en cualquier momento si hay gente para hacerla.</p>
<img src="<? echo "$home/img/04.jpg" ?>" height="150" style="padding:10px 0 0 185px" alt="Foto install party" />
<p>Tambi�n, si quieres instalarte una distribuci�n y no te atreves, se puede quedar contigo en concreto, no hace falta que vayas a una install party. Para eso suscr�bete a la lista de correo y manda uno dici�ndolo o, si no quieres suscribirte, m�ndalo a info@gul.uc3m.es</p>
</div><!--End of "content"-->
<div id="publicidad">
<? publicidad($home); ?>
</div>
</div><!--End of "right"-->
    <div id="footer">
	<? footer($home); ?>
    </div><!--End of "footer"-->
</div><!--End of "left"-->
</div><!--End of "page"-->
</body>
</html>

