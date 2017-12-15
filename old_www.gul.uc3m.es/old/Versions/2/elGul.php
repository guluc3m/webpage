<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml10-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?
$home = ".";
include("functions.php");
head($home, "GUL: El GUL");
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
<h3>�Qui�nes somos?</h3>
<p>El GUL es el Grupo de Usuarios de Linux. Somos un
grupo de personas con inquietudes en torno a los ordenadores y la
inform�tica y, en concreto, con la idea com�n de la utilizaci�n y
promoci�n del software libre. Quedamos de vez en cuando y organizamos
actividades sobre todo esto.</p>
<p>El punto de uni�n de todo el grupo es la lista de correo, donde
cualquiera puede apuntarse y participar preguntando dudas,
contest�ndolas, proponiendo actividades, ayudando a llevarlas a cabo o
proponiendo ideas.</p>
<h3>Como contactar</h3>
<p>Puedes contactar con nosotros mediante correo electr�nico a info@gul.uc3m.es</p>
<h3>�D�nde estamos?</h3>
<p>Estamos en el despacho 2.3C05, en la tercera planta del edificio Sabatini (el edificio cuadrado gris), entre los pasillos B y C. La Universidad esta en la Avenidad de la Universidad 30, en Legan�s, y para llegar puede cogerse la linea C-5 de Cercanias Renfe o la Linea 12 de Metro, adem�s de varios autobuses que pasan por la zona.</p>
<br />
<table>
<tr>
<td><table><tr><td><a href="planos.php?map=leganes"><img src="img/leganes.jpeg" alt="plano de la zona del campus de Legan�s" height="120" /></a></td></tr><tr><td><a href="planos.php?map=leganes">Legan�s</a></td></tr></table></td>
<td><table><tr><td><a href="planos.php?map=campus"><img src="img/campus.jpeg" alt="plano de la zona del campus de Legan�s" height="120" /></a></td></tr><tr><td><a href="planos.php?map=campus">Campus</a></td></tr></table></td>
<td><table><tr><td><a href="planos.php?map=sabatini"><img src="img/sabatini.jpeg" alt="plano de la zona del campus de Legan�s" height="120" /></a></td></tr><tr><td><a href="planos.php?map=sabatini">Edificio Sabatini</a></td></tr></table></td>
</tr>
</table>


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

