<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml10-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?
$home = ".";
include("functions.php");
$map = $HTTP_GET_VARS['map'];
head($home,"GUL: Foro");
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

<p>A petici�n popular hemos instalado un foro como interfaz de nuestra lista de correo.</p>

<p>Hemos hecho todo lo posible para que sea todo completamente transparente para los usuarios nuevos. Sin embargo, los usuarios antiguos deben considerar un par de cosas al usarlo:</p>
<ul>
<li>Si no quieren usar el interfaz foro pueden saltarse esta p�gina.</li>
<li>Todos los miembros de las lista tienen un usuario ya creado en el foro autom�ticamente con contrase�a aleatoria, deben decirle al foro que se les ha olvidado la contrase�a para que se la mande. El nombre de usuario es el nombre que aparezca en los correos, incluyendo espacios y dem�s.</li>
<li>Si se quiere usar foro y lista indistintamente, recibiendo correos de la lista en su direcci�n de correo, debe darse de alta en la lista y al enviar un correo se crear� autom�ticamente el usuario en el foro.</li>
<li>Si s�lo se quiere usar el foro, ya se estaba en la lista y no se quieren recibir correos, el usuario debe entrar en su configuraci�n de usuario del gestor de listas y cambiar esta opci�n. </li>
<li>Un usuario no puede escribir en los foros de las listas en las que no est� inscrito. Si s�lo est� dado de alta en la lista general, no podr� escribir en los foros de las listas de inter�s hasta que se de de alta en ellas.</li>
<li>Todos los usuarios nuevos del foro son dandos de alta en todas las listas con la opci�n �nomail� activada.</li>
</ul>
<p>Pedimos disculpas por las molestias que pueda ocasionar todo esto, pero hemos intentado hacerlo lo m�s sencillo posible respetando c�mo ha funcionado todo hasta ahora. Cualquier cr�tica, duda o sugerencia es bienvenida.
</p>

</div><!--End of "content"-->
</div><!--End of "right"-->
<div id="footer">
<? footer($home); ?>
</div><!--End of "footer"-->
</div><!--End of "page"-->
</body>
</html>

