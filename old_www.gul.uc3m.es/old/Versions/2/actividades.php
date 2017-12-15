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
<p>La principal actividad del GUL y donde se nota su vitalidad es la lista de correo, donde cualquiera puede apuntarse y participar preguntando dudas, contestándolas, proponiendo actividades, ayudando a llevarlas a cabo o proponiendo ideas. En resumen, se habla de casi cualquier cosa que se pueda considerar interesante en un grupo así.</p>

<h3>Cursos de noviembre y marzo.</h3>
<p>Cada año, en noviembre y marzo, se preparan unas jornadas que suelen consistir en cursos/charlas de dos horas en torno a temas de software libre, utilización y configuración de servidores y aplicaciones concretas, desarrollo, lenguajes de programación y prácticamente cualquier tema relacionado del que alguien quiera un curso o está dispuesto a darlo. Las presentaciones y el video y el audio de algunos de ellos están en nuestro wiki.</p>

<h3>Monográficos</h3>
<p>Nos dimos cuenta que con los cursos de dos horas a veces no podamos mostrar todo lo que queríamos y creamos los monográficos. Esto son cursos la duración y fechas las fija el ponente, a partir de ahí el grupo trata de poner todos lo medios necesarios para su desarrollo.</p>

<h3>Install party</h3>
<p>Una «install party» es una fiesta de instalación, reunión de instalación o como quieras llamarlo. El grupo solicita un espacio por un día e instala distribuciones de software libre a quien trae su ordenador. Es una forma de estar a lado de la gente en el momento de instalación, de forma bastante informal, y que no tenga tanto miedo. Estamos organizando una al año, pero se puede cambiar en cualquier momento si hay gente para hacerla.</p>
<img src="<? echo "$home/img/04.jpg" ?>" height="150" style="padding:10px 0 0 185px" alt="Foto install party" />
<p>También, si quieres instalarte una distribución y no te atreves, se puede quedar contigo en concreto, no hace falta que vayas a una install party. Para eso suscríbete a la lista de correo y manda uno diciéndolo o, si no quieres suscribirte, mándalo a info@gul.uc3m.es</p>
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

