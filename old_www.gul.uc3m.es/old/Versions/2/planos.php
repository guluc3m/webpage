<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml10-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?
$home = ".";
include("functions.php");
$map = $HTTP_GET_VARS['map'];
head($home,"GUL: el GUL");
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
<?
if ( $map == "leganes" ){
	echo "<h3>Mapa de Leganés</h3><br />";
	echo "<img  src=\"img/leganes.jpeg\" alt=\"Plano de la zona del campus de Legan&eacute;s\" align=\"center\" width=\"560\" />";
}
elseif ( $map == "campus" ){
	echo "<h3>Mapa del Campus de Leganés</h3><br />";
	echo "<img  src=\"img/campus.jpeg\" alt=\"Plano del campus de Legan&eacute;s\" align=\"center\" width=\"560\" />";
}
elseif ( $map == "sabatini" ){
	echo "<h3>Mapa del Edificio Sabatini</h3><br />";
	echo "<img  src=\"img/sabatini.jpeg\" alt=\"Plano del Edificio Sabatini del campus de Legan&eacute;s\" align=\"center\" width=\"560\" />";
}
?>

</div><!--End of "content"-->
</div><!--End of "right"-->
<div id="footer">
<? footer($home); ?>
</div><!--End of "footer"-->
</div><!--End of "page"-->
</body>
</html>

