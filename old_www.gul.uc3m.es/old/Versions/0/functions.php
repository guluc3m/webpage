<?
function head($home,$title){?>
<head>
    <meta http-equiv="content-type" content="text/xhtml; charset=UTF-8" />
    <meta name="author" content="Grupo de Usuarios de Linux, Univ. Carlos III de Madrid" />
    <meta name="publisher" content="Grupo de Usuarios de Linux, Univ. Carlos III de Madrid" />
    <link rel="stylesheet" type="text/css" href="style.css" media="screen,projection" />
    <link rel="shortcut icon" href="img/logo-gul.png" />
    <title><? echo $title ?></title>
</head>
<?}
function menu($home){?>
    <ul id="menu">
        <li class="button"><a href="index.php">Inicio</a></li>
        <li class="button"><a href="actividades.php">Actividades</a></li>
        <li class="button"><a href="http://wiki.gul.es/doku.php?id=wiki:documentacion">Documentación</a></li>
        <li class="button"><a href="elGul.php">El GUL</a></li>
	<li class="button"><a href="encuentros.php">Encuentros</a></li>
        <li class="button"><a href="fichajes.php">Fichajes</a></li>
        <li class="button"><a href="http://planeta.gul.es">Planeta</a></li>
        <li class="button"><a href="servicios.php">Servicios</a></li>
        <li class="button"><a href="http://tracs.gul.es">Tracs</a></li>
        <li class="button"><a href="http://wiki.gul.es">Wiki</a></li>
    </ul>
	<a href="http://cursos.gul.es/courses/view/6"/
		<img alt="" src="img/marzo08s.png" style="border:0" width="165" />
	</a>
<?}
function title($home){?>
    <img src="<? echo "img/logo-gul.png" ?>" width="75" height="75" class="left" alt="Logo GUL" />
    <a href="http://www.55thinking.com"><img src="<? echo "img/banner1.png" ?>" class="right" alt="Banner Cursos de Marzo 2007" /></a>
    <a href="http://www.salenda.es"><img src="<? echo "img/banner2.png" ?>" class="right" alt="Banner de Salenda S.L." /></a>
    <h1>GUL-UC3M</h1>
    <h2>Grupo de Usuarios de Linux de la Universidad Carlos III de Madrid</h2>
<?}
function footer($home){
	$num = rand(1,171);
	// patched by voiser
	//$fortunes = fopen("$home/fortunes.php",'r');
	//$fortunes = fopen("$home/fortunes-latin-1.php",'r');
	$fortunes = fopen("$home/fortunes.utf8",'r');
	for ($i=1 ; $i<$num+1 ; $i++){
		$fortune=555555;
		$linea = "";
		while ( $linea != 555555 ){
			$linea = fgets($fortunes,999);
			if ( ($linea != 555555) ){
				if ($fortune == 555555){$fortune=$linea;}
				else {$fortune = $fortune."<br />".$linea;}
			}
		}
	}
	fclose($fortunes);
	echo $fortune.'<br />';
}

