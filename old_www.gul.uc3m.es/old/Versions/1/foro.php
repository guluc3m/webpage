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

<p>A petición popular hemos instalado un foro como interfaz de nuestra lista de correo.</p>

<p>Hemos hecho todo lo posible para que sea todo completamente transparente para los usuarios nuevos. Sin embargo, los usuarios antiguos deben considerar un par de cosas al usarlo:</p>
<ul>
<li>Si no quieren usar el interfaz foro pueden saltarse esta página.</li>
<li>Todos los miembros de las lista tienen un usuario ya creado en el foro automáticamente con contraseña aleatoria, deben decirle al foro que se les ha olvidado la contraseña para que se la mande. El nombre de usuario es el nombre que aparezca en los correos, incluyendo espacios y demás.</li>
<li>Si se quiere usar foro y lista indistintamente, recibiendo correos de la lista en su dirección de correo, debe darse de alta en la lista y al enviar un correo se creará automáticamente el usuario en el foro.</li>
<li>Si sólo se quiere usar el foro, ya se estaba en la lista y no se quieren recibir correos, el usuario debe entrar en su configuración de usuario del gestor de listas y cambiar esta opción. </li>
<li>Un usuario no puede escribir en los foros de las listas en las que no esté inscrito. Si sólo está dado de alta en la lista general, no podrá escribir en los foros de las listas de interés hasta que se de de alta en ellas.</li>
<li>Todos los usuarios nuevos del foro son dandos de alta en todas las listas con la opción «nomail» activada.</li>
</ul>
<p>Pedimos disculpas por las molestias que pueda ocasionar todo esto, pero hemos intentado hacerlo lo más sencillo posible respetando cómo ha funcionado todo hasta ahora. Cualquier crítica, duda o sugerencia es bienvenida.
</p>

</div><!--End of "content"-->
</div><!--End of "right"-->
<div id="footer">
<? footer($home); ?>
</div><!--End of "footer"-->
</div><!--End of "page"-->
</body>
</html>

